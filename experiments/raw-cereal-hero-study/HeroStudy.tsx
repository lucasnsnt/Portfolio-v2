'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './hero-study.module.css';

const mediaTiles = [
  ['01', 'MOTION', styles.mediaAmber],
  ['02', 'SYSTEM', styles.mediaBlue],
  ['03', 'IMAGE', styles.mediaRose],
  ['04', 'TYPE', styles.mediaOlive],
  ['05', 'CODE', styles.mediaViolet],
  ['06', 'SPACE', styles.mediaSilver],
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
        <a href="#prototype">NSNT / MOTION LAB</a>
        <span>REFERENCE MECHANICS — STUDY 02</span>
        <Link href="/">VOLTAR</Link>
      </header>

      <section className={styles.track} id="prototype" ref={trackRef}>
        <div className={styles.camera}>
          <div className={styles.frame}>
            <article className={`${styles.chapter} ${styles.opening}`}>
              <div className={styles.mediaStage} aria-hidden="true">
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneBack}`} />
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneMiddle}`} />
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneFront}`}>
                  <span>MEDIA / PLACEHOLDER</span>
                  <strong>01</strong>
                </div>
                <div className={styles.mediaPulse} />
              </div>

              <div className={styles.openingCopy}>
                <p>IMMERSIVE INTERFACE STUDY</p>
                <h1>
                  <span>BUILD THE</span>
                  <span>UNSEEN</span>
                </h1>
              </div>

              <div className={styles.openingInfo}>
                <p>
                  Estudo neutro de enquadramento, profundidade, transição e
                  resposta ao scroll.
                </p>
                <span>ROLE PARA ATRAVESSAR ↘</span>
              </div>

              <div className={styles.openingFooter}>
                <span>MEDIA DIRECTION</span>
                <span>DIGITAL EXPERIENCES</span>
                <span>SOFTWARE SYSTEMS</span>
              </div>
            </article>

            <div className={styles.gap} aria-hidden="true">
              <div className={styles.bridge}>
                <span className={styles.bridgeTop}>BREAK THE</span>
                <span className={styles.bridgeBottom}>FRAME</span>
              </div>
              <span className={styles.gapIndex}>TRANSITION / 01—02</span>
            </div>

            <article className={`${styles.chapter} ${styles.archive}`}>
              <div className={`${styles.carousel} ${styles.carouselTop}`} aria-hidden="true">
                <div className={styles.carouselRail}>
                  {[...mediaTiles, ...mediaTiles].map(([number, label, tone], index) => (
                    <div className={`${styles.mediaTile} ${tone}`} key={`top-${index}`}>
                      <span>{number}</span>
                      <strong>{label}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${styles.carousel} ${styles.carouselBottom}`} aria-hidden="true">
                <div className={styles.carouselRailReverse}>
                  {[...mediaTiles.slice().reverse(), ...mediaTiles.slice().reverse()].map(
                    ([number, label, tone], index) => (
                      <div className={`${styles.mediaTile} ${tone}`} key={`bottom-${index}`}>
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
                  <span>PORTFOLIO / 2026</span>
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
                  <a href="#study-end">SOLICITAR ORÇAMENTO ↗</a>
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

      <section className={styles.after} id="study-end">
        <p>MECHANICS STUDY / END STATE</p>
        <h2>A próxima camada será nossa identidade.</h2>
        <div>
          <span>FRAME / PARALLAX / MASK / MARQUEE / COLOR EVENTS</span>
          <Link href="/">Voltar para a fundação</Link>
        </div>
      </section>
    </main>
  );
}
