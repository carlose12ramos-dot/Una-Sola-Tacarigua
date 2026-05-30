import React, { useState } from 'react';
import styles from './HistoriaModule.module.css';
import { historiaMock } from '../data/mockData';
import { IMAGES } from '../data/images';

const COMMUNITY_VIDEOS = [
  {
    src: '/images/videos/Historia Tacarigua.mp4',
    title: 'Historia Tacarigua',
    caption: 'Recorrido audiovisual por los hitos históricos de Tacarigua, documentado por el Equipo de Trabajo (2018–2022).',
  },
];

const LEGAL_DOCUMENTS = [
  {
    src: IMAGES.documentoLegalFundacion.src,
    fullSrc: '/images/documentolegalfundación.png',
    alt: IMAGES.documentoLegalFundacion.alt,
    title: 'Documento Legal de Fundación',
    description: 'Documento original de fundación de Tacarigua, testimonio histórico del establecimiento de la parroquia.',
  },
  {
    src: IMAGES.docLegalFun.src,
    fullSrc: '/images/doclegalfun.png',
    alt: IMAGES.docLegalFun.alt,
    title: 'Documento Legal',
    description: 'Documento complementario sobre la organización y demarcación territorial de Tacarigua.',
  },
];

const HistoriaModule = () => {
  const [activeId, setActiveId] = useState(3);
  const [modalImage, setModalImage] = useState(null);

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const openModal = (src, alt) => {
    setModalImage({ src, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <section className={styles.container} id="historia">
      <header className={styles.header}>
        <span className={styles.badge}>Historia Viva</span>
        <h1 className={styles.title}>Crónicas y paisajes reales de Tacarigua</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>
          Imágenes locales acompañan el recorrido por los hitos, personajes y
          paisajes que conforman la memoria colectiva de nuestra parroquia.
        </p>
      </header>

      <section className={styles.mediaSection} aria-label="Material audiovisual">
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Audiovisual</span>
          <h3 className={styles.mediaTitle}>Memoria en video</h3>
          <p className={styles.mediaLead}>
            Material documental audiovisual sobre la historia de Tacarigua.
          </p>
        </div>

        {COMMUNITY_VIDEOS.map((item) => (
          <div key={item.src} className={styles.mediaCard}>
            <video
              className={styles.mediaVideo}
              controls
              preload="metadata"
              aria-label={item.title}
            >
              <source src={item.src} type="video/mp4" />
              Tu navegador no soporta reproducción de video.
            </video>
            <div className={styles.mediaCaption}>
              <h4>{item.title}</h4>
              <p>{item.caption}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.mediaSection} aria-label="Documentos legales">
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Documentos</span>
          <h3 className={styles.mediaTitle}>Documentos Legales y Fundacionales</h3>
          <p className={styles.mediaLead}>
            Documentos históricos que respaldan la fundación y organización territorial de Tacarigua.
          </p>
        </div>

        <div className={styles.documentsGrid}>
          {LEGAL_DOCUMENTS.map((doc) => (
            <div key={doc.title} className={styles.documentCard}>
              <div className={styles.documentImageWrapper}>
                <img
                  src={doc.src}
                  alt={doc.alt}
                  className={styles.documentImage}
                  loading="lazy"
                  onClick={() => openModal(doc.fullSrc, doc.alt)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(doc.fullSrc, doc.alt)}
                />
              </div>
              <div className={styles.documentContent}>
                <h4 className={styles.documentTitle}>{doc.title}</h4>
                <p className={styles.documentDescription}>{doc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.modalClose} onClick={closeModal} aria-label="Cerrar">×</button>
            <img src={modalImage.src} alt={modalImage.alt} className={styles.modalImage} />
          </div>
        </div>
      )}

      <div className={styles.timelineSection}>
        <span className={styles.badge}>Memoria Colectiva</span>
        <h2 className={styles.timelineTitle}>Historia &amp; Crónicas</h2>
        <div className={styles.timeline}>
          {historiaMock.map((evento, index) => (
            <div
              key={evento.id}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className={styles.nodeWrapper}>
                <div className={styles.node}></div>
              </div>

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
                        alt={`${evento.titulo} — ${evento.anio}`}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    )}
                    <p className={styles.cardDesc}>{evento.descripcion}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoriaModule;