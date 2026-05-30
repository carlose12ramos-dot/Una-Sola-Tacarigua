import { useState } from 'react';
import styles from './GeografiaModule.module.css';
import { IMAGES } from '../data/images';

const sectionsData = [
  {
    id: 'valle',
    title: 'El Valle de los Olleros',
    description: 'Extensión territorial desde El Portachuelo hasta Pedro González, donde indígenas de El Cercao, Tacarigua, Santa Ana, La Vecindad, Altagracia y Pedro González fabricaban cerámica de barro: ánforas, pimpinas, tinajones y platos.',
    detail: 'Se conoce como El Valle de los Olleros a toda aquella extensión donde los pobladores prehispánicos y coloniales desarrollaron la alfarería. Los productos pasaron de uso doméstico a objetos de intercambio comercial con otras comunidades de la isla.',
    imageKey: 'valleOlleros',
    icon: '🏺',
  },
  {
    id: 'banda',
    title: 'La Banda del Norte',
    description: 'Término del siglo XVI con el cual los españoles dividieron el territorio margariteño. Tacarigua fue catalogada como la Banda del Norte del Portezuelo, desde las estribaciones del cerro hasta las aguas de Juangriego.',
    detail: 'Comprendía Tacarigua, Santa Ana, El Cercao, La Vecindad y Juangriego — este último era el puerto de la Banda del Norte. La Banda del Sur se extendía desde El Portachuelo hacia La Asunción.',
    imageKey: 'bandaNorte',
    icon: '🗺️',
  },
  {
    id: 'portachuelo',
    title: 'El Portachuelo del Norte',
    description: 'Punto clave para la defensa de la Isla de Margarita. Quien tomara el Portachuelo tenía asegurado el triunfo. Contaba con una batería de tres cañones, incluyendo el "Burro Negro" apuntando hacia Juangriego.',
    detail: 'Defendido heroicamente por el Capitán José Victorino Guzmán durante la Independencia con su grito: "Ni uno más pa\'bajo cará...". Vestigios de la batería aún existen en el sitio. Conecta Tacarigua con Tacarigüita (El Portachuelo).',
    imageKey: 'portachuelo',
    icon: '⚔️',
  },
  {
    id: 'cerros',
    title: 'Serranía y Manantiales',
    description: 'La serranía tacarigüera abarca desde el Cerro Pelón hasta la Palma Real, pasando por El Tamoco, Chupacachimbo, El Peñón, La Matica Redonda, El Rincón, Tibio y La Barca, hasta colindar con el Parque Nacional Cerro Copey.',
    detail: 'Los indios Tacaribas se asentaron en estas estribaciones atraídos por la abundancia de agua y la fertilidad del valle. Los españoles denominaron la zona como "la savaneta del Portezuelo de la Banda del Norte".',
    imageKey: 'serrania',
    icon: '⛰️',
  },
  {
    id: 'recursos',
    title: 'Productos Originarios y Agrícolas',
    description: 'Los guaiqueríes cultivaban piña, lechoza, maíz, yuca, papa y tomate. Los españoles introdujeron café, caña de azúcar, naranja, limón y mango. La caña se convirtió en símbolo de la tacarigüedad en el Valle de las Tacariguas.',
    detail: 'De esta serranía se desprenden dos valles: el del norte regado por el río Tacarigua, y el del sur costeado por los cerros de la Vega de San Juan y el Copey. Ambos son de gran importancia agrícola para la isla.',
    imageKey: 'agricultura',
    icon: '🌾',
  },
];

function GeografiaModule() {
  const [activeSection, setActiveSection] = useState('valle');
  const activeData = sectionsData.find((sec) => sec.id === activeSection);

  return (
    <div className={styles.geografiaContainer}>
      <header className={styles.header}>
        <span className={styles.badge}>Geografía</span>
        <h1 className={styles.title}>Geografía de la Parroquia Guevara</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>
          El Valle de los Olleros, la Banda del Norte y la serranía que protege a Tacarigua:
          territorio, agua y tradición agrícola en la Isla de Margarita.
        </p>
      </header>

      <section className={styles.mainGrid}>
        <aside className={styles.sidebar}>
          {sectionsData.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`${styles.navButton} ${activeSection === sec.id ? styles.navButtonActive : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <span className={styles.btnIcon}>{sec.icon}</span>
              <span className={styles.btnTitle}>{sec.title}</span>
            </button>
          ))}
        </aside>

        <article className={styles.contentCard}>
          <div className={styles.imageContainer}>
            <img
              src={IMAGES[activeData.imageKey].src}
              alt={IMAGES[activeData.imageKey].alt}
              className={styles.cardImage}
              onError={(e) => { e.currentTarget.src = IMAGES[activeData.imageKey].fallback; }}
            />
            <div className={styles.imageOverlay}>
              <span className={styles.categoryBadge}>{activeData.icon} {activeData.title}</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>{activeData.title}</h2>
            <p className={styles.cardDescription}>{activeData.description}</p>
            <div className={styles.detailsBox}>
              <h3 className={styles.detailsTitle}>Datos documentados</h3>
              <p className={styles.detailsText}>{activeData.detail}</p>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>🏺 Valle de los Olleros</div>
          <div className={styles.statLabel}>Tradición alfarera</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>⚔️ Portachuelo</div>
          <div className={styles.statLabel}>Batería "Burro Negro"</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>🌾 Caña de Azúcar</div>
          <div className={styles.statLabel}>Símbolo tacarigüero</div>
        </div>
      </section>
    </div>
  );
}

export default GeografiaModule;
