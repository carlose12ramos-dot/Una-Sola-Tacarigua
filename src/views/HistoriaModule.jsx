import React, { useState } from 'react';
import styles from './HistoriaModule.module.css';
import { historiaMock } from '../data/mockData';

const HistoriaModule = () => {
  const [activeId, setActiveId] = useState(3); // "Fundación de la Parroquia" abierto por defecto

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className={styles.container} id="historia">
      <div className={styles.header}>
        <span className={styles.badge}>Memoria Colectiva</span>
        <h1 className={styles.title}>Historia &amp; Crónicas</h1>
        <div className={styles.divider}></div>
        <p className={styles.lead}>
          Recorre los hitos que forjaron la identidad de la Parroquia Guevara,
          desde los primeros pobladores hasta la era digital.
        </p>
      </div>

      <div className={styles.timeline}>
        {historiaMock.map((evento, index) => (
          <div
            key={evento.id}
            className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
          >
            {/* Nodo central con año */}
            <div className={styles.nodeWrapper}>
              <div className={styles.node}></div>
            </div>

            {/* Tarjeta de contenido */}
            <div
              className={`${styles.card} ${activeId === evento.id ? styles.cardActive : ''}`}
              onClick={() => handleToggle(evento.id)}
              role="button"
              aria-expanded={activeId === evento.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleToggle(evento.id)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardMeta}>
                  <span className={styles.yearBadge}>{evento.anio}</span>
                  <span className={styles.tagBadge}>{evento.tag}</span>
                </div>
                <h3 className={styles.cardTitle}>{evento.titulo}</h3>
                <span className={styles.expandIcon}>
                  {activeId === evento.id ? '▲' : '▼'}
                </span>
              </div>

              {activeId === evento.id && (
                <div className={styles.cardBody}>
                  {evento.imagen && (
                    <img
                      src={evento.imagen}
                      alt={evento.titulo}
                      className={styles.cardImage}
                    />
                  )}
                  <p className={styles.cardDesc}>{evento.descripcion}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoriaModule;
