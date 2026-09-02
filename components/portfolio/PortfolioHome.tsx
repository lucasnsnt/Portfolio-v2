'use client';

import { useRef } from 'react';
import styles from './portfolio-home.module.css';
import KineticTitle from '../experiments/kinetic-title/KineticTitle';
import ServicesSection from './ServicesSection';
import SelectedWorkSection from './SelectedWorkSection';
import PortfolioNavigation from './PortfolioNavigation';
import ServiceHandoff from './ServiceHandoff';
import { useActiveSection, useOpeningMotion } from './usePortfolioMotion';

const terminalProductionImage =
  '/media/projects/unemployment-killer/vps-spring-production.png';

const mediaTiles = [
  '/media/hero/green-motion.jpg',
  '/media/hero/night-motion.jpg',
  terminalProductionImage,
  '/media/hero/galaxy-grain.jpg',
  '/media/hero/green-motion.jpg',
  '/media/hero/night-motion.jpg',
];

type PortfolioHomeProps = {
  openingVariant?:
    | 'default'
    | 'environment-fragments'
    | 'media-light-type';
};

export default function PortfolioHome({ openingVariant = 'default' }: PortfolioHomeProps) {
  const trackRef = useRef<HTMLElement>(null);
  const handoffRef = useRef<HTMLElement>(null);
  const bridgePortraitRef = useRef<HTMLImageElement>(null);
  const usesEnvironmentFragments = openingVariant === 'environment-fragments';
  const usesMediaLightType = openingVariant === 'media-light-type';
  const usesMediaTransfer = openingVariant === 'default';

  useOpeningMotion({ trackRef, handoffRef, bridgePortraitRef }, usesMediaTransfer);

  const activeSection = useActiveSection();

  return (
    <main
      className={`${styles.page} ${usesEnvironmentFragments ? styles.environmentFragments : ''} ${usesMediaLightType ? styles.mediaLightType : ''} ${usesMediaTransfer ? styles.mediaTransfer : ''}`}
    >
      <PortfolioNavigation activeSection={activeSection} />

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
                      : '/media/hero/monochrome-motion.jpg'}
                    alt=""
                  />
                </div>
              </div>

              {usesMediaLightType && (
                <div className={styles.titleLightField} aria-hidden="true">
                  <span />
                  <span />
                </div>
              )}

              <div className={styles.openingCopy}>
                <p>SOFTWARE DEVELOPMENT / CREATIVE DIRECTION</p>
              </div>

              <div className={styles.openingInfo}>
                <p>
                  Crio sites e experiências digitais para quem precisa apresentar um
                  negócio, um serviço ou um projeto com clareza e personalidade.
                </p>
                <span>EXPLORE O TRABALHO ↘</span>
              </div>

            </article>

            <div className={styles.gap} aria-hidden="true">
              {usesMediaTransfer && (
                <div className={styles.transferLayer}>
                  <div className={`${styles.transferCard} ${styles.transferCardOne}`}>
                    <img src="/media/hero/green-motion.jpg" alt="" />
                  </div>
                  <div className={`${styles.transferCard} ${styles.transferCardTwo}`}>
                    <img src="/media/hero/night-motion.jpg" alt="" />
                  </div>
                  <div className={`${styles.transferCard} ${styles.transferCardThree} ${styles.terminalCard}`}>
                    <img src={terminalProductionImage} className={styles.terminalMedia} alt="" />
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
                  {[...mediaTiles, ...mediaTiles].map((image, index) => (
                    <div
                      className={`${styles.mediaTile} ${image === terminalProductionImage ? styles.terminalTile : ''}`}
                      key={`top-${index}`}
                      >
                        <img
                          src={image}
                          className={image === terminalProductionImage ? styles.terminalMedia : undefined}
                          alt=""
                        />
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${styles.carousel} ${styles.carouselBottom}`} aria-hidden="true">
                <div className={styles.carouselRailReverse}>
                  {[...mediaTiles.slice().reverse(), ...mediaTiles.slice().reverse()].map(
                    (image, index) => (
                      <div
                        className={`${styles.mediaTile} ${image === terminalProductionImage ? styles.terminalTile : ''}`}
                        key={`bottom-${index}`}
                      >
                        <img
                          src={image}
                          className={image === terminalProductionImage ? styles.terminalMedia : undefined}
                          alt=""
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className={styles.archiveShade} aria-hidden="true" />

              <div className={styles.archiveContent}>
                <div className={styles.archiveMeta}>
                  <span>LUCAS SANTOS</span>
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

              </div>
            </article>
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

      <ServiceHandoff ref={handoffRef} />

      <ServicesSection />
      <SelectedWorkSection />
    </main>
  );
}
