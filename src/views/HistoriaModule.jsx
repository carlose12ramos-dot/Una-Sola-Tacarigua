import React, { useState } from 'react';
import styles from './HistoriaModule.module.css';
import { BookOpen, Droplet, Sparkles, Landmark, Clock3, Scroll, MapPin } from 'lucide-react';
import { IMAGES } from '../data/images';

const HISTORIA_PDF_PATH = '/images/TacariguaHistoria%20-%20Wikipedia%2C%20la%20enciclopedia%20libre.pdf';

const COMMUNITY_VIDEOS = [
  {
    src: '/images/videos/Historia Tacarigua.mp4',
    title: 'Historia Tacarigua',
    caption: 'Recorrido audiovisual por los hitos históricos de Tacarigua, documentado por el Equipo de Trabajo (2018–2022).',
  },
];

const LEGAL_DOCUMENTS = [
  {
    src: IMAGES.docLegalFun.src,
    fullSrc: '/images/doclegalfun.png',
    alt: IMAGES.docLegalFun.alt,
    title: 'Documento Legal de Tacarigua',
    description: 'Documento histórico que registra la organización y demarcación territorial del valle de Tacarigua, clave para entender su identidad comunitaria.',
  },
  {
    src: IMAGES.documentoLegalFundacion.src,
    fullSrc: '/images/documentolegalfundación.png',
    alt: IMAGES.documentoLegalFundacion.alt,
    title: 'Acta de Fundación',
    description: 'Documento original de fundación de Tacarigua, testimonio histórico del establecimiento de la parroquia.',
  },
];

const HISTORY_FEATURES = [
  {
    icon: Landmark,
    title: 'Valle ancestral',
    description: 'Tacarigua es un semivalle fértil entre cerros como El Tamoco y El Portachuelo. El agua y la alfarería le dieron identidad desde tiempos indígenas.',
  },
  {
    icon: Droplet,
    title: 'Agua estratégica',
    description: 'En 1971 la UCV describió la zona como la hidrósfera más importante del oriente de Venezuela por sus manantiales, quebradas y lagunas.',
  },
  {
    icon: BookOpen,
    title: 'Nombre con historia',
    description: 'El topónimo Tacarigua tiene origen guaiquerí y se propagó desde Miranda hasta Nueva Esparta junto a las rutas indígenas.',
  },
  {
    icon: Clock3,
    title: 'Parroquia Guevara',
    description: 'Desde 1916 Tacarigua forma parte de la parroquia Guevara del municipio Gómez, conservando su memoria republicana.',
  },
];

const QUICK_FACTS = [
  {
    icon: Scroll,
    label: '1579',
    text: 'La fecha más probable del contacto entre los indios Tacaribas y los españoles es el 29 de septiembre de 1579, día de San Miguel Arcángel.',
  },
  {
    icon: MapPin,
    label: '15+ Tacariguas',
    text: 'El nombre Tacarigua existe en más de 15 poblaciones de Venezuela y en una localidad de Trinidad y Tobago.',
  },
  {
    icon: Sparkles,
    label: 'Cerámica',
    text: 'La alfarería indígena del valle de Tacarigua produjo ánforas, tinajones y platos que se intercambiaban con comunidades vecinas.',
  },
];

const timelineEvents = [
  {
    id: 1,
    anio: 'Antes de 500 d.C.',
    titulo: 'Primeros pobladores indígenas',
    descripcion: 'La presencia humana en el territorio de lo que hoy es Tacarigua se remonta a unos 1.500 años antes del presente. Cinco oleadas de ocupación indígena modelaron la cultura local, con ocupaciones denominadas Punta Gorda, El Agua y Playa Guacuco.',
    tag: 'Período prehispánico',
  },
  {
    id: 2,
    anio: '1579',
    titulo: 'Contacto con Miguel Maza de Lizana',
    descripcion: 'El primer contacto documentado entre los indios Tacaribas y los españoles se produjo durante el mandato de Miguel Maza de Lizana. La fecha más probable propuesta es el 29 de septiembre de 1579.',
    tag: 'Conquista española',
  },
  {
    id: 3,
    anio: '1813–1818',
    titulo: 'Independencia y el Portachuelo',
    descripcion: 'El Portachuelo de Tacarigua fue un punto estratégico clave en la guerra de independencia. Entre 1815 y 1818, el pueblo sirvió de hospital y pastizal para la caballería patriota.',
    tag: 'Independencia',
  },
  {
    id: 4,
    anio: '1832–1916',
    titulo: 'Evolución administrativa',
    descripcion: 'Tacarigua experimentó cambios administrativos sucesivos hasta que en 1916 fue constituida como parroquia Guevara del municipio Gómez, denominación que mantiene en la actualidad.',
    tag: 'República',
  },
];

