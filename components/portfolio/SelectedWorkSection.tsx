'use client';

import { useRef, type PointerEvent } from 'react';
import styles from './selected-work-section.module.css';

const project = {
  name: 'Unemployment Killer',
  status: 'Em evolução',
  description: 'Projeto técnico em evolução.',
  image: '/media/projects/unemployment-killer/vps-spring-production.png',
  video: '/media/projects/unemployment-killer/project-preview.mp4',
};

export default function SelectedWorkSection() {
  const projectRef = useRef<HTMLElement>(null);

  const moveVideo = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = (event.clientX - bounds.left) / bounds.width;
    const shift = (progress - 0.5) * 18;
    projectRef.current?.style.setProperty('--video-shift', `${shift.toFixed(2)}%`);
  };

  return (
    <section className={styles.section} id="trabalhos" aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>

      <article
        className={styles.project}
        ref={projectRef}
        tabIndex={0}
        onPointerMove={moveVideo}
        aria-label={`${project.name}, ${project.status}`}
      >
        <video
          className={styles.video}
          src={project.video}
          poster={project.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <div className={styles.summary}>
          <div className={styles.titleBlock}>
            <p>Pr. name</p>
            <h3>{project.name}</h3>
            <p className={styles.status}>{project.status}</p>
          </div>

          <div className={styles.infoBlock}>
            <p>Info</p>
            <p className={styles.description}>{project.description}</p>
          </div>

          <div className={styles.sideSpace} aria-hidden="true" />
        </div>
      </article>
    </section>
  );
}
