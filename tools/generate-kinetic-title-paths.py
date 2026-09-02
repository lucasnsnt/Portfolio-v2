#!/usr/bin/env python3
"""Generate the MOONBEAM calibration masters for the kinetic-title study."""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Iterable

from fontTools.pens.basePen import BasePen
from fontTools.ttLib import TTFont

Point = tuple[float, float]
STATES = 4


class FlattenPen(BasePen):
    def __init__(self, glyph_set, curve_steps: int = 18):
        super().__init__(glyph_set)
        self.curve_steps = curve_steps
        self.contours: list[list[Point]] = []
        self.current: list[Point] | None = None
        self.last: Point | None = None

    def _moveTo(self, point: Point) -> None:
        self.current = [point]
        self.last = point

    def _lineTo(self, point: Point) -> None:
        if self.current is not None:
            self.current.append(point)
        self.last = point

    def _curveToOne(self, one: Point, two: Point, point: Point) -> None:
        if self.current is None or self.last is None:
            return
        start = self.last
        for step in range(1, self.curve_steps + 1):
            t = step / self.curve_steps
            inverse = 1 - t
            self.current.append((
                inverse**3 * start[0] + 3 * inverse**2 * t * one[0] + 3 * inverse * t**2 * two[0] + t**3 * point[0],
                inverse**3 * start[1] + 3 * inverse**2 * t * one[1] + 3 * inverse * t**2 * two[1] + t**3 * point[1],
            ))
        self.last = point

    def _qCurveToOne(self, control: Point, point: Point) -> None:
        if self.current is None or self.last is None:
            return
        start = self.last
        for step in range(1, self.curve_steps + 1):
            t = step / self.curve_steps
            inverse = 1 - t
            self.current.append((
                inverse**2 * start[0] + 2 * inverse * t * control[0] + t**2 * point[0],
                inverse**2 * start[1] + 2 * inverse * t * control[1] + t**2 * point[1],
            ))
        self.last = point

    def _closePath(self) -> None:
        if self.current and len(self.current) > 2:
            self.contours.append(self.current)
        self.current = None
        self.last = None

    def _endPath(self) -> None:
        self._closePath()


def distance(one: Point, two: Point) -> float:
    return math.hypot(two[0] - one[0], two[1] - one[1])


def resample_closed(points: list[Point], count: int) -> list[Point]:
    if distance(points[0], points[-1]) < 0.001:
        points = points[:-1]
    edges = [distance(points[index], points[(index + 1) % len(points)]) for index in range(len(points))]
    perimeter = sum(edges)
    if perimeter == 0:
        return [points[0]] * count
    result: list[Point] = []
    edge_index = 0
    edge_start = 0.0
    for sample in range(count):
        target = perimeter * sample / count
        while edge_index < len(edges) - 1 and target > edge_start + edges[edge_index]:
            edge_start += edges[edge_index]
            edge_index += 1
        local = (target - edge_start) / max(edges[edge_index], 0.0001)
        start = points[edge_index]
        end = points[(edge_index + 1) % len(points)]
        result.append((start[0] + (end[0] - start[0]) * local, start[1] + (end[1] - start[1]) * local))
    return result


def bounds(contours: Iterable[Iterable[Point]]) -> tuple[float, float, float, float]:
    points = [point for contour in contours for point in contour]
    return min(x for x, _ in points), min(y for _, y in points), max(x for x, _ in points), max(y for _, y in points)


def area(contour: list[Point]) -> float:
    return sum(
        contour[index][0] * contour[(index + 1) % len(contour)][1]
        - contour[(index + 1) % len(contour)][0] * contour[index][1]
        for index in range(len(contour))
    ) / 2


def rotate_to_match(reference: list[Point], candidate: list[Point]) -> list[Point]:
    if area(reference) * area(candidate) < 0:
        candidate = list(reversed(candidate))
    if abs(area(reference)) < 0.001:
        return candidate
    offset = min(
        range(len(candidate)),
        key=lambda shift: sum(
            (reference[index][0] - candidate[(index + shift) % len(candidate)][0]) ** 2
            + (reference[index][1] - candidate[(index + shift) % len(candidate)][1]) ** 2
            for index in range(len(reference))
        ),
    )
    return candidate[offset:] + candidate[:offset]


class FontSource:
    def __init__(self, path: Path):
        self.font = TTFont(path)
        self.glyph_set = self.font.getGlyphSet()
        self.cmap = self.font.getBestCmap()
        self.metrics = self.font["hmtx"].metrics

    def contours_for(self, character: str, points: int) -> list[list[Point]]:
        pen = FlattenPen(self.glyph_set)
        self.glyph_set[self.cmap[ord(character)]].draw(pen)
        contours = [resample_closed([(x, -y) for x, y in contour], points) for contour in pen.contours]
        return sorted(contours, key=lambda contour: abs(area(contour)), reverse=True)