const HISTORIA_SECTIONS = [
  {
    title: 'Origen del nombre Tacarigua',
    content: 'El nombre Tacarigua proviene del pueblo indígena Guaiquerí y está vinculado al árbol balsa. La primera referencia documental aparece en la Información de Testigos de 1580, cuando Miguel Maza de Lizana habló del valle y sus pueblos.',
  },
  {
    title: 'Cinco oleadas indígenas',
    content: 'Los estudios reconocen cinco ocupaciones indígenas: desde Punta Gorda y El Agua hasta Playa Guacuco. En el valle se desarrolló la cerámica, el cultivo del maíz y la crianza de algodón.',
  },
  {
    title: 'Valle, agua y alfarería',
    content: 'El valle de Tacarigua fue conocido como El Valle de los Olleros o Valle de Arimacoa por su cerámica. Sus habitantes cultivaban maíz, yuca y algodón, vivían en chozas cónicas de palma y aprovechaban las quebradas y lagunas para sostener su economía.',
  },
  {
    title: 'Independencia y República',
    content: 'Durante la guerra de independencia Tacarigua sirvió como hospital de campaña y base patriota. En 1881 fue Distrito Tacarigua y en 1916 se integró como parroquia Guevara del municipio Gómez.',
  },
];

const HistoriaModule = () => {
  const [activeId, setActiveId] = useState(3);
  const [modalImage, setModalImage] = useState(null);

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const openModal = (documentData) => {
    setModalImage(documentData);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <section className={styles.container} id="historia">
      <header className={styles.header}>
        <span className={styles.badge}>Historia Viva</span>
        <h1 className={styles.title}>Historia de Tacarigua</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>
          La historia de Tacarigua se revela en sus documentos, sus relatos y en
          el paisaje que ha sostenido a la comunidad durante siglos.
        </p>
      </header>

      <section className={styles.featureSection} aria-label="Aspectos históricos">
        <div className={styles.featureGrid}>
          {HISTORY_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Icon size={20} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

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
                  onClick={() => openModal(doc)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(doc)}
                />
              </div>
              <div className={styles.documentContent}>
                <h4 className={styles.documentTitle}>{doc.title}</h4>
                <p className={styles.documentDescription}>{doc.description}</p>
                <button
                  type="button"
                  className={styles.documentButton}
                  onClick={() => openModal(doc)}
                >
                  Ver documento
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.factSection} aria-label="Datos históricos">
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Sabías qué</span>
          <h3 className={styles.mediaTitle}>Datos y curiosidades de Tacarigua</h3>
          <p className={styles.mediaLead}>
            Voces históricas y datos poco conocidos que ayudan a comprender mejor el pasado tacarigüero.
          </p>
        </div>
        <div className={styles.factGrid}>
          {QUICK_FACTS.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className={styles.factCard}>
                <div className={styles.factIcon}>
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className={styles.factLabel}>{fact.label}</h4>
                  <p className={styles.factText}>{fact.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.mediaSection} aria-label="TacariguaHistoria">
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Historia oficial</span>
          <h3 className={styles.mediaTitle}>TacariguaHistoria</h3>
          <p className={styles.mediaLead}>
            El valle de Tacarigua fue conocido como El Valle de los Olleros o Valle de Arimacoa por la cerámica indígena. Sus habitantes cultivaban maíz, yuca y algodón, vivían en chozas cónicas de palma y aprovechaban las quebradas y lagunas para sostener su economía.
          </p>
        </div>

        <div className={styles.documentsGrid}>
          {HISTORIA_SECTIONS.map((section) => (
            <div key={section.title} className={styles.documentCard}>
              <div className={styles.documentContent}>
                <h4 className={styles.documentTitle}>{section.title}</h4>
                <p className={styles.documentDescription}>{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.heroActions}>
          <a
            className={styles.ctaButton}
            href={HISTORIA_PDF_PATH}
            download
            target="_blank"
            rel="noreferrer"
          >
            Descargar PDF TacariguaHistoria
          </a>
        </div>
      </section>

      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.modalClose} onClick={closeModal} aria-label="Cerrar">×</button>
            <div className={styles.modalHeader}>
              <h3>{modalImage.title}</h3>
              <p>{modalImage.description}</p>
            </div>
            <img src={modalImage.fullSrc || modalImage.src} alt={modalImage.alt} className={styles.modalImage} />
          </div>
        </div>
      )}

      <div className={styles.timelineSection}>
        <h2 className={styles.timelineTitle}>Historia &amp; Crónicas</h2>
        <div className={styles.timeline}>
          {timelineEvents.map((evento, index) => (
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