import re

with open('components/portfolio/ServicesSection.tsx', 'r') as f:
    content = f.read()

# 1. Extract portraitArtifact and remove it from momentIndex === 0
portrait_match = re.search(r'\{momentIndex === 0 && \(\n\s*<div className=\{styles\.portraitArtifact\}[\s\S]*?\)\}', content)
if portrait_match:
    portrait_html = portrait_match.group(0).replace('{momentIndex === 0 && (\n', '').rsplit(')}', 1)[0].strip()
    content = content.replace(portrait_match.group(0), '')
else:
    portrait_html = ''

# 2. Insert portrait_html into the introduction header
if portrait_html:
    intro_replacement = f"""<header className={{styles.introduction}} data-work-intro>
        {portrait_html}
        <h2 id="work-entry-title">"""
    content = content.replace('<header className={styles.introduction} data-work-intro>\n        <h2 id="work-entry-title">', intro_replacement)

with open('components/portfolio/ServicesSection.tsx', 'w') as f:
    f.write(content)
