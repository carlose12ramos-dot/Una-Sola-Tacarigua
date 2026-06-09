import styles from './GeografiaModule.module.css';
import Map from '../components/Map/Map';
import SatelliteMap from '../components/Map/SatelliteMap';

import { sections, censusData, highlights } from './geografiaData';

function GeografiaModule() {
  return (
    <div className={styles.geografiaContainer}>

      {/* ── Header ─────────────────────────────────── */}
      <header className={styles.header}>
        <h1 className={styles.title}>Geografía de Tacarigua</h1>
        <div className={styles.divider} />
        <div className={styles.heroActions}>
          <a
            className={styles.ctaButton}
            href="/TacariguaGeografía.pdf"
            download
            target="_blank"
            rel="noreferrer"
          >
            Descargar PDF Geográfico Completo
          </a>
        </div>
      </header>

      {/* ── Highlights cards ───────────────────────── */}
      <section className={styles.highlightGrid}>
        {highlights.map((item) => (
          <article key={item.title} className={styles.highlightCard}>
            <div className={styles.highlightIcon}>{item.icon}</div>
            <div>
              <h3 className={styles.highlightTitle}>{item.title}</h3>
              <p className={styles.highlightText}>{item.description}</p>
            </div>
          </article>
        ))}
      </section>

      {/* ── Maps section (two maps side by side) ───── */}
      <section className={styles.mapsSection}>
        <div className={styles.mapsHeader}>
          <h2 className={styles.mapsTitle}>Ubicación y mapas</h2>
          <p className={styles.mapsSubtitle}>
            Explora Tacarigua en el mapa interactivo de hitos o consulta su ubicación directamente en Google Maps.
          </p>
        </div>

        <div className={styles.mapsDuo}>
          {/* Mapa interactivo Leaflet */}
          <div className={styles.mapCard}>
            <div className={styles.mapCardHeader}>
              <span className={styles.mapCardBadge}>🗺️ Mapa Interactivo</span>
              <p className={styles.mapCardDesc}>
                Hitos culturales, religiosos, gastronómicos y naturales del valle. Usa el botón <strong>Mi ubicación</strong> para verte en el mapa.
              </p>
            </div>
            <div className={styles.mapBox}>
              <Map />
            </div>
          </div>

          {/* Mapa satelital (ESRI + Etiquetas OSM) */}
          <div className={styles.mapCard}>
            <div className={styles.mapCardHeader}>
              <span className={styles.mapCardBadge}>🛰️ Vista Satelital Detallada</span>
              <p className={styles.mapCardDesc}>
                Imagen satelital de Tacarigua con calles y sectores. Funciona <strong>sin internet</strong> después de la primera visita.
              </p>
            </div>
            <div className={styles.mapBox}>
              <SatelliteMap />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature cards ──────────────────────────── */}
      <section className={styles.featureSection}>
        <h2 className={styles.sectionHeading}>Características geográficas</h2>
        <div className={styles.featureGrid}>
          {sections.map((section) => (
            <article key={section.id} className={styles.featureCard}>
              <div className={styles.featureBody}>
                <div className={styles.featureBadge}>{section.icon}</div>
                <h3 className={styles.featureTitle}>{section.title}</h3>
                <p className={styles.featureText}>{section.content}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Stats + Census table ────────────────────── */}
      <section className={styles.statsAndTable}>
        <div className={styles.statsPanel}>
          <div className={styles.statCardLarge}>
            <span className={styles.statValue}>81 m</span>
            <span className={styles.statLabel}>Altura sobre el nivel del mar</span>
          </div>
          <div className={styles.statCardLarge}>
            <span className={styles.statValue}>1.944</span>
            <span className={styles.statLabel}>Habitantes en 2002</span>
          </div>
          <div className={styles.statCardLarge}>
            <span className={styles.statValue}>4</span>
            <span className={styles.statLabel}>Centros educativos</span>
          </div>
        </div>

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
      </section>
    </div>
  );
}

export default GeografiaModule;
