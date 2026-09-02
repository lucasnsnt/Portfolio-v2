import re

with open('components/portfolio/PortfolioHome.tsx', 'r') as f:
    content = f.read()

# Add import if missing
if 'import ServicesSection' not in content:
    content = content.replace("import KineticTitle from '../experiments/kinetic-title/KineticTitle';", "import KineticTitle from '../experiments/kinetic-title/KineticTitle';\nimport ServicesSection from './ServicesSection';")
    if 'import ServicesSection' not in content: # fallback
        content = content.replace("import styles from './portfolio-home.module.css';", "import styles from './portfolio-home.module.css';\nimport ServicesSection from './ServicesSection';")

# Replace the after section with ServicesSection
after_section_regex = r'<section className=\{styles\.after\} id="servicos">[\s\S]*?</section>'
content = re.sub(after_section_regex, '<ServicesSection />', content)

with open('components/portfolio/PortfolioHome.tsx', 'w') as f:
    f.write(content)