# Keep most letters as BBH Bogle anchors. Each master changes only two glyphs,
# following Moonbeam's mixed-type rhythm without turning the whole word at once.
ASSIGNMENTS: dict[str, dict[int, dict[int, str]]] = {
    "SOFTWARE": {
        1: {0: "jabin", 7: "karrik"},
        2: {2: "karrik", 6: "picnic"},
        3: {3: "fayte", 5: "fayte"},
    },
    "ENGINEER": {
        1: {0: "karrik", 3: "picnic"},
        2: {2: "picnic", 5: "fayte"},
        3: {4: "karrik", 7: "fayte"},
    },
}


def fit_master(reference: list[list[Point]], master: list[list[Point]]) -> list[list[Point]]:
    rx0, ry0, rx1, ry1 = bounds(reference)
    mx0, my0, mx1, my1 = bounds(master)
    rh = max(ry1 - ry0, 1)
    mh = max(my1 - my0, 1)
    # Candidate glyphs are curated by native width first. We only equalise cap
    # height here, preserving the real proportions of the destination design.
    scale = rh / mh
    rcx, rcy = (rx0 + rx1) / 2, (ry0 + ry1) / 2
    mcx, mcy = (mx0 + mx1) / 2, (my0 + my1) / 2
    return [[(rcx + (x - mcx) * scale, rcy + (y - mcy) * scale) for x, y in contour] for contour in master]


def compatible_states(raw_states: list[list[list[Point]]]) -> list[list[list[Point]]]:
    maximum = max(len(state) for state in raw_states)
    canonical = [list(contour) for contour in raw_states[0]]
    for index in range(len(canonical), maximum):
        source = next(state[index] for state in raw_states[1:] if len(state) > index)
        center = (sum(x for x, _ in source) / len(source), sum(y for _, y in source) / len(source))
        canonical.append([center] * len(source))
    result: list[list[list[Point]]] = []
    for state in raw_states:
        expanded = [list(contour) for contour in state]
        while len(expanded) < maximum:
            reference = canonical[len(expanded)]
            center = (sum(x for x, _ in reference) / len(reference), sum(y for _, y in reference) / len(reference))
            expanded.append([center] * len(reference))
        result.append([rotate_to_match(canonical[index], contour) for index, contour in enumerate(expanded)])
    return result


def path_data(contours: list[list[Point]], offset: float) -> str:
    commands: list[str] = []
    for contour in contours:
        commands.append(f"M{contour[0][0] + offset:.2f},{contour[0][1]:.2f}")
        commands.extend(f"L{x + offset:.2f},{y:.2f}" for x, y in contour[1:])
        commands.append("Z")
    return "".join(commands)


