import React, { useState } from 'react';
import styles from './GeografiaModule.module.css';

const sectionsData = [
  {
    id: 'valle',
    title: 'El Valle de Tacarigua',
    description: 'Rodeado de imponentes cerros, el valle es el pulmón verde e histórico de la Parroquia Guevara. Con tierras tradicionales para la agricultura de subsistencia, ha sido el hogar histórico de familias de labradores y artesanos.',
    detail: 'Ubicado en el corazón del Municipio Gómez en la Isla de Margarita, destaca por su frescura y su topografía de colinas suaves y llanuras aluviales. Los límites naturales configuran un microclima único en la isla.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
    icon: '⛰️'
  },
  {
    id: 'copey',
    title: 'Parque Nacional Cerro Copey',
    description: 'El cerro más alto de la Isla de Margarita resguarda fuentes hídricas vitales y una biodiversidad única. Sus laderas boscosas descienden hacia Tacarigua aportando frescor y humedad.',
    detail: 'Declarado Parque Nacional en 1974, protege ecosistemas que van desde el bosque seco tropical hasta el bosque húmedo de montaña. Es hogar de especies endémicas como el mono capuchino de Margarita y el venado caramerudo.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
    icon: '🌳'
  },
  {
    id: 'plaza',
    title: 'La Plaza Hexagonal y Diseño Urbano',
    description: 'Un hito urbano singular. A diferencia de las plazas coloniales cuadradas tradicionales, la plaza de Tacarigua presenta una geometría hexagonal distintiva que organiza el centro de la comunidad.',
    detail: 'Este diseño geométrico facilita el encuentro de los pobladores y distribuye los accesos principales hacia la iglesia histórica y las calles que conectan con los caseríos circundantes.',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=400&fit=crop',
    icon: '📐'
  },
  {
    id: 'recursos',
    title: 'Suelos y Agricultura Tradicional',
    description: 'Los suelos arcillosos de la parroquia han sido aprovechados durante generaciones para la alfarería y cultivos tradicionales como el maíz, yuca, plátano y árboles frutales.',
    detail: 'A pesar del clima semiárido general de la isla, el valle retiene humedad subterránea facilitando la existencia de pozos tradicionales y una producción agrícola artesanal de gran valor cultural.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop',
    icon: '🌾'
  }
];

const GeografiaModule = () => {
  const [activeSection, setActiveSection] = useState('valle');

  const activeData = sectionsData.find(sec => sec.id === activeSection);

  return (
    <div className={styles.geografiaContainer}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Conexión con el Territorio</span>
        <h1 className={styles.title}>Geografía de la Parroquia Guevara</h1>
        <div className={styles.divider}></div>
        <p className={styles.lead}>
          Explora los relieves, límites naturales y características físicas de Tacarigua, un valle rodeado de cerros y tradiciones.
        </p>
      </header>

      <section className={styles.mainGrid}>
        {/* Navigation Sidebar */}
        <aside className={styles.sidebar}>
          {sectionsData.map(sec => (
            <button
              key={sec.id}
              className={`${styles.navButton} ${activeSection === sec.id ? styles.navButtonActive : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <span className={styles.btnIcon}>{sec.icon}</span>
              <span className={styles.btnTitle}>{sec.title}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <article className={styles.contentCard}>
          <div className={styles.imageContainer}>
            <img src={activeData.image} alt={activeData.title} className={styles.cardImage} />
            <div className={styles.imageOverlay}>
              <span className={styles.categoryBadge}>{activeData.icon} {activeData.title}</span>
            </div>
          </div>

          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>{activeData.title}</h2>
            <p className={styles.cardDescription}>{activeData.description}</p>
            
            <div className={styles.detailsBox}>
              <h3 className={styles.detailsTitle}>Datos & Detalles de Interés</h3>
              <p className={styles.detailsText}>{activeData.detail}</p>
            </div>
          </div>
        </article>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>⛰️ Cerro Copey</div>
          <div className={styles.statLabel}>Parque colindante</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>🌾 Valle Fértil</div>
          <div className={styles.statLabel}>Tradición agrícola</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>📐 Hexagonal</div>
          <div className={styles.statLabel}>Diseño de la plaza central</div>
        </div>
      </section>
    </div>
  );
};

export default GeografiaModule;
