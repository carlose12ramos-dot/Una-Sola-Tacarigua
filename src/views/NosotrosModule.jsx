import React from 'react';
import styles from './NosotrosModule.module.css';

const NosotrosModule = () => {
  return (
    <div className={styles.nosotrosContainer}>
      {/* Hero Banner Section */}
      <header className={styles.header}>
        <span className={styles.badge}>Nuestra Misión</span>
        <h1 className={styles.title}>Sobre Tacarigua Digital</h1>
        <div className={styles.divider}></div>
        <p className={styles.lead}>
          Una plataforma geocultural diseñada para preservar, moderar y difundir la rica memoria histórica y tradiciones de la Parroquia Guevara, Margarita.
        </p>
      </header>

      {/* Grid of Values / Features */}
      <section className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.iconWrapper}>💾</div>
          <h3 className={styles.cardTitle}>Offline-First</h3>
          <p className={styles.cardDesc}>
            Concebida para funcionar de manera óptima incluso en condiciones de baja conectividad. Los usuarios pueden acceder a la información histórica y la biblioteca cultural local sin depender de una conexión activa a Internet.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.iconWrapper}>🏺</div>
          <h3 className={styles.cardTitle}>Patrimonio de Cultores</h3>
          <p className={styles.cardDesc}>
            Un directorio dinámico para dar visibilidad a artesanos, músicos y luthieres de la región, facilitando que su saber hacer se preserve y se transfiera a las futuras generaciones.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.iconWrapper}>📖</div>
          <h3 className={styles.cardTitle}>Biblioteca Local</h3>
          <p className={styles.cardDesc}>
            Acceso a partituras, archivos de música folclórica tradicional (como polos, jotas y malagueñas) y registros documentales que consolidan nuestra identidad musical y cultural.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.iconWrapper}>⚖️</div>
          <h3 className={styles.cardTitle}>Moderación Participativa</h3>
          <p className={styles.cardDesc}>
            Un espacio donde los ciudadanos pueden proponer aportes y sugerencias geoculturales, las cuales son validadas a través de un panel de moderación para garantizar la precisión y el respeto patrimonial.
          </p>
        </article>
      </section>

      {/* Project Vision & Background */}
      <section className={styles.aboutContent}>
        <div className={styles.textBlock}>
          <h2 className={styles.sectionTitle}>¿Por qué Tacarigua Digital?</h2>
          <p className={styles.text}>
            La Parroquia Guevara, con sus pintorescos caseríos y arraigadas tradiciones, atesora saberes y manifestaciones que forman el alma de Nueva Esparta. En un mundo cada vez más digitalizado y conectado, es imperativo estructurar repositorios de información que salvaguarden este legado y lo mantengan accesible para todos los habitantes, superando las brechas tecnológicas.
          </p>
          <p className={styles.text}>
            Este proyecto de implantación surge como respuesta a la necesidad de crear un punto de encuentro interactivo e independiente (MPA) para el aprendizaje, la investigación y la moderación activa de nuestro patrimonio.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img 
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=500&h=400&fit=crop" 
            alt="Valle y Tradición" 
            className={styles.sideImage}
          />
        </div>
      </section>
    </div>
  );
};

export default NosotrosModule;
