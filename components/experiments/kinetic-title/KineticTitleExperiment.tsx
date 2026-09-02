'use client';

import { useEffect, useRef } from 'react';
import KineticTitle from './KineticTitle';
import styles from './kinetic-title-experiment.module.css';

export default function KineticTitleExperiment() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const update = () => {
      const travel = Math.max(page.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / travel, 0), 1);
      const reveal = Math.min(Math.max((progress - 0.05) / 0.28, 0), 1);
      const merge = Math.min(Math.max((progress - 0.64) / 0.36, 0), 1);
      page.style.setProperty('--title-reveal', String(reveal * reveal * (3 - 2 * reveal)));
      page.style.setProperty('--title-merge', String(merge * merge * (3 - 2 * merge)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <main ref={pageRef} className={styles.page}>
      <section className={styles.stage} aria-labelledby="kinetic-title-heading">
        <h1 id="kinetic-title-heading" className={styles.heading}>
          <KineticTitle />
        </h1>
      </section>
    </main>
  );
}
