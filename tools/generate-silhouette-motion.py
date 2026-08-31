#!/usr/bin/env python3
"""Generate a stable, face-obscured silhouette sequence from source frames.

The treatment never synthesizes portrait content. It derives a foreground mask,
rim light and restrained motion echoes from the existing frames so identity is
carried by posture and outline while facial features remain black.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageOps


WARM_BLACK = (8, 7, 6)
RIM_LIGHT = (194, 158, 116)
BRONZE = (128, 96, 68)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--preview-only", action="store_true")
    return parser.parse_args()


def colorize_mask(mask: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    layer = Image.new("RGB", mask.size, color)
    layer.putalpha(mask)
    return layer


def foreground_mask(image: Image.Image) -> Image.Image:
    # The supplied sequence is already isolated on black. A low threshold keeps
    # the black shirt connected to the brighter head/neck without exposing skin.
    luminance = ImageOps.grayscale(image)
    mask = luminance.point(lambda value: 255 if value > 10 else 0)
    mask = mask.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.MinFilter(9))

    # Fill every enclosed dark pocket before calculating the rim. Without this,
    # eyes, brows and nostrils become false "edges" inside the silhouette.
    flooded = mask.copy()
    ImageDraw.floodfill(flooded, (0, 0), 128, thresh=1)
    background = flooded.point(lambda value: 255 if value == 128 else 0)
    holes = ImageOps.invert(ImageChops.lighter(mask, background))
    mask = ImageChops.lighter(mask, holes)
    return mask.filter(ImageFilter.GaussianBlur(1.2))


def silhouette_rim(mask: Image.Image) -> Image.Image:
    expanded = mask.filter(ImageFilter.MaxFilter(7))
    contracted = mask.filter(ImageFilter.MinFilter(7))
    outer = ImageChops.subtract(expanded, mask)
    inner = ImageChops.subtract(mask, contracted)
    rim = ImageChops.lighter(outer, inner)
    rim = ImageEnhance.Contrast(rim).enhance(1.25)
    return rim.filter(ImageFilter.GaussianBlur(0.9))


def hair_and_clothing_texture(image: Image.Image, mask: Image.Image) -> Image.Image:
    # Preserve a small amount of physical texture only in dark source regions.
    # Skin is brighter and is therefore excluded, keeping the face unreadable.
    gray = ImageOps.grayscale(image)
    dark = gray.point(lambda value: max(0, 150 - value * 2))
    detail = gray.filter(ImageFilter.FIND_EDGES)
    detail = ImageChops.multiply(detail, dark)
    detail = ImageChops.multiply(detail, mask)

    # A hard privacy band removes every internal facial cue. Texture survives
    # only above the forehead and below the neck/shoulder line.
    safe_regions = Image.new("L", image.size, 0)
    width, height = image.size
    safe_draw = ImageDraw.Draw(safe_regions)
    safe_draw.rectangle((0, 0, width, int(height * 0.27)), fill=255)
    safe_draw.rectangle((0, int(height * 0.66), width, height), fill=255)
    detail = ImageChops.multiply(detail, safe_regions)
    return detail.point(lambda value: min(24, int(value * 0.16)))


def scanline_mask(size: tuple[int, int], phase: int) -> Image.Image:
    width, height = size
    line = Image.new("L", (1, height), 0)
    pixels = line.load()
    for y in range(height):
        band = (y + phase) % 9
        pixels[0, y] = 7 if band == 0 else 0
    return line.resize((width, height))


def offset_alpha(layer: Image.Image, x: int) -> Image.Image:
    shifted = Image.new("RGBA", layer.size)
    shifted.alpha_composite(layer, (x, 0))
    return shifted


def render_frame(image: Image.Image, frame_index: int) -> Image.Image:
    image = image.convert("RGB")
    mask = foreground_mask(image)
    rim = silhouette_rim(mask)
    texture = hair_and_clothing_texture(image, mask)

    result = Image.new("RGBA", image.size, (*WARM_BLACK, 255))

    # A restrained temporal-looking echo. It is derived from the same contour,
    # so it cannot introduce anatomy or fragment the portrait between frames.
    bronze = colorize_mask(rim.point(lambda v: int(v * 0.12)), BRONZE)
    result.alpha_composite(offset_alpha(bronze, -3))

    soft_rim = rim.filter(ImageFilter.GaussianBlur(5)).point(lambda v: int(v * 0.18))
    result.alpha_composite(colorize_mask(soft_rim, BRONZE))
    result.alpha_composite(colorize_mask(rim.point(lambda v: int(v * 0.46)), RIM_LIGHT))
    result.alpha_composite(colorize_mask(texture, BRONZE))

    # Scanlines stay subordinate to the photographic outline and move slowly.
    scan = ImageChops.multiply(scanline_mask(image.size, frame_index // 2), mask)
    result.alpha_composite(colorize_mask(scan, BRONZE))
    return result.convert("RGB")


def main() -> None:
    args = parse_args()
    frames = sorted(args.input.glob("frame-*.webp"))
    if not frames:
        raise SystemExit(f"No WebP frames found in {args.input}")

    args.output.mkdir(parents=True, exist_ok=True)
    if args.preview_only:
        wanted = {"frame-0001.webp", "frame-0040.webp", "frame-0076.webp", "frame-0112.webp", "frame-0151.webp"}
        frames = [frame for frame in frames if frame.name in wanted]

    for index, source in enumerate(frames):
        rendered = render_frame(Image.open(source), index)
        rendered.save(args.output / source.name, "WEBP", quality=90, method=6)

    print(f"Rendered {len(frames)} frames to {args.output}")


if __name__ == "__main__":
    main()
