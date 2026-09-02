import re

# Revert TSX
with open('components/portfolio/ServicesSection.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'\s*\{momentIndex === 1 && \([\s\S]*?</div>\n              \)\}', '', content)
content = re.sub(r'\s*\{momentIndex === 2 && \([\s\S]*?</div>\n              \)\}', '', content)

with open('components/portfolio/ServicesSection.tsx', 'w') as f:
    f.write(content)

# Revert CSS
with open('components/portfolio/services-section.module.css', 'r') as f:
    content = f.read()

if '/* Technical Artifact' in content:
    content = content[:content.find('/* Technical Artifact')]

with open('components/portfolio/services-section.module.css', 'w') as f:
    f.write(content)
