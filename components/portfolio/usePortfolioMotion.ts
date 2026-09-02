'use client';

import { RefObject, useEffect, useState } from 'react';

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const makeBridgeFrames = (step: number, variant: 'desktop' | 'mobile') =>
  Array.from({ length: Math.floor(150 / step) + 1 }, (_, index) => {
    const frameNumber = String(1 + index * step).padStart(4, '0');
    return `/media/bridge/silhouette-motion/production/${variant}/frame-${frameNumber}.webp`;
  });

const desktopBridgeFrames = makeBridgeFrames(3, 'desktop');
const mobileBridgeFrames = makeBridgeFrames(6, 'mobile');

type MotionRefs = {
  trackRef: RefObject<HTMLElement | null>;
  handoffRef: RefObject<HTMLElement | null>;
  bridgePortraitRef: RefObject<HTMLImageElement | null>;
};

export function useOpeningMotion(
  { trackRef, handoffRef, bridgePortraitRef }: MotionRefs,
  usesMediaTransfer: boolean,
) {
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
      const smooth = (value: number) => value * value * (3 - 2 * value);
      const transferOne = smooth(clamp((scene - 0.08) / 0.74));
      const transferTwo = smooth(clamp((scene - 0.14) / 0.72));
      const transferThree = smooth(clamp((scene - 0.2) / 0.7));
      const transferEnter = (value: number) => clamp(value / 0.08);
      const transferOneVisibility = transferEnter(transferOne)
        * (1 - clamp((scene - 0.84) / 0.08));
      const transferTwoVisibility = transferEnter(transferTwo)
        * (1 - clamp((scene - 0.88) / 0.07));
      const transferThreeVisibility = transferEnter(transferThree)
        * (1 - clamp((scene - 0.92) / 0.06));
      const transferOriginFade = clamp((scene - 0.14) / 0.35);
      const direction = window.scrollY >= previousScroll ? 1 : -1;

      const variables: Record<string, number> = {
        '--track-p': progress,
        '--p': scene,
        '--bridge-p': bridge,
        '--portrait-p': portrait,
        '--portrait-v': portraitVisibility,
        '--bridge-v': bridgeVisibility,
        '--reveal-p': reveal,
        '--settle-p': settle,
        '--title-merge': displayedTitleMerge,
        '--transfer-1': transferOne,
        '--transfer-2': transferTwo,
        '--transfer-3': transferThree,
        '--transfer-v1': transferOneVisibility,
        '--transfer-v2': transferTwoVisibility,
        '--transfer-v3': transferThreeVisibility,
        '--transfer-origin-fade': transferOriginFade,
      };
      Object.entries(variables).forEach(([name, value]) => {
        track.style.setProperty(name, value.toFixed(4));
      });
      track.style.setProperty('--scroll-direction', String(direction));

      const handoff = handoffRef.current;
      if (handoff) {
        const handoffBounds = handoff.getBoundingClientRect();
        const handoffTravel = Math.max(handoffBounds.height - window.innerHeight, 1);
        const handoffProgress = clamp(-handoffBounds.top / handoffTravel);
        handoff.style.setProperty('--handoff-p', handoffProgress.toFixed(4));
        handoff.style.setProperty('--handoff-reveal', clamp((handoffProgress - 0.1) / 0.44).toFixed(4));
        handoff.style.setProperty('--handoff-exit', clamp((handoffProgress - 0.72) / 0.28).toFixed(4));
      }

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
  }, [bridgePortraitRef, handoffRef, trackRef, usesMediaTransfer]);
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sections = ['inicio', 'trabalhos', 'servicos', 'contato']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      let currentSection = sections[0]?.id ?? 'inicio';
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 112) currentSection = section.id;
      });
      setActiveSection(currentSection);
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

  return activeSection;
}
