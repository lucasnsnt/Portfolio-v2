'use client';

import { useEffect, useRef } from 'react';
import styles from './hero-study.module.css';

const mediaTiles = [
  ['01', 'DIRECTION', '/media/hero/green-motion.jpg'],
  ['02', 'INTERFACE', '/media/hero/night-motion.jpg'],
  ['03', 'MOTION', '/media/hero/monochrome-motion.jpg'],
  ['04', 'SYSTEM', '/media/hero/galaxy-grain.jpg'],
  ['05', 'EXPERIENCE', '/media/hero/green-motion.jpg'],
  ['06', 'DELIVERY', '/media/hero/night-motion.jpg'],
];

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export default function HeroStudy() {
  const trackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let previousScroll = window.scrollY;

    const update = () => {
      frame = 0;
      const bounds = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-bounds.top / travel);
      const bridge = clamp((progress - 0.25) / 0.38);
      const reveal = clamp((progress - 0.48) / 0.34);
      const settle = clamp((progress - 0.76) / 0.24);
      const direction = window.scrollY >= previousScroll ? 1 : -1;

      track.style.setProperty('--p', progress.toFixed(4));
      track.style.setProperty('--bridge-p', bridge.toFixed(4));
      track.style.setProperty('--reveal-p', reveal.toFixed(4));
      track.style.setProperty('--settle-p', settle.toFixed(4));
      track.style.setProperty('--scroll-direction', String(direction));
      previousScroll = window.scrollY;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <a href="#inicio">NSNT / LUCAS SANTOS</a>
        <a href="#servicos">SERVIÇOS</a>
        <a href="#contato">FALE COMIGO ↗</a>
      </header>

      <section className={styles.track} id="inicio" ref={trackRef}>
        <div className={styles.camera}>
          <div className={styles.frame}>
            <article className={`${styles.chapter} ${styles.opening}`}>
              <div className={styles.mediaStage} aria-hidden="true">
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneBack}`}>
                  <img src="/media/hero/green-motion.jpg" alt="" />
                </div>
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneMiddle}`}>
                  <img src="/media/hero/night-motion.jpg" alt="" />
                </div>
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneFront}`}>
                  <img src="/media/hero/monochrome-motion.jpg" alt="" />
                  <span>DESIGN / DEVELOPMENT</span>
                  <strong>01</strong>
                </div>
                <div className={styles.mediaPulse} />
                <div className={styles.scanner} />
              </div>

              <div className={styles.openingCopy}>
                <p>SOFTWARE DEVELOPMENT / CREATIVE DIRECTION</p>
                <h1>
                  <span>IDEIAS EM</span>
                  <span>MOVIMENTO</span>
                </h1>
              </div>

              <div className={styles.openingInfo}>
                <p>
                  Crio sites profissionais e experiências digitais que unem
                  estratégia, personalidade e tecnologia.
                </p>
                <span>EXPLORE O TRABALHO ↘</span>
              </div>

              <div className={styles.openingFooter}>
                <span>LANDING PAGES</span>
                <span>WEB EXPERIENCES</span>
                <span>SOFTWARE DEVELOPMENT</span>
              </div>
            </article>

            <div className={styles.gap} aria-hidden="true">
              <div className={styles.bridgeMedia} />
              <div className={styles.bridge}>
                <span className={styles.bridgeTop}>DA IDEIA</span>
                <span className={styles.bridgeBottom}>À INTERFACE</span>
              </div>
              <span className={styles.gapIndex}>PROCESSO / 01—02</span>
            </div>

            <article className={`${styles.chapter} ${styles.archive}`}>
              <div className={`${styles.carousel} ${styles.carouselTop}`} aria-hidden="true">
                <div className={styles.carouselRail}>
                  {[...mediaTiles, ...mediaTiles].map(([number, label, image], index) => (
                    <div className={styles.mediaTile} key={`top-${index}`}>
                      <img src={image} alt="" />
                      <span>{number}</span>
                      <strong>{label}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${styles.carousel} ${styles.carouselBottom}`} aria-hidden="true">
                <div className={styles.carouselRailReverse}>
                  {[...mediaTiles.slice().reverse(), ...mediaTiles.slice().reverse()].map(
                    ([number, label, image], index) => (
                      <div className={styles.mediaTile} key={`bottom-${index}`}>
                        <img src={image} alt="" />
                        <span>{number}</span>
                        <strong>{label}</strong>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className={styles.archiveShade} aria-hidden="true" />

              <div className={styles.archiveContent}>
                <div className={styles.archiveMeta}>
                  <span>LUCAS SANTOS — SALVADOR, BA</span>
                  <span>AVAILABLE FOR SELECTED PROJECTS / 2026</span>
                </div>

                <div className={styles.titleMask}>
                  <h2>
                    <span>SOFTWARE</span>
                    <span>ENGINEER</span>
                  </h2>
                </div>

                <div className={styles.positioning}>
                  <p>
                    Desenvolvo sites profissionais, landing pages e experiências
                    digitais com direção visual própria.
                  </p>
                  <a href="#contato">SOLICITAR ORÇAMENTO ↗</a>
                </div>

                <div className={styles.capabilities}>
                  <span>01 / WEB DEVELOPMENT</span>
                  <span>02 / LANDING PAGES</span>
                  <span>03 / CREATIVE EXPERIENCES</span>
                </div>
              </div>
            </article>
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

      <section className={styles.after} id="servicos">
        <div className={styles.afterIntro}>
          <p>COMO POSSO AJUDAR / 01</p>
          <h2>Da primeira ideia ao site no ar.</h2>
          <p className={styles.afterLead}>
            Projetos digitais construídos de ponta a ponta, com clareza técnica
            e uma direção visual que não parece saída de um template.
          </p>
        </div>

        <div className={styles.serviceList}>
          <article>
            <span>01</span>
            <h3>Landing pages</h3>
            <p>Páginas focadas em apresentar, convencer e gerar contato.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Sites institucionais</h3>
            <p>Presença digital profissional com estrutura feita para o negócio.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Experiências sob medida</h3>
            <p>Interfaces, interações e sistemas adaptados a cada projeto.</p>
          </article>
        </div>

        <div className={styles.afterFooter} id="contato">
          <span>PRECISA DE UM SITE? VAMOS CONVERSAR.</span>
          <a href="https://instagram.com/nsnt">INICIAR CONVERSA ↗</a>
        </div>
      </section>
    </main>
  );
}
