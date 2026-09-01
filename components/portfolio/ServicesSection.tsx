'use client';

import { useEffect, useRef } from 'react';
import styles from './services-section.module.css';

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const workMoments = [
  {
    verb: 'Apresentar',
    echo: 'Presença digital',
    statement:
      'Dar forma clara ao que você oferece e construir uma presença que sustente essa primeira impressão.',
    deliveries: ['Landing pages', 'Sites institucionais', 'Portfólios'],
  },
  {
    verb: 'Construir',
    echo: 'Produto e interface',
    statement:
      'Transformar uma necessidade em interface, fluxo e código — da estrutura inicial ao produto funcionando.',
    deliveries: ['Interfaces web', 'Sistemas sob medida', 'Experiências interativas'],
  },
  {
    verb: 'Evoluir',
    echo: 'Continuidade técnica',
    statement:
      'Rever o que já existe, corrigir atritos e criar espaço para o projeto continuar crescendo depois da entrega.',
    deliveries: ['Redesign e melhorias', 'Integrações web', 'Manutenção e evolução'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const entries = Array.from(section.querySelectorAll<HTMLElement>('[data-work-entry]'));
    const intro = section.querySelector<HTMLElement>('[data-work-intro]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let displayedIntro = 0;
    const displayedEntries = entries.map(() => 0);

    const update = () => {
      frame = 0;
      const viewport = Math.max(window.innerHeight, 1);

      if (reducedMotion.matches) {
        section.style.setProperty('--intro-p', '1');
        entries.forEach((entry) => entry.style.setProperty('--entry-p', '1'));
        return;
      }

      if (intro) {
        const bounds = intro.getBoundingClientRect();
        const target = clamp(-bounds.top / Math.max(bounds.height - viewport, 1));
        displayedIntro += (target - displayedIntro) * 0.12;
        section.style.setProperty('--intro-p', displayedIntro.toFixed(4));
      }

      let needsAnotherFrame = false;

      entries.forEach((entry, entryIndex) => {
        const bounds = entry.getBoundingClientRect();
        const travel = Math.max(bounds.height - viewport, 1);
        const target = clamp(-bounds.top / travel);
        displayedEntries[entryIndex] += (target - displayedEntries[entryIndex]) * 0.14;
        const progress = displayedEntries[entryIndex];
        entry.style.setProperty('--entry-p', progress.toFixed(4));
        entry.style.setProperty('--entry-wave', Math.sin(progress * Math.PI).toFixed(4));

        const characters = entry.querySelectorAll<HTMLElement>('[data-character]');
        characters.forEach((character, characterIndex) => {
          const delay = characterIndex * 0.045;
          const characterProgress = clamp((progress - delay) / Math.max(0.56 - delay, 0.12));
          character.style.setProperty('--char-p', characterProgress.toFixed(4));
        });

        if (Math.abs(target - progress) > 0.001) needsAnotherFrame = true;
      });

      if (needsAnotherFrame) frame = window.requestAnimationFrame(update);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
    };
  }, []);

  return (
    <section
      className={styles.section}
      id="servicos"
      aria-labelledby="work-entry-title"
      ref={sectionRef}
    >
      <header className={styles.introduction} data-work-intro>
        <div className={styles.portraitArtifact} aria-hidden="true">
                  <div className={styles.portraitField} />
                  <img
                    className={styles.portraitGhost}
                    src="/media/portfolio/cutouts/lucas-hoodie-silhouette-v1.png"
                    alt=""
                  />
                  <img
                    className={styles.portraitImage}
                    src="/media/portfolio/cutouts/lucas-hoodie-silhouette-v1.png"
                    alt=""
                  />
                  <div className={styles.portraitHalftone} />
                </div>
        <h2 id="work-entry-title">
          Onde eu
          <span>entro</span>
        </h2>

        <div className={styles.introCopy}>
          <p>
            Meu trabalho pode começar na ideia, continuar na construção ou entrar
            quando um produto existente precisa avançar.
          </p>
        </div>
      </header>

      <div className={styles.entries}>
        {workMoments.map((moment, momentIndex) => (
          <article
            className={styles.entry}
            id={momentIndex === 0 ? 'apresentar' : undefined}
            key={moment.verb}
            data-work-entry
          >
            <div className={styles.entryStage}>

              

              <p className={styles.echo} aria-hidden="true">{moment.echo}</p>

              <div className={styles.verbMask}>
                <h3 aria-label={moment.verb}>
                  {Array.from(moment.verb).map((character, characterIndex) => (
                    <span
                      aria-hidden="true"
                      data-character
                      key={`${character}-${characterIndex}`}
                    >
                      {character}
                    </span>
                  ))}
                </h3>
              </div>

              <div className={styles.entryDetails}>
                <p>{moment.statement}</p>

                <div className={styles.deliveryBlock}>
                  <ul>
                    {moment.deliveries.map((delivery) => (
                      <li key={delivery}>{delivery}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className={styles.handoff} id="contato">
        <div>
          <p>Selected Work</p>
        </div>
        <a href="https://instagram.com/nsnt">
          <span>Falar sobre um projeto</span>
          <strong aria-hidden="true">+</strong>
        </a>
      </footer>
    </section>
  );
}
