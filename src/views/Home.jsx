import { Link } from 'react-router-dom';
import { Palette, Map, Users, Building } from 'lucide-react';
import HeroBanner from '../components/home/HeroBanner';
import { homeCardsMock } from '../data/mockData';
import { IMAGES } from '../data/images';
import styles from './Home.module.css';

const FEATURED = [
  {
    path: '/cultura',
    title: 'Cultura',
    description: '76 libros de autores tacarigüeros, conjuntos musicales, patronos, artesanía de los Olleros y tradiciones de más de 438 años',
    image: IMAGES.culturaComunitaria,
    icon: Palette,
  },
  {
    path: '/geografia',
    title: 'Geografía',
    description: 'El Valle de los Olleros, la Banda del Norte, el Portachuelo del Norte y la serranía que abastece de agua a la parroquia',
    image: IMAGES.portachuelo,
    icon: Map,
  },
  {
    path: '/sociedad',
    title: 'Sociedad',
    description: 'Educación desde 1875, sanidad desde los manantiales guaiqueríes y deportes con medallas olímpicas de Nicomedes Maza González',
    image: IMAGES.educacionHero,
    icon: Users,
  },
  {
    path: '/historia',
    title: 'Historia',
    description: 'Desde el encuentro con Miguel Maza de Lizana en 1579 hasta Diego B. Urbaneja, Presidente de Venezuela, nacido en Tacarigua',
    image: IMAGES.muralUrbaneja,
    icon: Building,
  },
];

function Home() {
  return (
    <>
      <HeroBanner />

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.badge}>Descubre</span>
            <h2 className={styles.sectionTitle}>Explora Tacarigua</h2>
            <p className={styles.sectionDesc}>
              Conoce nuestra cultura, geografía, historia y servicios comunitarios
            </p>
          </div>

          <div className={styles.grid}>
            {FEATURED.map(({ path, title, description, image, icon: Icon }) => (
              <Link key={path} to={path} className={styles.card}>
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
            ))}
          </div>
        </div>
      </section>

      <section className={styles.highlightSection}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.badge}>Destacados</span>
            <h2 className={styles.sectionTitle}>Patrimonio de Guevara</h2>
          </div>
          <div className={styles.highlightGrid}>
            {homeCardsMock.map((card) => (
              <article
                key={card.id}
                className={card.tipo === 'memoria' ? styles.highlightPrimary : styles.highlightWhite}
              >
                {card.imagen && (
                  <div className={styles.highlightImage}>
                    <img src={card.imagen} alt={card.titulo} />
                  </div>
                )}
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>{card.titulo}</h3>
                  <p className={styles.highlightDesc}>{card.descripcion}</p>
                  <button type="button" className={styles.highlightBtn}>Ver Más</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionGrid}>
          <div>
            <span className={styles.missionBadge}>Nuestra Misión</span>
            <h2 className={styles.missionTitle}>Tu Portal Cultural Digital</h2>
            <p className={styles.missionText}>
              Tacarigua Digital preserva la Memoria Histórica de la Parroquia Guevara:
              investigación comunitaria iniciada en febrero de 2018 que documentó cinco módulos
              — Historia, Educación, Cultura, Sanidad y Deportes — con fuentes verificadas.
            </p>
            <p className={styles.missionTextSecondary}>
              Desde los indios Tacaribas y el Valle de los Olleros, pasando por héroes de la
              Independencia y la Atenas Neoespartana, hasta los cultores y deportistas de hoy:
              esta plataforma conecta a la comunidad con sus raíces documentadas.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>76</div>
                <div className={styles.statLabel}>Libros publicados</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValueAlt}>5</div>
                <div className={styles.statLabel}>Módulos históricos</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>28,3%</div>
                <div className={styles.statLabel}>Profesionales universitarios</div>
              </div>
            </div>
          </div>

          <div className={styles.imageBlock}>
            <div className={styles.imageGlow} />
            <video
              src="/images/videos/Tacarigua.mp4"
              className={styles.missionVideo}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className={styles.yearsBadge}>
              <span className={styles.yearsValue}>300+</span>
              <span className={styles.yearsLabel}>Años</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
