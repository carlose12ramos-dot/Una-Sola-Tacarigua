import { useState } from 'react';
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
    image: IMAGES.culturaInicio,
    icon: Palette,
  },
  {
    path: '/geografia',
    title: 'Geografía',
    description: 'El Valle de los Olleros, la Banda del Norte, el Portachuelo del Norte y la serranía que abastece de agua a la parroquia',
    image: IMAGES.mapaInicio,
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
    image: IMAGES.docLegalFun,
    icon: Building,
  },
];

function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const openCard = (card) => {
    setActiveCard(card);
    setActiveImage(card.modalImages?.[0] ?? null);
  };
  const closeCard = () => {
    setActiveCard(null);
    setActiveImage(null);
  };

  return (
    <>
      <HeroBanner />

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h1 className={styles.sectionTitle}>Un Solo Pueblo</h1>
            <p className={styles.sectionDesc}>
              Conoce nuestra cultura, geografía, historia y servicios comunitarios en un solo lugar.
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
            <h1 className={styles.sectionTitle}>La Historia Que Nos Une</h1>
            <p className={styles.sectionDesc}>
              Explora relatos, personajes y eventos que han moldeado la identidad de Tacarigua a lo largo de los siglos.
            </p>
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
                  <button
                    type="button"
                    className={styles.highlightBtn}
                    onClick={() => openCard(card)}
                  >
                    Ver Más
                  </button>
                </div>
              </article>
            ))}
          </div>
          {activeCard && (
            <div className={styles.modalOverlay} onClick={closeCard} role="dialog" aria-modal="true" aria-label={activeCard.titulo}>
              <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
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
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionGrid}>
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
            <div className={styles.videoGrid}>
              <video
                src="/images/videos/Tacarigua.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <video
                src="/images/videos/videoss.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
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
