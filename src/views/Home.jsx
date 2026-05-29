import { Link } from 'react-router-dom';
import { Palette, Map, Users, Building } from 'lucide-react';
import HeroBanner from '../components/home/HeroBanner';
import { homeCardsMock } from '../data/mockData';
import styles from './Home.module.css';

const FEATURED = [
  {
    path: '/cultura',
    title: 'Cultura',
    description: 'Tradiciones, festividades, gastronomía y expresiones artísticas de Tacarigua',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop',
    icon: Palette,
  },
  {
    path: '/geografia',
    title: 'Geografía',
    description: 'Conoce el territorio, clima y recursos naturales de la Parroquia Guevara',
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600&h=400&fit=crop',
    icon: Map,
  },
  {
    path: '/sociedad',
    title: 'Sociedad',
    description: 'Servicios de salud, educación, deportes e historia comunitaria',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
    icon: Users,
  },
  {
    path: '/nosotros',
    title: 'Nosotros',
    description: 'Historia, valores y misión de Tacarigua Digital',
    image: 'https://images.unsplash.com/photo-1627666338597-ce13e208a93d?w=600&h=400&fit=crop',
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
                  <img src={image} alt={title} className={styles.image} />
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
              Tacarigua Digital es una plataforma moderna que preserva y promueve el patrimonio cultural,
              histórico y social de la Parroquia Guevara en la Isla de Margarita.
            </p>
            <p className={styles.missionTextSecondary}>
              Nuestra misión es conectar a la comunidad con sus raíces, facilitando el acceso a información
              sobre cultura, geografía, servicios y eventos que definen nuestra identidad regional.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>500+</div>
                <div className={styles.statLabel}>Artículos</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValueAlt}>50+</div>
                <div className={styles.statLabel}>Lugares</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>24/7</div>
                <div className={styles.statLabel}>Acceso</div>
              </div>
            </div>
          </div>

          <div className={styles.imageBlock}>
            <div className={styles.imageGlow} />
            <img
              src="https://images.unsplash.com/photo-1741272689174-f7f03b09a0ab?w=800&h=600&fit=crop"
              alt="Cultura de Tacarigua"
              className={styles.missionImage}
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
