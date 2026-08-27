'use client';

import { useEffect, useState } from 'react';

const sleep = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

const waitForWindow = () =>
  document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise<void>((resolve) =>
        window.addEventListener('load', () => resolve(), { once: true }),
      );

const phases = ['PREPARANDO', 'TIPOGRAFIA', 'INTERFACE', 'PRONTO'];

export default function IntroLoader() {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let active = true;
    const timers: number[] = [];
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    document.body.style.overflow = 'hidden';

    const later = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => active && callback(), delay);
      timers.push(timer);
    };

    if (!reducedMotion) {
      later(() => setPhase(1), 320);
      later(() => setPhase(2), 760);
    }

    const run = async () => {
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const essentialReady = Promise.race([
        Promise.all([fontsReady, waitForWindow()]),
        sleep(2200),
      ]);

      await Promise.all([essentialReady, sleep(reducedMotion ? 180 : 1180)]);
      if (!active) return;

      setPhase(3);
      later(() => setExiting(true), reducedMotion ? 40 : 150);
      later(() => setVisible(false), reducedMotion ? 260 : 900);
    };

    void run();

    return () => {
      active = false;
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  if (!visible) return null;

  return (
    <section
      className={`intro-loader${exiting ? ' is-exiting' : ''}`}
      aria-label="Carregando portfólio de Lucas Santos"
      aria-live="polite"
      aria-busy={!exiting}
    >
      <svg
        className="intro-filter"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="intro-warp" x="-6%" y="-8%" width="112%" height="116%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.009 0.016"
              numOctaves="3"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="intro-meta intro-meta-top" aria-hidden="true">
        <span>NSNT / PORTFOLIO 02</span>
        <span>INITIAL SEQUENCE</span>
      </div>

      <div className="intro-echo" aria-hidden="true">
        <span>software developer</span>
      </div>

      <div className="intro-name-wrap">
        <h1 className="intro-name">
          <span className="intro-name-line intro-name-lucas">LUCAS</span>
          <span className="intro-name-line intro-name-santos">SANTOS</span>
        </h1>
      </div>

      <div className="intro-meta intro-meta-bottom">
        <span className="intro-status" key={phases[phase]}>
          {phases[phase]}
        </span>
        <span aria-hidden="true">SALVADOR — BA</span>
      </div>

      <div className="intro-rule" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
