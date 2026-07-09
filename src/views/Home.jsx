import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Map, Users, Building } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBanner from '../components/home/HeroBanner';
import { IMAGES } from '../data/images';
import styles from './Home.module.css';
import Ephemeris from '../components/home/Ephemeris';
import ScrollReveal, { StaggerContainer, StaggerItem, TiltCard } from '../components/ui/ScrollReveal';

const ICON_MAP = { Palette, Map, Users, Building };

function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [homeCards, setHomeCards] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${API_BASE}/home/featured`)
      .then(res => res.json())
      .then(data => {
        if (data?.length) {
          setFeaturedData(data.map(d => ({
            path: d.path,
            title: d.titulo,
            description: d.descripcion,
            image: { src: d.imagen_src, fallback: d.imagen_fallback, alt: d.imagen_alt },
            icon: ICON_MAP[d.icono_nombre] || Building,
          })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/home_cards`)
      .then(res => res.json())
      .then(data => setHomeCards(data))
      .catch(err => console.error('Error cargando home cards:', err));
  }, []);

  const openCard = (card) => {
    setActiveCard(card);
    setActiveImage(card.modalImages?.[0] ?? null);
  };
  const closeCard = () => {
    setActiveCard(null);
    setActiveImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Inicio | Una Sola Tacarigua</title>
        <meta name="description" content="Portal cultural digital de Tacarigua, Isla de Margarita. Conoce nuestra geografía, historia, cultura y sociedad." />
      </Helmet>

      <HeroBanner />

      <section className={styles.section}>
        <div className={styles.inner}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.header}>
              <h1 className={styles.sectionTitle}>Un Solo Pueblo</h1>
              <p className={styles.sectionDesc}>
                Conoce nuestra cultura, geografía, historia y servicios comunitarios en un solo lugar.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer delay={0.2}>
            <div className={styles.grid}>
              {(featuredData.length > 0 ? featuredData : []).map(({ path, title, description, image, icon: Icon }, index) => (
                <StaggerItem key={path} index={index}>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} style={{ height: '100%' }}>
                    <Link to={path} className={styles.card} style={{ display: 'block', height: '100%' }}>
                      <div className={styles.imageWrapper}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className={styles.image}
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = image.fallback; }}
                        />
                        <div className={styles.imageOverlay} />
                        <div className={styles.iconBadge}>
                          <Icon size={22} />
                        </div>
                      </div>
                      <div className={styles.body}>
                        <h3 className={styles.cardTitle}>{title}</h3>
                        <p className={styles.cardDesc}>{description}</p>
                        <span className={styles.cardLink}>Ver más →</span>
                      </div>
                    </Link>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className={styles.highlightSection}>
        <div className={styles.inner}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.header}>
              <h1 className={styles.sectionTitle}>La Historia Que Nos Une</h1>
              <p className={styles.sectionDesc}>
                Explora relatos, personajes y eventos que han moldeado la identidad de Tacarigua a lo largo de los siglos.
              </p>
            </div>
          </ScrollReveal>
          <StaggerContainer delay={0.2}>
            <div className={styles.highlightGrid}>
              {homeCards.map((card, index) => (
                <StaggerItem key={card.id} index={index}>
                  <motion.article
                    className={card.tipo === 'memoria' ? styles.highlightPrimary : styles.highlightWhite}
                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {card.imagen && (
                      <div className={styles.highlightImage}>
                        <img src={card.imagen} alt={card.titulo} />
                      </div>
                    )}
                    <div className={styles.highlightContent}>
                      <h3 className={styles.highlightTitle}>{card.titulo}</h3>
                      <p className={styles.highlightDesc}>{card.descripcion}</p>
                      <motion.button
                        type="button"
                        className={styles.highlightBtn}
                        onClick={() => openCard(card)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver Más
                      </motion.button>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <AnimatePresence>
            {activeCard && (
              <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={closeCard} role="dialog" aria-modal="true" aria-label={activeCard.titulo}
              >
                <motion.div
                  className={styles.modalContent}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button type="button" className={styles.modalClose} onClick={closeCard} aria-label="Cerrar modal">×</button>
                  <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{activeCard.titulo}</h3>
                    <p>{activeCard.descripcion}</p>
                  </div>
                  <div className={styles.modalBody}>
                    {activeCard.modalImages?.length > 0 && (
                      <div className={styles.modalMediaColumn}>
                        <div className={styles.modalImageLarge}>
                          <img
                            src={activeImage?.src ?? activeCard.modalImages[0].src}
                            alt={activeImage?.alt ?? activeCard.modalImages[0].alt}
                          />
                        </div>
                        <span className={styles.modalImageLabel}>
                          {activeImage?.alt ?? activeCard.modalImages[0].alt}
                        </span>
                        {activeCard.modalImages.length > 1 && (
                          <div className={styles.modalGallery}>
                            {activeCard.modalImages.map((image) => (
                              <div
                                key={image.src}
                                className={`${styles.modalGalleryItem} ${activeImage?.src === image.src ? styles.modalGalleryItemActive : ''}`}
                                onClick={() => setActiveImage(image)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveImage(image)}
                              >
                                <img src={image.src} alt={image.alt} />
                                <span>{image.alt}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <div className={styles.modalText}>
                      {activeCard.info?.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                      {activeCard.detalle && <p className={styles.modalDetail}>{activeCard.detalle}</p>}
                      <p>
                        Esta historia forma parte del patrimonio vivo de Tacarigua. Aquí se amplía el contexto
                        y se conserva la memoria de cada hito como parte de la narrativa de Una Sola Tacarigua.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ScrollReveal variant="fade" delay={0.1}>
        <Ephemeris />
      </ScrollReveal>

      <section className={styles.missionSection}>
        <div className={styles.missionGrid}>
          <ScrollReveal variant="right" delay={0.1}>
            <div>
              <span className={styles.missionBadge}>Nuestra Misión</span>
              <h2 className={styles.missionTitle}>Tu Portal Cultural Digital</h2>
              <p className={styles.missionText}>
                Una Sola Tacarigua preserva la Memoria Histórica de la Parroquia Guevara:
                investigación comunitaria iniciada en febrero de 2018 que documentó cinco módulos
                — Historia, Educación, Cultura, Sanidad y Deportes — con fuentes verificadas.
              </p>
              <p className={styles.missionTextSecondary}>
                Desde los indios Tacaribas y el Valle de los Olleros, pasando por héroes de la
                Independencia y la Atenas Neoespartana, hasta los cultores y deportistas de hoy:
                esta plataforma conecta a la comunidad con sus raíces documentadas.
              </p>
              <StaggerContainer delay={0.2}>
                <div className={styles.stats}>
                  <StaggerItem index={0}>
                    <div className={styles.stat}>
                      <div className={styles.statValue}>76</div>
                      <div className={styles.statLabel}>Libros publicados</div>
                    </div>
                  </StaggerItem>
                  <StaggerItem index={1}>
                    <div className={styles.stat}>
                      <div className={styles.statValueAlt}>5</div>
                      <div className={styles.statLabel}>Módulos históricos</div>
                    </div>
                  </StaggerItem>
                  <StaggerItem index={2}>
                    <div className={styles.stat}>
                      <div className={styles.statValue}>28,3%</div>
                      <div className={styles.statLabel}>Profesionales universitarios</div>
                    </div>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="left" delay={0.3}>
            <div className={styles.imageBlock}>
              <div className={styles.imageGlow} />
              <div className={styles.videoGrid}>
                <video src="/images/videos/San Sebastián.mp4" autoPlay muted loop playsInline />
                <video src="/images/videos/Tacarigua.mp4" autoPlay muted loop playsInline />
                <video src="/images/videos/Caminos de 400 Anos.mp4" autoPlay muted loop playsInline />
                <video src="/images/videos/Tacarigua Gentil.mp4" autoPlay muted loop playsInline />
              </div>
              <motion.div
                className={styles.yearsBadge}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className={styles.yearsValue}>300+</span>
                <span className={styles.yearsLabel}>Años</span>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}

export default Home;