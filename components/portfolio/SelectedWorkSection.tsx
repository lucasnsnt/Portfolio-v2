'use client';

import { useEffect, useRef } from 'react';
import styles from './selected-work-section.module.css';

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const projects = [
  {
    slug: 'unemployment-killer',
    name: 'Unemployment Killer',
    role: 'Projeto técnico / Em evolução',
    image: '/media/projects/unemployment-killer/vps-spring-production.png',
  },
  {
    slug: 'celltech',
    name: 'CellTech Aracaju',
    role: 'Landing page / Desenvolvimento',
    image: '/media/projects/celltech/phone-repair-final.webp',
  },
  {
    slug: 'portfolio-v2',
    name: 'Portfolio v2',
    role: 'Projeto autoral / Em desenvolvimento',
    image: '/media/hero/night-motion.jpg',
  },
];

const visualStudies = [
  { name: 'Movimento de interface', image: '/media/hero/green-motion.jpg' },
  { name: 'Ambiente de trabalho', image: '/media/experiments/environment-fragments-hero/keyboard-motion.jpg' },
  { name: 'Fragmento de sistema', image: '/media/portfolio/fragments/code-fragment-v1.jpg' },
];

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const projectNodes = Array.from(section.querySelectorAll<HTMLElement>('[data-selected-project]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = Math.max(window.innerHeight, 1);

      projectNodes.forEach((project) => {
        const bounds = project.getBoundingClientRect();
        const travel = Math.max(bounds.height - viewport, 1);
        const progress = reducedMotion.matches ? 1 : clamp(-bounds.top / travel);
        const reveal = clamp(progress / 0.52);
        project.style.setProperty('--project-p', reveal.toFixed(4));
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
    };
  }, []);

  return (
    <section className={styles.section} id="trabalhos" aria-label="Selected Work" ref={sectionRef}>
      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <article
            className={`${styles.project} ${styles[project.slug]}`}
            data-selected-project
            key={project.name}
          >
            <div className={styles.projectStage}>
              <div className={styles.projectMedia}>
                <img src={project.image} alt="" />
              </div>
              <div className={styles.projectInfo}>
                <span>PR. {String(index + 1).padStart(2, '0')}</span>
                <h3>{project.name}</h3>
                <p>{project.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className={styles.visualStudies} aria-labelledby="visual-studies-title">
        <div className={styles.studiesHeading}>
          <p>Visual studies</p>
          <h2 id="visual-studies-title">Pesquisa visual</h2>
        </div>

        <div className={styles.studiesGrid}>
          {visualStudies.map((study, index) => (
            <article className={styles.study} key={study.name}>
              <div className={styles.studyMedia}>
                <img src={study.image} alt="" />
              </div>
              <p>{study.name} / 2026 / {String(index + 1).padStart(2, '0')}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