def generate_word(word: str, base: FontSource, sources: dict[str, FontSource], points: int) -> dict:
    cursor = 0.0
    tracking = base.font["head"].unitsPerEm * 0.012
    glyph_records = []
    base_offsets = []
    top, bottom = math.inf, -math.inf
    for index, character in enumerate(word):
        base_contours = base.contours_for(character, points)
        _, glyph_top, _, glyph_bottom = bounds(base_contours)
        top, bottom = min(top, glyph_top), max(bottom, glyph_bottom)
        raw_states = [base_contours]
        for state in range(1, STATES):
            source_name = ASSIGNMENTS.get(word, {}).get(state, {}).get(index)
            raw_states.append(
                fit_master(base_contours, sources[source_name].contours_for(character, points))
                if source_name else base_contours
            )
        states = compatible_states(raw_states)
        glyph_records.append({"character": character, "states": states})
        base_offsets.append(cursor)
        glyph_name = base.cmap[ord(character)]
        cursor += base.metrics[glyph_name][0] + (tracking if index < len(word) - 1 else 0)

    state_offsets: list[list[float]] = []
    base_center = 0.0
    for state in range(STATES):
        offsets: list[float] = []
        carried_shift = 0.0
        previous_right = None
        for index, record in enumerate(glyph_records):
            contours = record["states"][state]
            left, _, right, _ = bounds(contours)
            offset = base_offsets[index] + carried_shift
            if previous_right is not None:
                previous_base = glyph_records[index - 1]["states"][0]
                previous_base_right = bounds(previous_base)[2] + base_offsets[index - 1]
                base_left = bounds(glyph_records[index]["states"][0])[0] + base_offsets[index]
                base_gap = base_left - previous_base_right
                adjacent_changed = (
                    index in ASSIGNMENTS.get(word, {}).get(state, {})
                    or index - 1 in ASSIGNMENTS.get(word, {}).get(state, {})
                )
                # Preserve the original BBH Bogle spacing at rest and give a
                # transformed neighbour enough breathing room at full size.
                desired_gap = max(base_gap, 24.0) if adjacent_changed else base_gap
                required_shift = previous_right + desired_gap - (left + offset)
                if required_shift > 0:
                    carried_shift += required_shift
                    offset += required_shift
            offsets.append(offset)
            previous_right = right + offset
        state_left = min(
            bounds(record["states"][state])[0] + offsets[index]
            for index, record in enumerate(glyph_records)
        )
        state_right = max(
            bounds(record["states"][state])[2] + offsets[index]
            for index, record in enumerate(glyph_records)
        )
        state_center = (state_left + state_right) / 2
        if state == 0:
            base_center = state_center
        else:
            center_shift = base_center - state_center
            offsets = [offset + center_shift for offset in offsets]
        state_offsets.append(offsets)

    glyphs = [
        {
            "character": record["character"],
            "states": [
                path_data(record["states"][state], state_offsets[state][index])
                for state in range(STATES)
            ],
            "strokeWidths": [
                1.15 if ASSIGNMENTS.get(word, {}).get(state, {}).get(index) == "jabin" else 0
                for state in range(STATES)
            ],
            "effectOpacity": [
                0.24 if index in ASSIGNMENTS.get(word, {}).get(state, {}) else 0
                for state in range(STATES)
            ],
        }
        for index, record in enumerate(glyph_records)
    ]
    return {"text": word, "width": round(cursor, 2), "top": round(top, 2), "height": round(bottom - top, 2), "glyphs": glyphs}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--points", type=int, default=96)
    moonbeam_fonts = Path("tools/font-sources/kinetic-title/moonbeam-brand")
    parser.add_argument("--base-font", type=Path, default=Path("public/fonts/BBHBogle-Regular.woff2"))
    parser.add_argument("--banana-font", type=Path, default=moonbeam_fonts / "BananaGrotesk-Regular.otf")
    parser.add_argument("--robinson-font", type=Path, default=moonbeam_fonts / "Robinson-Regular.otf")
    parser.add_argument("--self-modern-font", type=Path, default=moonbeam_fonts / "SelfModern.otf")
    parser.add_argument("--hoss-font", type=Path, default=moonbeam_fonts / "HossRound-Medium.otf")
    parser.add_argument("--jabin-font", type=Path, default=moonbeam_fonts / "Jabin-Regular.ttf")
    parser.add_argument("--fraunces-font", type=Path, default=Path("tools/font-sources/kinetic-title/Fraunces144pt-Regular.otf"))
    parser.add_argument("--grenze-font", type=Path, default=Path("tools/font-sources/kinetic-title/GrenzeGotisch-Black.ttf"))
    parser.add_argument("--unifraktur-font", type=Path, default=Path("tools/font-sources/kinetic-title/UnifrakturCook-Regular.ttf"))
    parser.add_argument("--denim-ink-font", type=Path, default=Path("tools/font-sources/kinetic-title/moonbeam-trial/DenimINK-SemiBold.otf"))
    poster_fonts = Path("tools/font-sources/kinetic-title/alternative-poster")
    parser.add_argument("--karrik-font", type=Path, default=poster_fonts / "Karrik-Regular.otf")
    parser.add_argument("--picnic-font", type=Path, default=poster_fonts / "PicNic-Regular.otf")
    parser.add_argument("--fayte-font", type=Path, default=poster_fonts / "Fayte-Regular-Trial.otf")
    args = parser.parse_args()
    base = FontSource(args.base_font)
    sources = {
        "banana": FontSource(args.banana_font),
        "robinson": FontSource(args.robinson_font),
        "self_modern": FontSource(args.self_modern_font),
        "hoss": FontSource(args.hoss_font),
        "jabin": FontSource(args.jabin_font),
        "fraunces": FontSource(args.fraunces_font),
        "grenze": FontSource(args.grenze_font),
        "unifraktur": FontSource(args.unifraktur_font),
        "denim_ink": FontSource(args.denim_ink_font),
        "karrik": FontSource(args.karrik_font),
        "picnic": FontSource(args.picnic_font),
        "fayte": FontSource(args.fayte_font),
    }
    words = {word: generate_word(word, base, sources, args.points) for word in ("SOFTWARE", "ENGINEER")}
    payload = {
        "unitsPerEm": base.font["head"].unitsPerEm,
        "durationMs": 6400,
        "keyTimes": [0, 0.145, 0.183, 0.359, 0.395, 0.573, 0.614, 0.802, 0.839, 1],
        "words": words,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")


if __name__ == "__main__":
    main()
