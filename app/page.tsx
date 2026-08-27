import IntroLoader from '../components/IntroLoader';

const foundations = [
  ['01', 'Direção criativa', 'Posicionamento e universo conceitual'],
  ['02', 'Referências', 'Princípios, não cópias'],
  ['03', 'Linguagem visual', 'Cor, tipo, matéria e fotografia'],
  ['04', 'Movimento', 'Ritmo, resposta e adaptação'],
  ['05', 'Estrutura', 'Conteúdo, percursos e conversão'],
  ['06', 'Anti-padrões', 'Diagnóstico sem censura estética'],
  ['07', 'Aprovação', 'Critérios para decidir e validar'],
];

export default function Home() {
  return (
    <>
      <IntroLoader />
      <main className="foundation-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <header className="foundation-nav">
        <a className="signature" href="#top" aria-label="Voltar ao início">
          NSNT / 02
        </a>
        <p>PORTFOLIO V2 · FUNDAÇÃO</p>
        <span>PT / EN</span>
      </header>

      <section className="foundation-hero" id="top">
        <p className="eyebrow">Arquivo digital em movimento</p>
        <h1>
          Uma nova presença para trabalho, <em>experimento</em> e tecnologia.
        </h1>
        <div className="hero-foot">
          <p>
            Estrutura pronta para transformar a pesquisa visual em uma experiência
            autoral, clara e funcional.
          </p>
          <span aria-label="Status do projeto">BASE / 01</span>
        </div>
      </section>

      <section className="foundation-index" aria-labelledby="foundation-title">
        <div className="index-intro">
          <p className="eyebrow">Sistema de trabalho</p>
          <h2 id="foundation-title">Sete documentos. Uma direção.</h2>
        </div>

        <ol>
          {foundations.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="foundation-footer">
        <p>Próxima fase: auditorias técnicas e primeiro corte vertical.</p>
        <p>Lucas Santos · 2026</p>
      </footer>
      </main>
    </>
  );
}
