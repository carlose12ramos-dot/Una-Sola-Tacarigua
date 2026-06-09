import styles from './NosotrosModule.module.css';
import { IMAGES } from '../data/images';

const PROJECT_FEATURES = [
  {
    icon: '📜',
    title: 'Memoria Histórica Verificada',
    description: 'En febrero de 2018, un grupo de tacarigüeros nativos y amigos de la comunidad creó un Equipo de Trabajo para reconstruir la memoria histórica en cinco módulos: Historia, Educación, Cultura, Sanidad y Deportes, con asesoría de la Academia de la Historia de Nueva Esparta.',
  },
  {
    icon: '🏺',
    title: 'Patrimonio de Cultores',
    description: 'Directorio de músicos, artesanos, cronistas y compositores documentados en el Módulo de Cultura: desde José España Gil, el mejor requintista de Venezuela, hasta los olleros del Valle y los 76 libros publicados por autores tacarigüeros.',
  },
  {
    icon: '📖',
    title: 'Biblioteca Comunitaria',
    description: 'Acceso a las obras de José Joaquín Salazar Franco "Cheguaco", los módulos de Memoria Histórica, archivos periodísticos como "El Alarmador" (1966) y registros de música folclórica y tradiciones vivas de Tacarigua.',
  },
  {
    icon: '🎓',
    title: 'La Atenas Neoespartana',
    description: 'Tacarigua fue de las primeras nueve poblaciones del estado en recibir escuelas en el siglo XIX. Con un 28,3 % de profesionales universitarios registrado ante la UNESCO, la comunidad es reconocida como La Atenas Neoespartana.',
  },
];

const PROJECT_VALUES = [
  {
    icon: '🔍',
    title: 'Veracidad',
    description: 'Información verificada y documentada con fuentes confiables',
  },
  {
    icon: '🤝',
    title: 'Comunidad',
    description: 'Trabajo colaborativo con los habitantes de Tacarigua de Margarita',
  },
  {
    icon: '💡',
    title: 'Innovación',
    description: 'Uso de tecnología moderna para preservar la historia',
  },
  {
    icon: '🌍',
    title: 'Accesibilidad',
    description: 'Conocimiento disponible para todos, sin barreras',
  },
  {
    icon: '❤️',
    title: 'Pasión',
    description: 'Amor profundo por nuestra tierra y su historia',
  },
  {
    icon: '📚',
    title: 'Educación',
    description: 'Compromiso con el aprendizaje y la difusión cultural',
  },
];

const PROJECT_STATS = [
  {
    label: 'Libros Publicados',
    value: '76+',
    icon: '📚',
  },
  {
    label: 'Profesionales Universitarios',
    value: '28.3%',
    icon: '🎓',
  },
  {
    label: 'Años de Historia',
    value: '445',
    icon: '📜',
  },
  {
    label: 'Módulos de Memoria',
    value: '5',
    icon: '🗂️',
  },
];

function NosotrosModule() {
  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Sobre Nosotros</h2>
        <div className={styles.divider}></div>
        <p className={styles.lead}>
          Preservando la memoria histórica de Tacarigua de Margarita, Estado Nueva Esparta, Venezuela, para las generaciones futuras.
        </p>
      </div>

      {/* Mission and Vision */}
      <section className={styles.featureSection}>
        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3 className={styles.featureTitle}>Nuestra Misión</h3>
            <p className={styles.featureText}>
              Digitalizar y preservar la memoria histórica de Tacarigua de Margarita, haciendo accesible su rico patrimonio cultural, educativo y social a través de una plataforma interactiva y colaborativa.
            </p>
          </article>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>🔭</div>
            <h3 className={styles.featureTitle}>Nuestra Visión</h3>
            <p className={styles.featureText}>
              Convertirnos en el referente digital más completo sobre la historia y cultura de Tacarigua, conectando a las generaciones actuales y futuras con sus raíces a través de la tecnología y la innovación.
            </p>
          </article>
        </div>
      </section>

      {/* Statistics */}
      <section className={styles.mediaSection}>
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Estadísticas</span>
          <h3 className={styles.mediaTitle}>Datos Destacados</h3>
          <p className={styles.mediaLead}>
            Cifras que reflejan la riqueza histórica y cultural de Tacarigua de Margarita.
          </p>
        </div>
        <div className={styles.statsGrid}>
          {PROJECT_STATS.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Features */}
      <section className={styles.featureSection}>
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Proyecto</span>
          <h3 className={styles.mediaTitle}>Nuestros Módulos</h3>
          <p className={styles.mediaLead}>
            Conoce las áreas que conforman la memoria histórica de Tacarigua.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {PROJECT_FEATURES.map((feature) => (
            <article key={feature.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className={styles.featureSection}>
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Valores</span>
          <h3 className={styles.mediaTitle}>Nuestros Principios</h3>
          <p className={styles.mediaLead}>
            Los valores que guían nuestro trabajo en preservar la historia de Tacarigua.
          </p>
        </div>
        <div className={styles.valuesGrid}>
          {PROJECT_VALUES.map((value) => (
            <div key={value.title} className={styles.valueCard}>
              <div className={styles.valueIcon}>{value.icon}</div>
              <h4 className={styles.valueTitle}>{value.title}</h4>
              <p className={styles.valueText}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Content */}
      <section className={styles.mediaSection}>
        <div className={styles.mediaHeader}>
          <span className={styles.mediaBadge}>Origen</span>
          <h3 className={styles.mediaTitle}>¿Por qué Una Sola Tacarigua?</h3>
          <p className={styles.mediaLead}>
            La historia detrás de nuestra plataforma digital.
          </p>
        </div>
        <div className={styles.aboutContent}>
          <div className={styles.textBlock}>
            <p className={styles.text}>
              La Parroquia Guevara atesora siglos de historia: desde el encuentro de los indios Tacaribas con Miguel Maza de Lizana en 1579, pasando por héroes de la Independencia como José Victorino Guzmán, hasta el nacimiento del Presidente Diego B. Urbaneja Alayón en 1817. Esa memoria, documentada por el cronista José Joaquín Salazar Franco y actualizada en 2022, no debe quedar en el olvido.
            </p>
            <p className={styles.text}>
              Una Sola Tacarigua nace como la plataforma que lleva esa investigación al mundo digital: accesible, moderada y fiel a las fuentes comunitarias que la hicieron posible.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <img
              src={IMAGES.iglesiaPlazaAerea.src}
              alt={IMAGES.iglesiaPlazaAerea.alt}
              className={styles.sideImage}
              loading="lazy"
              onError={(e) => { e.currentTarget.src = IMAGES.iglesiaPlazaAerea.fallback; }}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default NosotrosModule;
