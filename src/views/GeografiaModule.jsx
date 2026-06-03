import styles from './GeografiaModule.module.css';

const sections = [
  {
    id: 'ubicacion',
    title: 'Ubicación',
    content: `Tacarigua se encuentra en la parte centro-norte de la isla de Margarita, en un semivalle de clima benigno a unos 81 metros sobre el nivel del mar, entre la capital del estado La Asunción al este y Santa Ana del Norte al oeste. Dista aproximadamente 7,7 km de Juan Griego y 12,3 km de Porlamar.`,
    icon: '📍',
  },
  {
    id: 'relieve',
    title: 'Relieve',
    content: `El poblado está rodeado de un sistema de cerros que lo delimitan y abastecen de agua. Los más destacados son El Tamoco, La Palma Real, El Mureche, Cerro Pelón y El Portachuelo — conocido históricamente como El Portezuelo de la Banda del Norte —, este último el paso natural estratégico que comunica esa Banda del Norte con el resto de la isla y que fue escenario de múltiples combates entre 1813 y 1902.`,
    icon: '⛰️',
  },
  {
    id: 'hidrologia',
    title: 'Hidrología',
    content: `Tacarigua constituye una de las zonas de mayor riqueza hídrica de la isla. Un estudio de la Universidad Central de Venezuela de 1971 la describió como “la zona hídrica más importante del Oriente del País”. Sus cerros alimentan varias quebradas y pozas de agua cristalina que desde tiempos prehispánicos atrajeron asentamientos humanos, entre ellos el manantial de Belén y la quebrada del Orinoco.`,
    icon: '💧',
  },
  {
    id: 'organizacion',
    title: 'Organización territorial',
    content: `Tacarigua se presenta como una sola comunidad territorial y cultural. Sectores como Tacarigua Afuera, Tacarigua Adentro, Tacarigüita, Corazón de Jesús, San Sebastián, Toporo y El Conchal forman un mismo valle compartido por su gente y su historia.`,
    icon: '🗺️',
  },
  {
    id: 'demografia',
    title: 'Población y vivienda',
    content: `Según el I Censo Popular de Tacarigua realizado en noviembre de 2002 —que abarcó solo el sector Tacarigua Arriba— la población era de 1.944 habitantes, de los cuales el 52,5 % eran mujeres. Entre 1950 y 1981 la población creció un 60 % y el número de viviendas un 89 %. Del total censado en 2002, el 20,4 % eran profesionales universitarios y el 13,9 % técnicos superiores o bachilleres cursando educación superior. Solo 84 personas eran analfabetas, el 97 % de ellas mayores de 60 años. El pueblo cuenta con cuatro centros de educación primaria —dos nacionales y dos privados— y un liceo de educación media general.`,
    icon: '👥',
  },
];

const censusData = [
  { year: '1881', housing: '871', population: '—' },
  { year: '1950', housing: '243', population: '1.170' },
  { year: '1961', housing: '340', population: '1.192' },
  { year: '1971', housing: '362', population: '1.384' },
  { year: '1981', housing: '460', population: '1.871' },
  { year: '2002', housing: '459', population: '1.944' },
];

const highlights = [
  {
    icon: '📍',
    title: 'Centro-norte de Margarita',
    description: 'Tacarigua está a 81 metros sobre el mar, entre La Asunción y Santa Ana del Norte.',
  },
  {
    icon: '💧',
    title: 'Riqueza hídrica',
    description: 'El área es una de las zonas hídricas más importantes del oriente venezolano.',
  },
  {
    icon: '🏘️',
    title: 'Un solo territorio',
    description: 'Tacarigua se presenta como una sola comunidad integrada por sectores como Corazón de Jesús, San Sebastián y Tacarigüita.',
  },
];

function GeografiaModule() {
  return (
    <div className={styles.geografiaContainer}>
      <header className={styles.header}>
        <span className={styles.badge}>Geografía</span>
        <h1 className={styles.title}>Geografía de Tacarigua</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>
          Documento completo de TacariguaGeografía con la ubicación, relieve, hidrología, organización territorial, evolución poblacional y datos clave del valle.
        </p>
        <div className={styles.heroActions}>
          <a
            className={styles.ctaButton}
            href="/TacariguaGeografía.pdf"
            download
            target="_blank"
            rel="noreferrer"
          >
            Descargar PDF de TacariguaGeografía
          </a>
        </div>
      </header>

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

      <section className={styles.mapSection}>
        <div className={styles.mapHeader}>
          <h2 className={styles.mapTitle}>Mapa y ubicación</h2>
          <p className={styles.mapText}>
            Vista interactiva del casco de Tacarigua y su valle, con un mapa embebido para consulta directa.
          </p>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            title="Mapa de Tacarigua"
            src="https://www.google.com/maps?q=Tacarigua%2C%20Nueva%20Esparta%2C%20Venezuela&output=embed"
            className={styles.mapIframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className={styles.featureGrid}>
        {sections.map((section) => (
          <article key={section.id} className={styles.featureCard}>
            <div className={styles.featureBody}>
              <div className={styles.featureBadge}>{section.icon}</div>
              <h3 className={styles.featureTitle}>{section.title}</h3>
              <p className={styles.featureText}>{section.content}</p>
            </div>
          </article>
        ))}
      </section>

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
