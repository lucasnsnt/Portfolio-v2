import styles from './portfolio-navigation.module.css';

export default function PortfolioNavigation({ activeSection }: { activeSection: string }) {
  return (
    <header className={styles.nav}>
      <a className={styles.navBrand} href="#inicio" aria-label="Voltar ao início">
        NSNTDEV
      </a>
      <nav className={styles.navLinks} aria-label="Navegação principal">
        <a href="#trabalhos" aria-current={activeSection === 'trabalhos' ? 'page' : undefined}>
          Projetos
        </a>
        <a href="#servicos" aria-current={activeSection === 'servicos' ? 'page' : undefined}>
          Serviços
        </a>
      </nav>
      <a className={styles.navContact} href="#contato" aria-current={activeSection === 'contato' ? 'page' : undefined}>
        Contato <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
