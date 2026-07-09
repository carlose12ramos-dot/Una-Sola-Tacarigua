import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import styles from './GeografiaModule.module.css';
import { Download, MapPin } from 'lucide-react';
import Map from '../components/Map/Map';
import SatelliteMap from '../components/Map/SatelliteMap';
import HeroHeader from '../components/ui/HeroHeader';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal';
import { sections, censusData, highlights } from './geografiaData';

function GeografiaModule() {
  return (
    <motion.div
      className={styles.geografiaContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Geografía | Una Sola Tacarigua</title>
        <meta name="description" content="Explora el valle de Tacarigua, sus mapas, relieve, hidrografía y ubicación satelital." />
      </Helmet>

      <HeroHeader
        title="Espacio Geográfico"
        description="El entorno natural que define la identidad de nuestro pueblo. Explora el valle de Tacarigua, sus mapas, relieve, e hidrografía."
        theme="nature"
        shape="dots"
        images={[
          '/images/geopor.jpg',
          '/images/geonasa.jpg',
          '/images/mapainicio.jpg',
          '/images/Tacariguageoo.png',
          '/images/Tacariguageo.png'
        ]}
      />

      <div className={styles.innerContent}>
        {/* ── Maps section (two maps side by side) ───── */}
        <section className={styles.mapsSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mapsHeader}>
              <h2 className={styles.mapsTitle}>Ubicación y mapas</h2>
              <p className={styles.mapsSubtitle}>
                Visualiza Tacarigua en el mapa interactivo de hitos o consulta su ubicación directamente en el mapa.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.mapsDuo}>
            {/* Mapa interactivo Leaflet */}
            <ScrollReveal variant="left" delay={0.2} className={styles.mapCard}>
              <div className={styles.mapCardHeader}>
                <span className={styles.mapCardBadge}>🗺️ Mapa Interactivo</span>
                <p className={styles.mapCardDesc}>
                  Hitos culturales, religiosos, gastronómicos, históricos, naturales y sociales del valle. Usa el botón <strong>Mi ubicación</strong> para verte en el mapa.
                </p>
              </div>
              <div className={styles.mapBox}>
                <Map />
              </div>
            </ScrollReveal>

            {/* Mapa satelital (ESRI + Etiquetas OSM) */}
            <ScrollReveal variant="right" delay={0.3} className={styles.mapCard}>
              <div className={styles.mapCardHeader}>
                <span className={styles.mapCardBadge}>🛰️ Vista Satelital Detallada</span>
                <p className={styles.mapCardDesc}>
                  Imagen satelital de Tacarigua con calles y sectores.
                </p>
              </div>
              <div className={styles.mapBox}>
                <SatelliteMap />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Highlights cards ───────────────────────── */}
        <section>
          <StaggerContainer delay={0.1} className={styles.highlightGrid}>
            {highlights.map((item, i) => (
              <StaggerItem key={item.title} index={i} style={{ height: '100%' }}>
                <motion.article
                  className={styles.highlightCard}
                  style={{ height: '100%' }}
                  whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(0,0,0,0.08)' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className={styles.highlightIcon}>{item.icon}</div>
                  <div>
                    <h3 className={styles.highlightTitle}>{item.title}</h3>
                    <p className={styles.highlightText}>{item.description}</p>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Feature cards ──────────────────────────── */}
        <section className={styles.featureSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <h2 className={styles.sectionHeading}>Características geográficas</h2>
          </ScrollReveal>
          <StaggerContainer delay={0.2} className={styles.featureGrid}>
            {sections.map((section, i) => (
              <StaggerItem key={section.title} index={i} style={{ height: '100%' }}>
                <motion.article
                  className={styles.featureCard}
                  style={{ height: '100%' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                >
                  <div className={styles.featureBody}>
                    <div className={styles.featureBadge}>{section.icon}</div>
                    <h3 className={styles.featureTitle}>{section.title}</h3>
                    <p className={styles.featureText}>{section.content}</p>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Stats + Census table ────────────────────── */}
        <section className={styles.statsAndTable}>
          <StaggerContainer delay={0.1} className={styles.statsPanel}>
            {[
              { val: '81 m', label: 'Altura sobre el nivel del mar' },
              { val: '1.944', label: 'Habitantes en 2002' },
              { val: '4', label: 'Centros educativos' }
            ].map((stat, i) => (
              <StaggerItem key={stat.label} index={i} style={{ height: '100%' }}>
                <motion.div
                  className={styles.statCardLarge}
                  style={{ height: '100%' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <span className={styles.statValue}>{stat.val}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal variant="up" delay={0.3}>
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Evolución poblacional</h2>
              <p className={styles.sectionText}>
                El documento registra el crecimiento de habitantes y viviendas en Tacarigua, con un fuerte avance entre 1950 y 1981 y una población de 1.944 personas en 2002.
              </p>
              <div className={styles.tableWrapper}>
                <table className={styles.censusTable}>
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Viviendas</th>
                      <th>Habitantes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {censusData.map((row) => (
                      <tr key={row.year}>
                        <td>{row.year}</td>
                        <td>{row.housing}</td>
                        <td>{row.population}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── PDF Download ────────────────────────── */}
        <section>
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
                  <MapPin size={14} style={{ marginRight: '0.35rem', display: 'inline', verticalAlign: 'middle' }} />
                  DOCUMENTO GEOGRÁFICO
                </span>
                <h3 style={{ color: 'var(--goldenrod)', fontWeight: 700, margin: 0, fontSize: '1.15rem' }}>
                  Geografía de Tacarigua para Descargar
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
                  Documento completo con mapas, relieve, hidrografía y datos poblacionales
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.a
                  className={styles.ctaButton}
                  href="/TacariguaGeografía.pdf"
                  download target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} style={{ marginRight: '0.35rem' }} />
                  Descargar PDF Geográfico
                </motion.a>
              </div>
            </motion.div>
          </ScrollReveal>
        </section>
      </div>
    </motion.div>
  );
}

export default GeografiaModule;