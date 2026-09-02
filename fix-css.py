import re

with open('components/portfolio/services-section.module.css', 'r') as f:
    content = f.read()

# Remove technical and evolution artifacts
if '/* Technical Artifact' in content:
    content = content[:content.find('/* Technical Artifact')]

# Modify portraitArtifact
portrait_artifact_new = """
.portraitArtifact {
  position: absolute;
  z-index: -1;
  top: -5%;
  right: -5%;
  width: clamp(25rem, 50vw, 55rem);
  height: 110%;
  pointer-events: none;
  opacity: clamp(0, calc(var(--intro-p) * 0.8), 0.8);
  transform: translate3d(
    calc((1 - var(--intro-p)) * 5vw),
    calc((1 - var(--intro-p)) * 2rem),
    0
  );
  filter: grayscale(1) contrast(3) brightness(0.4);
  mix-blend-mode: hard-light;
  mask-image: radial-gradient(circle at 70% 30%, #000 10%, transparent 60%);
  -webkit-mask-image: radial-gradient(circle at 70% 30%, #000 10%, transparent 60%);
  will-change: opacity, transform;
}

.portraitField {
  display: none;
}

.portraitImage,
.portraitGhost {
  position: absolute;
  inset: auto 0 0 auto;
  width: 100%;
  height: auto;
  display: block;
}

.portraitImage {
  z-index: 1;
  filter: contrast(30) sepia(1) hue-rotate(10deg) brightness(0.6);
  opacity: 0.4;
  mix-blend-mode: color-burn;
}

.portraitGhost {
  z-index: 0;
  filter: grayscale(1) contrast(20) invert(1);
  opacity: 0.15;
  transform: translate3d(-1rem, 1rem, 0);
}

.portraitHalftone {
  position: absolute;
  z-index: 2;
  inset: 0;
  background-image: radial-gradient(circle, #fff 1px, transparent 1.5px);
  background-size: 8px 8px;
  mix-blend-mode: overlay;
  opacity: 0.6;
}
"""

content = re.sub(r'\.portraitArtifact \{[\s\S]*?\.portraitHalftone \{[\s\S]*?\}', portrait_artifact_new.strip(), content)

# update the mobile and reduced motion queries to use --intro-p for portraitArtifact if needed
content = re.sub(r'var\(--entry-p\) \* 2\.6', r'var(--intro-p) * 0.8', content)

with open('components/portfolio/services-section.module.css', 'w') as f:
    f.write(content)

