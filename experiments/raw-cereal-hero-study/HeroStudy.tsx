'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './hero-study.module.css';

export default function HeroStudy() {
  const trackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const bounds = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / travel, 0), 1);
      track.style.setProperty('--hero-progress', progress.toFixed(4));
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
        <a href="#prototype">NSNT / 02</a>
        <span>HERO MECHANICS — STUDY 01</span>
        <Link href="/">VOLTAR</Link>
      </header>

      <section className={styles.track} id="prototype" ref={trackRef}>
        <div className={styles.camera}>
          <div className={styles.frame}>
            <article className={`${styles.chapter} ${styles.atmosphere}`}>
              <div className={styles.orbit} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <p className={styles.kicker}>ARQUIVO DIGITAL EM MOVIMENTO</p>
              <p className={styles.signal} aria-hidden="true">
                BUILDING / VISUAL SYSTEMS / FOR THE WEB
              </p>
              <div className={styles.atmosphereFooter}>
                <span>SOFTWARE / DESIGN / MOTION</span>
                <span>ROLE PARA REVELAR</span>
              </div>
            </article>

            <div className={styles.bridge} aria-hidden="true">
              <span>IDEIAS EM</span>
              <strong>MOVIMENTO</strong>
            </div>

            <article className={`${styles.chapter} ${styles.identity}`}>
              <div className={styles.identityGrid}>
                <p className={styles.kicker}>LUCAS SANTOS — SALVADOR, BA</p>
                <p className={styles.index}>PORTFOLIO / 2026</p>

                <h1>
                  <span>SOFTWARE</span>
                  <span className={styles.outline}>ENGINEER</span>
                </h1>

                <div className={styles.positioning}>
                  <p>
                    Desenvolvo sites profissionais, landing pages e experiências
                    digitais com direção visual própria.
                  </p>
                  <a href="#contact-preview">SOLICITAR ORÇAMENTO ↗</a>
                </div>

                <div className={styles.capabilities}>
                  <span>01 / WEB DEVELOPMENT</span>
                  <span>02 / LANDING PAGES</span>
                  <span>03 / CREATIVE EXPERIENCES</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.after} id="contact-preview">
        <p>FIM DO TESTE DE MECÂNICA</p>
        <h2>A próxima entrada seria Selected Work.</h2>
        <Link href="/">Voltar para a fundação</Link>
      </section>
    </main>
  );
}
