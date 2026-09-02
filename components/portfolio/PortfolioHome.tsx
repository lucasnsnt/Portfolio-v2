'use client';

import { useEffect, useRef } from 'react';
import styles from './portfolio-home.module.css';
import KineticTitle from '../experiments/kinetic-title/KineticTitle';
import ServicesSection from './ServicesSection';

const terminalProductionImage =
  '/media/projects/unemployment-killer/vps-spring-production.png';

const mediaTiles = [
  ['01', 'DIRECTION', '/media/hero/green-motion.jpg'],
  ['02', 'INTERFACE', '/media/hero/night-motion.jpg'],
  ['03', 'SPRING / VPS', terminalProductionImage],
  ['04', 'SYSTEM', '/media/hero/galaxy-grain.jpg'],
  ['05', 'EXPERIENCE', '/media/hero/green-motion.jpg'],
  ['06', 'DELIVERY', '/media/hero/night-motion.jpg'],
];

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const makeBridgeFrames = (step: number, variant: 'desktop' | 'mobile') =>
  Array.from({ length: Math.floor(150 / step) + 1 }, (_, index) => {
    const frameNumber = String(1 + index * step).padStart(4, '0');
    return `/media/bridge/silhouette-motion/production/${variant}/frame-${frameNumber}.webp`;
  });

const desktopBridgeFrames = makeBridgeFrames(3, 'desktop');
const mobileBridgeFrames = makeBridgeFrames(6, 'mobile');

type PortfolioHomeProps = {
  openingVariant?: 'default' | 'environment-fragments' | 'media-light-type' | 'media-transfer';
};

