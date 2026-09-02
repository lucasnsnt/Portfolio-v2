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

const mothFrames = Array.from(
  { length: 8 },
  (_, index) => `/media/portfolio/artifacts/moth-flight/frame-${String(index + 1).padStart(2, '0')}.webp`,
);
const mothRestFrame = mothFrames[mothFrames.length - 1];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mothRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const entries = Array.from(section.querySelectorAll<HTMLElement>('[data-work-entry]'));
    const intro = section.querySelector<HTMLElement>('[data-work-intro]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let displayedIntro = 0;
    let mothFrame = 0;
    let mothIsVisible = false;
    let mothIsResting = false;
    const displayedEntries = entries.map(() => 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        mothIsVisible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );

    const wingbeat = window.setInterval(() => {
      const moth = mothRef.current;
      if (!moth || !mothIsVisible || mothIsResting || reducedMotion.matches) return;

      mothFrame = (mothFrame + 1) % mothFrames.length;
      moth.src = mothFrames[mothFrame];
    }, 110);

    const update = () => {
      frame = 0;
      const viewport = Math.max(window.innerHeight, 1);

      const sectionBounds = section.getBoundingClientRect();
      const sectionTravel = Math.max(sectionBounds.height - viewport, 1);
      const sectionProgress = clamp(-sectionBounds.top / sectionTravel);
      const mothLanding = clamp((sectionProgress - 0.84) / 0.16);
      const moth = mothRef.current;
      mothIsResting = mothLanding >= 0.98 || reducedMotion.matches;

      if (mothIsResting && moth) moth.src = mothRestFrame;

      section.style.setProperty('--section-p', sectionProgress.toFixed(4));
      section.style.setProperty(
        '--moth-wave',
        (Math.sin(sectionProgress * Math.PI * 4.5) * (1 - mothLanding)).toFixed(4),
      );

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
    observer.observe(section);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(wingbeat);
      observer.disconnect();
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
      <div className={styles.mothJourney} aria-hidden="true">
        <div className={styles.mothTraveler}>
          <img
            className={styles.mothSprite}
            src={mothRestFrame}
            alt=""
            decoding="async"
            ref={mothRef}
          />
        </div>
      </div>

      <header className={styles.introduction} data-work-intro>
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
