import re

with open('components/portfolio/ServicesSection.tsx', 'r') as f:
    content = f.read()

# 1. Remove technical and evolution artifacts
content = re.sub(r'\{momentIndex === 1 && \([\s\S]*?</div>\n              \)\}', '', content)
content = re.sub(r'\{momentIndex === 2 && \([\s\S]*?</div>\n              \)\}', '', content)

# 2. Extract portraitArtifact and remove it from momentIndex === 0
portrait_match = re.search(r'\{momentIndex === 0 && \(\n([\s\S]*?)\)\}', content)
if portrait_match:
    portrait_html = portrait_match.group(1).strip()
    content = content.replace(portrait_match.group(0), '')
else:
    portrait_html = ''

# 3. Insert portrait_html into the introduction header
if portrait_html:
    intro_replacement = f"""<header className={{styles.introduction}} data-work-intro>
        {portrait_html}
        <h2 id="work-entry-title">"""
    content = content.replace('<header className={styles.introduction} data-work-intro>\n        <h2 id="work-entry-title">', intro_replacement)

with open('components/portfolio/ServicesSection.tsx', 'w') as f:
    f.write(content)