export default function PortfolioHome({ openingVariant = 'default' }: PortfolioHomeProps) {
  const trackRef = useRef<HTMLElement>(null);
  const bridgePortraitRef = useRef<HTMLImageElement>(null);
  const usesEnvironmentFragments = openingVariant === 'environment-fragments';
  const usesMediaLightType = openingVariant === 'media-light-type';
  const usesMediaTransfer = openingVariant === 'default' || openingVariant === 'media-transfer';

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let previousScroll = window.scrollY;
    let previousPortraitFrame = -1;
    let displayedTitleMerge = 0;
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preloadedFrames: HTMLImageElement[] = [];

    const getBridgeFrames = () =>
      mobileQuery.matches ? mobileBridgeFrames : desktopBridgeFrames;

    const preloadBridgeFrames = () => {
      if (reducedMotionQuery.matches) return;

      getBridgeFrames().forEach((source) => {
        const image = new window.Image();
        image.decoding = 'async';
        image.src = source;
        preloadedFrames.push(image);
      });
    };

    const update = () => {
      frame = 0;
      const bounds = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const travelled = -bounds.top;
      const progress = clamp(travelled / travel);
      const sceneEnd = mobileQuery.matches ? 0.655 : 0.667;
      const scene = clamp(progress / sceneEnd);
      const exitDistance = Math.max(window.innerHeight * 0.38, 1);
      const mergeLinear = clamp((travelled - travel) / exitDistance);
      const mergeTarget = reducedMotionQuery.matches
        ? 0
        : mergeLinear * mergeLinear * (3 - 2 * mergeLinear);
      const mergeDistance = mergeTarget - displayedTitleMerge;

      displayedTitleMerge = Math.abs(mergeDistance) < 0.001
        ? mergeTarget
        : displayedTitleMerge + mergeDistance * 0.18;
      const bridge = clamp((scene - 0.25) / 0.38);
      const portrait = clamp((scene - 0.03) / 0.78);
      const portraitEnter = clamp((scene - 0.015) / 0.08);
      const portraitExit = 1 - clamp((scene - 0.91) / 0.09);
      const portraitVisibility = portraitEnter * portraitExit;
      const bridgeVisibility = 1 - clamp((scene - 0.91) / 0.09);
      const reveal = clamp((scene - 0.48) / 0.34);
      const settle = clamp((scene - 0.76) / 0.24);
      const transferOneLinear = clamp((scene - 0.08) / 0.74);
      const transferTwoLinear = clamp((scene - 0.14) / 0.72);
      const transferThreeLinear = clamp((scene - 0.2) / 0.7);
      const transferOne = transferOneLinear * transferOneLinear * (3 - 2 * transferOneLinear);
      const transferTwo = transferTwoLinear * transferTwoLinear * (3 - 2 * transferTwoLinear);
      const transferThree = transferThreeLinear * transferThreeLinear * (3 - 2 * transferThreeLinear);
      const transferEnter = (value: number) => clamp(value / 0.08);
      const transferOneVisibility = transferEnter(transferOne)
        * (1 - clamp((scene - 0.84) / 0.08));
      const transferTwoVisibility = transferEnter(transferTwo)
        * (1 - clamp((scene - 0.88) / 0.07));
      const transferThreeVisibility = transferEnter(transferThree)
        * (1 - clamp((scene - 0.92) / 0.06));
      const transferOriginFade = clamp((scene - 0.14) / 0.35);
      const direction = window.scrollY >= previousScroll ? 1 : -1;

      track.style.setProperty('--track-p', progress.toFixed(4));
      track.style.setProperty('--p', scene.toFixed(4));
      track.style.setProperty('--bridge-p', bridge.toFixed(4));
      track.style.setProperty('--portrait-p', portrait.toFixed(4));
      track.style.setProperty('--portrait-v', portraitVisibility.toFixed(4));
      track.style.setProperty('--bridge-v', bridgeVisibility.toFixed(4));
      track.style.setProperty('--reveal-p', reveal.toFixed(4));
      track.style.setProperty('--settle-p', settle.toFixed(4));
      track.style.setProperty('--title-merge', displayedTitleMerge.toFixed(4));
      track.style.setProperty('--transfer-1', transferOne.toFixed(4));
      track.style.setProperty('--transfer-2', transferTwo.toFixed(4));
      track.style.setProperty('--transfer-3', transferThree.toFixed(4));
      track.style.setProperty('--transfer-v1', transferOneVisibility.toFixed(4));
      track.style.setProperty('--transfer-v2', transferTwoVisibility.toFixed(4));
      track.style.setProperty('--transfer-v3', transferThreeVisibility.toFixed(4));
      track.style.setProperty('--transfer-origin-fade', transferOriginFade.toFixed(4));
      track.style.setProperty('--scroll-direction', String(direction));

      if (usesMediaTransfer) {
        track.toggleAttribute('data-transfer-complete', scene >= 0.985);
      }

      const portraitFrames = getBridgeFrames();
      const portraitFrame = reducedMotionQuery.matches
        ? portraitFrames.length - 1
        : Math.round(portrait * (portraitFrames.length - 1));

      if (bridgePortraitRef.current && portraitFrame !== previousPortraitFrame) {
        bridgePortraitRef.current.src = portraitFrames[portraitFrame];
        previousPortraitFrame = portraitFrame;
      }

      previousScroll = window.scrollY;

      if (Math.abs(mergeTarget - displayedTitleMerge) >= 0.001) {
        frame = window.requestAnimationFrame(update);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    const preloadTimer = window.setTimeout(preloadBridgeFrames, 450);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    mobileQuery.addEventListener('change', requestUpdate);
    reducedMotionQuery.addEventListener('change', requestUpdate);

    return () => {
      window.clearTimeout(preloadTimer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      mobileQuery.removeEventListener('change', requestUpdate);
      reducedMotionQuery.removeEventListener('change', requestUpdate);
    };
  }, [usesMediaTransfer]);

  return (
    <main
      className={`${styles.page} ${usesEnvironmentFragments ? styles.environmentFragments : ''} ${usesMediaLightType ? styles.mediaLightType : ''} ${usesMediaTransfer ? styles.mediaTransfer : ''}`}
    >
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
                  <img
                    src={usesEnvironmentFragments
                      ? '/media/experiments/environment-fragments-hero/monitor-reflection.jpg'
                      : '/media/hero/green-motion.jpg'}
                    alt=""
                  />
                </div>
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneMiddle}`}>
                  <img
                    src={usesEnvironmentFragments
                      ? '/media/experiments/environment-fragments-hero/screen-light.jpg'
                      : '/media/hero/night-motion.jpg'}
                    alt=""
                  />
                </div>
                <div className={`${styles.mediaPlane} ${styles.mediaPlaneFront}`}>
                  <img
                    src={usesEnvironmentFragments
                      ? '/media/experiments/environment-fragments-hero/keyboard-motion.jpg'
                      : terminalProductionImage}
                    className={usesEnvironmentFragments ? undefined : styles.terminalMedia}
                    alt=""
                  />
                  <span>DESIGN / DEVELOPMENT</span>
                  <strong>01</strong>
                </div>
                <div className={styles.mediaPulse} />
                <div className={styles.scanner} />
              </div>

              {usesMediaLightType && (
                <div className={styles.titleLightField} aria-hidden="true">
                  <span />
                  <span />
                </div>
              )}

              <div className={styles.openingCopy}>
                <p>SOFTWARE DEVELOPMENT / CREATIVE DIRECTION</p>
                <h1>
                  <span data-text="IDEIAS EM">IDEIAS EM</span>
                  <span data-text="MOVIMENTO">MOVIMENTO</span>
                </h1>
              </div>

              <div className={styles.openingInfo}>
                <p>
                  Crio sites e experiências digitais para quem precisa apresentar um
                  negócio, um serviço ou um projeto com clareza e personalidade.
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
              {usesMediaTransfer && (
                <div className={styles.transferLayer}>
                  <div className={`${styles.transferCard} ${styles.transferCardOne}`}>
                    <img src="/media/hero/green-motion.jpg" alt="" />
                    <span>01</span>
                    <strong>DIRECTION</strong>
                  </div>
                  <div className={`${styles.transferCard} ${styles.transferCardTwo}`}>
                    <img src="/media/hero/night-motion.jpg" alt="" />
                    <span>02</span>
                    <strong>INTERFACE</strong>
                  </div>
                  <div className={`${styles.transferCard} ${styles.transferCardThree} ${styles.terminalCard}`}>
                    <img src={terminalProductionImage} className={styles.terminalMedia} alt="" />
                    <span>03</span>
                    <strong>SPRING / VPS</strong>
                  </div>
                </div>
              )}
              <div className={styles.portraitMedia}>
                <img
                  ref={bridgePortraitRef}
                  src="/media/bridge/silhouette-motion/production/mobile/frame-0001.webp"
                  alt=""
                  decoding="async"
                />
              </div>
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
                    <div
                      className={`${styles.mediaTile} ${image === terminalProductionImage ? styles.terminalTile : ''}`}
                      key={`top-${index}`}
                    >
                      <img
                        src={image}
                        className={image === terminalProductionImage ? styles.terminalMedia : undefined}
                        alt=""
                      />
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
                      <div
                        className={`${styles.mediaTile} ${image === terminalProductionImage ? styles.terminalTile : ''}`}
                        key={`bottom-${index}`}
                      >
                        <img
                          src={image}
                          className={image === terminalProductionImage ? styles.terminalMedia : undefined}
                          alt=""
                        />
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
                  <span>LUCAS SANTOS</span>
                  <span>AVAILABLE FOR SELECTED PROJECTS / 2026</span>
                </div>

                <div className={styles.titleMask}>
                  <h2 aria-label="Software Engineer">
                    <KineticTitle mode="portfolio" active />
                  </h2>
                </div>

                <div className={styles.positioning}>
                  <p>
                    Desenvolvo landing pages, sites institucionais, interfaces e
                    soluções sob medida, cuidando da estrutura, do visual e da parte
                    técnica.
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

      <ServicesSection />
    </main>
  );
}
