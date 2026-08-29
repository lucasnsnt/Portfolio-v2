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

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let active = true;
    const timers: number[] = [];
    let progressFrame = 0;
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    document.body.style.overflow = 'hidden';

    const later = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => active && callback(), delay);
      timers.push(timer);
    };

    const startedAt = performance.now();

    const animateProgress = (now: number) => {
      if (!active) return;
      const elapsed = now - startedAt;
      const nextProgress = reducedMotion
        ? 100
        : Math.min(92, Math.round((elapsed / 1050) * 92));

      setProgress(nextProgress);
      if (nextProgress < 92) {
        progressFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    progressFrame = window.requestAnimationFrame(animateProgress);

    const run = async () => {
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const essentialReady = Promise.race([
        Promise.all([fontsReady, waitForWindow()]),
        sleep(2200),
      ]);

      await Promise.all([essentialReady, sleep(reducedMotion ? 120 : 1120)]);
      if (!active) return;

      window.cancelAnimationFrame(progressFrame);
      setProgress(100);
      later(() => setExiting(true), reducedMotion ? 20 : 170);
      later(() => setVisible(false), reducedMotion ? 240 : 1120);
    };

    void run();

    return () => {
      active = false;
      window.cancelAnimationFrame(progressFrame);
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

      <div className="intro-counter" aria-hidden="true">
        {String(progress).padStart(3, '0')}
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

    </section>
  );
}
