import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HistoriaModule.module.css';
import { BookOpen, Droplet, Sparkles, Landmark, Clock3, Scroll, MapPin, ChevronDown, Download } from 'lucide-react';
import HeroHeader from '../components/ui/HeroHeader';
import ScrollReveal, { StaggerItem, StaggerContainer } from '../components/ui/ScrollReveal';

const ICON_MAP = {
  Landmark, Droplet, BookOpen, Clock3, Scroll, MapPin, Sparkles,
};

const HistoriaModule = () => {
  const [activeId, setActiveId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [quickFactsData, setQuickFactsData] = useState([]);
  const [seccionesData, setSeccionesData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [documentosData, setDocumentosData] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${API_BASE}/historia/features`)
      .then(res => res.json())
      .then(data => { if (data?.length) setFeaturesData(data); })
      .catch(() => {});
    fetch(`${API_BASE}/historia/datos-rapidos`)
      .then(res => res.json())
      .then(data => { if (data?.length) setQuickFactsData(data); })
      .catch(() => {});
    fetch(`${API_BASE}/historia/secciones`)
      .then(res => res.json())
      .then(data => { if (data?.length) setSeccionesData(data); })
      .catch(() => {});
    fetch(`${API_BASE}/historia/videos`)
      .then(res => res.json())
      .then(data => { if (data?.length) setVideosData(data); })
      .catch(() => {});
    fetch(`${API_BASE}/historia/documentos`)
      .then(res => res.json())
      .then(data => {
        if (data?.length) {
          setDocumentosData(data.map(d => ({
            src: d.src,
            fullSrc: d.full_src,
            alt: d.alt,
            title: d.titulo,
            description: d.descripcion,
          })));
        }
      })
      .catch(() => {});
    fetch(`${API_BASE}/historia`)
      .then(res => res.json())
      .then(data => {
        // Filter out inactive and sort by orden
        const sorted = data
          .filter(item => item.activo !== false)
          .sort((a, b) => a.orden - b.orden);
        setTimelineEvents(sorted);
        if (sorted.length > 0) setActiveId(sorted[0].id);
      })
      .catch(err => console.error('Error fetching historia:', err));
  }, []);

  const handleToggle = (id) => setActiveId(activeId === id ? null : id);

  return (
    <motion.section
      className={styles.container}
      id="historia"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Historia | Una Sola Tacarigua</title>
        <meta name="description" content="Descubre la historia de Tacarigua, sus orígenes indígenas, su papel en la independencia y su desarrollo administrativo." />
      </Helmet>

      <HeroHeader
        title="Historia y Orígenes"
        description="Un viaje a través del tiempo, desde los primeros asentamientos de la tribu Tacariba hasta su consolidación como la Tacarigua de Margarita."
        theme="heritage"
        shape="diagonal"
        images={[
          '/Portada documentos/Portada Tacarigua Historica.png',
          '/Portada documentos/Portada Tacarigua Historia 2.png',
          '/images/documentolegalfundación.png',
          '/images/dbu.jpg',
          '/images/historiat.jpg',
          '/images/images.jfif',
          '/images/iscj.jpg'
        ]}
      />

      <div className={styles.innerContent}>

        {/* Feature cards */}
        <section className={styles.featureSection} aria-label="Aspectos históricos">
          <StaggerContainer delay={0.1}>
            <div className={styles.featureGrid}>
              {(featuresData.length > 0 ? featuresData : []).map((feature, i) => {
                const Icon = ICON_MAP[feature.icono_nombre] || Landmark;
                return (
                  <StaggerItem key={feature.titulo || feature.title} index={i}>
                    <motion.article
                      className={styles.featureCard}
                      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <div className={styles.featureIcon}><Icon size={20} /></div>
                      <h3 className={styles.featureTitle}>{feature.titulo || feature.title}</h3>
                      <p className={styles.featureText}>{feature.descripcion || feature.description}</p>
                    </motion.article>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </section>

        {/* Videos */}
        <section className={styles.mediaSection} aria-label="Material audiovisual">
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Memoria en video</h3>
              <p className={styles.mediaLead}>Material documental audiovisual sobre la historia de Tacarigua.</p>
            </div>
          </ScrollReveal>
          {(videosData.length > 0 ? videosData : []).map((item) => (
            <ScrollReveal key={item.src} variant="scale" delay={0.2}>
              <div className={styles.mediaCard}>
                <video className={styles.mediaVideo} controls preload="metadata" aria-label={item.title}>
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className={styles.mediaCaption}>
                  <h4>{item.title}</h4>
                  <p>{item.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        {/* Documentos legales */}
        <section className={styles.mediaSection} aria-label="Documentos legales">
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Documentos Legales y Fundacionales</h3>
              <p className={styles.mediaLead}>Documentos históricos que respaldan la fundación y organización territorial de Tacarigua.</p>
            </div>
          </ScrollReveal>
          <div className={styles.documentsGrid}>
            {(documentosData.length > 0 ? documentosData : []).map((doc, i) => (
              <ScrollReveal key={doc.titulo || doc.title} variant={i % 2 === 0 ? 'left' : 'right'} delay={0.15 * i}>
                <motion.div
                  className={styles.documentCard}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className={styles.documentImageWrapper}>
                    <img
                      src={doc.src} alt={doc.alt}
                      className={styles.documentImage}
                      loading="lazy"
                      onClick={() => setModalImage(doc)}
                      role="button" tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setModalImage(doc)}
                    />
                  </div>
                  <div className={styles.documentContent}>
                    <h4 className={styles.documentTitle}>{doc.title}</h4>
                    <p className={styles.documentDescription}>{doc.description}</p>
                    <motion.button
                      type="button"
                      className={styles.documentButton}
                      onClick={() => setModalImage(doc)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Ver documento
                    </motion.button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Datos curiosidades */}
        <section className={styles.factSection} aria-label="Datos históricos">
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Datos y curiosidades de Tacarigua</h3>
              <p className={styles.mediaLead}>Voces históricas y datos poco conocidos que ayudan a comprender mejor el pasado tacarigüero.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer delay={0.1}>
            <div className={styles.factGrid}>
              {(quickFactsData.length > 0 ? quickFactsData : []).map((fact, i) => {
                const Icon = ICON_MAP[fact.icono_nombre] || Scroll;
                return (
                  <StaggerItem key={fact.label} index={i}>
                    <motion.div
                      className={styles.factCard}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: 'spring', stiffness: 250 }}
                    >
                      <div className={styles.factIcon}><Icon size={18} /></div>
                      <div>
                      <h4 className={styles.factLabel}>{fact.label}</h4>
                      <p className={styles.factText}>{fact.texto || fact.text}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </section>

        {/* PDF */}
        <section className={styles.mediaSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Tacarigua Histórica</h3>
              <p className={styles.mediaLead}>El valle de Tacarigua fue conocido como El Valle de los Olleros o Valle de Arimacoa por su cerámica indígena.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer delay={0.05}>
            <div className={styles.documentsGrid}>
              {(seccionesData.length > 0 ? seccionesData : []).map((section, i) => (
                <StaggerItem key={section.title} index={i}>
                  <motion.div
                    className={styles.documentCard}
                    whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.08)' }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className={styles.documentContent}>
                      <h4 className={styles.documentTitle}>{section.titulo || section.title}</h4>
                      <p className={styles.documentDescription}>{section.contenido || section.content}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <ScrollReveal variant="up" delay={0.3}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(212,160,69,0.2)',
                borderRadius: '1.25rem',
                padding: '2rem',
                marginTop: '2rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(212,160,69,0.08)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.35rem 1.1rem',
                  background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--oxford-navy)',
                  marginBottom: '0.75rem',
                }}>
                  <Scroll size={14} style={{ marginRight: '0.35rem', display: 'inline', verticalAlign: 'middle' }} />
                  DOCUMENTO HISTÓRICO
                </span>
                <h3 style={{ color: 'var(--goldenrod)', fontWeight: 700, margin: 0, fontSize: '1.15rem' }}>
                  Módulos de Historia para Descargar
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
                  Accede a los documentos completos sobre la historia de Tacarigua
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.a
                  className={styles.ctaButton}
                  href="/Proy.Tacarigua-Historica-Modulo-I.pdf"
                  download target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={16} style={{ marginRight: '0.35rem' }} />
                  Proy. Tacarigua Histórica Módulo I
                </motion.a>
                <motion.a
                  className={styles.ctaButton}
                  href="/EDICION-MODULO-I-HISTORIA-2022-2DA-REVISION.pdf"
                  download target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={16} style={{ marginRight: '0.35rem' }} />
                  Edición Módulo I - 2da Revisión
                </motion.a>
              </div>
            </motion.div>
          </ScrollReveal>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {modalImage && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalImage(null)}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button type="button" className={styles.modalClose} onClick={() => setModalImage(null)} aria-label="Cerrar">×</button>
                <div className={styles.modalHeader}>
                  <h3>{modalImage.title}</h3>
                  <p>{modalImage.description}</p>
                </div>
                <img src={modalImage.fullSrc || modalImage.src} alt={modalImage.alt} className={styles.modalImage} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline */}
        <div className={styles.timelineSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <h2 className={styles.timelineTitle}>Historia &amp; Crónicas</h2>
          </ScrollReveal>
          <div className={styles.timeline}>
            {timelineEvents.map((evento, index) => (
              <ScrollReveal
                key={evento.id}
                variant={index % 2 === 0 ? 'left' : 'right'}
                delay={0.1 + index * 0.1}
              >
                <div className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}>
                  <div className={styles.nodeWrapper}>
                    <div className={styles.node} />
                  </div>
                  <motion.div
                    className={`${styles.card} ${activeId === evento.id ? styles.cardActive : ''}`}
                    onClick={() => handleToggle(evento.id)}
                    role="button"
                    aria-expanded={activeId === evento.id}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleToggle(evento.id)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 250 }}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardMeta}>
                        <span className={styles.yearBadge}>{evento.anio}</span>
                        <span className={styles.tagBadge}>{evento.tag}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{evento.titulo}</h3>
                      <motion.span
                        className={styles.expandIcon}
                        animate={{ rotate: activeId === evento.id ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </div>
                    <AnimatePresence>
                      {activeId === evento.id && (
                        <motion.div
                          className={styles.cardBody}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className={styles.cardDesc}>{evento.descripcion}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HistoriaModule;