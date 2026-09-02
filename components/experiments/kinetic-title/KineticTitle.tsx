'use client';

import { useEffect, useRef, useState } from 'react';
import titleData from './kinetic-title-paths.json';
import styles from './kinetic-title.module.css';

type GlyphData = {
  character: string;
  states: string[];
  strokeWidths?: number[];
  effectOpacity?: number[];
};

type WordData = {
  text: string;
  width: number;
  top: number;
  height: number;
  glyphs: GlyphData[];
};

type KineticTitleProps = {
  active?: boolean;
  className?: string;
  mode?: 'standalone' | 'portfolio';
};

const stateOrder = [0, 0, 1, 1, 2, 2, 3, 3, 0, 0];
const keyTimes = titleData.keyTimes.join(';');
const keySplines = Array.from({ length: stateOrder.length - 1 }, (_, index) =>
  index % 2 === 0 ? '0 0 1 1' : '0.76 0 0.24 1',
).join(';');

function KineticWord({
  word,
  animate,
  outlined = false,
}: {
  word: WordData;
  animate: boolean;
  outlined?: boolean;
}) {
  return (
    <svg
      className={styles.word}
      viewBox={`${-word.width * 0.08} ${word.top} ${word.width * 1.16} ${word.height}`}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio={outlined ? 'xMaxYMid meet' : 'xMinYMid meet'}
    >
      {word.glyphs.map((glyph, glyphIndex) => (
        <g key={`${glyph.character}-${glyphIndex}`}>
          {glyph.effectOpacity?.some(Boolean) && (
            <path
              className={styles.haze}
              d={glyph.states[0]}
              fill={outlined ? 'none' : 'currentColor'}
              stroke="currentColor"
              strokeWidth={outlined ? 5 : 2.5}
              strokeLinejoin="round"
              opacity={glyph.effectOpacity[0]}
            >
              {animate && (
                <>
                  <animate
                    attributeName="d"
                    calcMode="spline"
                    dur={`${titleData.durationMs}ms`}
                    keySplines={keySplines}
                    keyTimes={keyTimes}
                    repeatCount="indefinite"
                    values={stateOrder.map((state) => glyph.states[state]).join(';')}
                  />
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur={`${titleData.durationMs}ms`}
                    keySplines={keySplines}
                    keyTimes={keyTimes}
                    repeatCount="indefinite"
                    values={stateOrder.map((state) => glyph.effectOpacity?.[state] ?? 0).join(';')}
                  />
                </>
              )}
            </path>
          )}
          <path
            d={glyph.states[0]}
            fill={outlined ? 'none' : 'currentColor'}
            stroke={outlined || glyph.strokeWidths?.some(Boolean) ? 'currentColor' : 'none'}
            strokeWidth={outlined ? 2 : (glyph.strokeWidths?.[0] ?? 0)}
            strokeLinejoin="round"
          >
          {animate && (
            <>
              <animate
                attributeName="d"
                calcMode="spline"
                dur={`${titleData.durationMs}ms`}
                keySplines={keySplines}
                keyTimes={keyTimes}
                repeatCount="indefinite"
                values={stateOrder.map((state) => glyph.states[state]).join(';')}
              />
              {!outlined && glyph.strokeWidths?.some(Boolean) && (
                <animate
                  attributeName="stroke-width"
                  calcMode="spline"
                  dur={`${titleData.durationMs}ms`}
                  keySplines={keySplines}
                  keyTimes={keyTimes}
                  repeatCount="indefinite"
                  values={stateOrder.map((state) => glyph.strokeWidths?.[state] ?? 0).join(';')}
                />
              )}
            </>
          )}
          </path>
        </g>
      ))}
    </svg>
  );
}

export default function KineticTitle({
  active = true,
  className = '',
  mode = 'standalone',
}: KineticTitleProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreferences = () => {
      setMotionEnabled(!reducedMotion.matches);
    };

    updatePreferences();
    reducedMotion.addEventListener('change', updatePreferences);

    return () => {
      reducedMotion.removeEventListener('change', updatePreferences);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motionEnabled || !active) return;
    const animationRoot = mode === 'portfolio' ? root.parentElement : root;
    if (!animationRoot) return;
    const svgs = Array.from(animationRoot.querySelectorAll('svg'));

    const setPaused = (paused: boolean) => {
      svgs.forEach((svg) => {
        if (paused) svg.pauseAnimations();
        else svg.unpauseAnimations();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting || document.hidden),
      { threshold: 0.05 },
    );
    const handleVisibility = () => setPaused(document.hidden);

    observer.observe(root);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      setPaused(true);
    };
  }, [active, mode, motionEnabled]);

  const shouldAnimate = active && motionEnabled;

  if (mode === 'portfolio') {
    return (
      <>
        <span ref={rootRef} className={`${styles.portfolioLine} ${className}`} aria-hidden="true">
          <KineticWord word={titleData.words.SOFTWARE as WordData} animate={shouldAnimate} />
        </span>
        <span className={`${styles.portfolioLine} ${className}`} aria-hidden="true">
          <KineticWord word={titleData.words.ENGINEER as WordData} animate={shouldAnimate} outlined />
        </span>
      </>
    );
  }

  return (
    <span
      ref={rootRef}
      className={`${styles.title} ${className}`}
      role="text"
      aria-label="Software Engineer"
    >
      <KineticWord word={titleData.words.SOFTWARE as WordData} animate={shouldAnimate} />
      <KineticWord word={titleData.words.ENGINEER as WordData} animate={shouldAnimate} outlined />
    </span>
  );
}
