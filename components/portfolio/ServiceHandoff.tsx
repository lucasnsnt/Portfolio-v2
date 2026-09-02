'use client';

import { forwardRef } from 'react';
import styles from './service-handoff.module.css';

const ServiceHandoff = forwardRef<HTMLElement>(function ServiceHandoff(_, ref) {
  return (
    <section
      className={styles.serviceHandoff}
      id="transicao-servicos"
      aria-label="Transição para serviços"
      ref={ref}
    >
      <div className={styles.handoffPin}>
        <div className={styles.handoffCopy}>
          <h2>
            <span>Da presenca</span>
            <span>ao que pode</span>
            <span>ser construido</span>
          </h2>
        </div>
      </div>
    </section>
  );
});

export default ServiceHandoff;
