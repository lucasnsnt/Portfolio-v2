#!/usr/bin/env python3
"""Create one non-generative photographic silhouette treatment.

This test preserves the source photograph and only changes exposure, colour and
visibility. It intentionally targets the difficult, front-facing frame 0076.
"""

from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/media/bridge/silhouette-motion/frames-selected/frame-0076.webp"
OUTPUT = ROOT / "public/media/bridge/silhouette-motion/treatment-tests/frame-0076-photographic-v1.webp"

WARM_BLACK = (8, 7, 6)
DARK_BRONZE = (43, 31, 22)
WARM_LIGHT = (192, 151, 108)


def gamma(image: Image.Image, value: float) -> Image.Image:
    table = [round(255 * ((level / 255) ** value)) for level in range(256)]
    return image.point(table * len(image.getbands()))


def subject_mask(source: Image.Image) -> Image.Image:
    luminance = ImageOps.grayscale(source)
    mask = luminance.point(lambda level: 255 if level > 8 else 0)
    return mask.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(5))


def face_blackout(size: tuple[int, int]) -> Image.Image:
    # White means fully concealed. The broad feather prevents a pasted-on oval.
    width, height = size
    mask = Image.new("L", size, 0)
    ellipse = Image.new("L", size, 0)
    from PIL import ImageDraw

    draw = ImageDraw.Draw(ellipse)
    draw.ellipse(
        (
            int(width * 0.275),
            int(height * 0.205),
            int(width * 0.725),
            int(height * 0.625),
        ),
        fill=255,
    )
    ellipse = ellipse.filter(ImageFilter.GaussianBlur(int(width * 0.055)))
    return ImageChops.lighter(mask, ellipse)


def main() -> None:
    source = Image.open(SOURCE).convert("RGB")
    mask = subject_mask(source)

    # Preserve the photographic tonal relationships while pushing almost all
    # midtones into warm black.
    gray = ImageOps.grayscale(source)
    photographic = ImageOps.colorize(gray, DARK_BRONZE, WARM_LIGHT)
    photographic = gamma(photographic, 2.15)
    photographic = ImageEnhance.Contrast(photographic).enhance(1.12)
    photographic = ImageEnhance.Brightness(photographic).enhance(0.54)

    canvas = Image.new("RGB", source.size, WARM_BLACK)
    canvas.paste(photographic, mask=mask.point(lambda level: int(level * 0.78)))

    # Recover only broad, real peripheral highlights. This is a soft luminous
    # region from the photograph, not a generated or vectorised contour.
    expanded = mask.filter(ImageFilter.MaxFilter(51))
    contracted = mask.filter(ImageFilter.MinFilter(51))
    perimeter = ImageChops.subtract(expanded, contracted).filter(ImageFilter.GaussianBlur(18))
    source_light = gamma(gray, 1.55)
    rim_alpha = ImageChops.multiply(perimeter, source_light).point(lambda level: int(level * 0.38))
    rim = ImageOps.colorize(source_light, DARK_BRONZE, WARM_LIGHT)
    canvas.paste(rim, mask=rim_alpha)

    # The face is removed after every photographic layer, guaranteeing that no
    # eyes, nose or mouth can return through highlights.
    conceal = face_blackout(source.size)
    canvas.paste(Image.new("RGB", source.size, WARM_BLACK), mask=conceal)

    # Low-amplitude monochromatic grain avoids a clinically smooth blackout.
    noise = Image.effect_noise(source.size, 5).convert("L")
    noise = ImageEnhance.Contrast(noise).enhance(0.45)
    noise_layer = ImageOps.colorize(noise, WARM_BLACK, DARK_BRONZE)
    canvas = Image.blend(canvas, noise_layer, 0.035)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT, "WEBP", quality=92, method=6)
    print(OUTPUT)


if __name__ == "__main__":
    main()
