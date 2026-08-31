#!/usr/bin/env python3
"""Build one true silhouette from light already present in frame 0076."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/media/bridge/silhouette-motion/frames-selected/frame-0076.webp"
OUTPUT = ROOT / "public/media/bridge/silhouette-motion/treatment-tests/frame-0076-extracted-light-v2.webp"

BACKGROUND = np.array([6, 5, 4], dtype=np.float32)
BRONZE = np.array([128, 91, 59], dtype=np.float32)
CREAM = np.array([218, 184, 142], dtype=np.float32)


def filled_subject_mask(gray_image: Image.Image) -> Image.Image:
    mask = gray_image.point(lambda value: 255 if value > 8 else 0)
    mask = mask.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(5))
    flooded = mask.copy()
    ImageDraw.floodfill(flooded, (0, 0), 128, thresh=1)
    exterior = flooded.point(lambda value: 255 if value == 128 else 0)
    holes = ImageOps.invert(ImageChops.lighter(mask, exterior))
    return ImageChops.lighter(mask, holes)


def facial_privacy_mask(size: tuple[int, int]) -> np.ndarray:
    width, height = size
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    # This mask is used only to suppress detail. It does not paint an oval onto
    # the result, so its boundary cannot become visible.
    draw.ellipse(
        (width * 0.255, height * 0.17, width * 0.745, height * 0.66),
        fill=255,
    )
    mask = mask.filter(ImageFilter.GaussianBlur(width * 0.045))
    return np.asarray(mask, dtype=np.float32) / 255.0


def main() -> None:
    source = Image.open(SOURCE).convert("RGB")
    gray_image = ImageOps.grayscale(source)
    gray = np.asarray(gray_image, dtype=np.float32) / 255.0
    subject_image = filled_subject_mask(gray_image)
    subject = np.asarray(subject_image, dtype=np.float32) / 255.0
    privacy = facial_privacy_mask(source.size)

    # Fine photographic gradients: curls and fabric remain organic because the
    # signal comes from the photograph, not from a thresholded vector outline.
    gx = np.abs(np.roll(gray, -1, axis=1) - np.roll(gray, 1, axis=1))
    gy = np.abs(np.roll(gray, -1, axis=0) - np.roll(gray, 1, axis=0))
    detail = np.sqrt(gx * gx + gy * gy)
    detail = np.clip((detail - 0.018) * 7.5, 0.0, 1.0)
    detail *= subject * (1.0 - privacy)

    # A narrow inner rim defines the body as a dark mass. Multiplication by the
    # original luminance makes the light uneven and photographic.
    eroded = subject_image.filter(ImageFilter.MinFilter(13))
    inner_rim = ImageChops.subtract(subject_image, eroded)
    rim = np.asarray(inner_rim.filter(ImageFilter.GaussianBlur(1.2)), dtype=np.float32) / 255.0
    rim *= np.clip(gray * 1.65, 0.12, 1.0)

    # Internal detail is limited to hair and clothing. The entire face remains a
    # continuous black volume; jaw and head profile come only from the outer rim.
    height, width = gray.shape
    allowed = np.zeros_like(gray)
    allowed[: int(height * 0.31)] = 1.0
    allowed[int(height * 0.69) :] = 1.0
    detail *= allowed

    intensity = np.clip(rim * 0.68 + detail * 0.42, 0.0, 1.0)

    # Scanlines live inside the silhouette and remain almost imperceptible.
    rows = np.arange(height)[:, None]
    scan = ((rows % 8) == 0).astype(np.float32) * subject * 0.055
    intensity = np.clip(intensity + scan, 0.0, 1.0)

    colour = BRONZE[None, None, :] * (1.0 - intensity[..., None])
    colour += CREAM[None, None, :] * intensity[..., None]
    alpha = np.clip(intensity * 0.82, 0.0, 1.0)[..., None]
    result = BACKGROUND[None, None, :] * (1.0 - alpha) + colour * alpha

    # Keep the body itself marginally distinct from the background without
    # revealing photographic midtones or facial planes.
    body_lift = (subject * 0.014)[..., None]
    result += BRONZE[None, None, :] * body_lift
    result = np.clip(result, 0, 255).astype(np.uint8)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(result, "RGB").save(OUTPUT, "WEBP", quality=93, method=6)
    print(OUTPUT)


if __name__ == "__main__":
    main()
