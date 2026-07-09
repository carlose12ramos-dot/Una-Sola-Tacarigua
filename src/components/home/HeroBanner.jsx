import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroBanner.module.css';
import { IMAGES } from '../../data/images';

const SLIDES = [
  {
    image: IMAGES.plazaHexagonal,
    title: '¡Bienvenidos a la Parroquia Guevara!',
    subtitle: 'La Tacarigua de Margarita: memoria histórica, cultura y tradición en el corazón de Nueva Esparta',
  },
  {
    image: IMAGES.mapaTacarigua,
    title: 'Mapa de Tacarigua',
    subtitle: 'Descubre el valle, los cerros y el paso del Portachuelo que unen a toda la comunidad.',
  },
  {
    image: IMAGES.p6100004,
    title: 'Corazones unidos en una misma fe',
    subtitle: 'Nuestras Iglesias y capillas, testigos de devoción, fe y tradición.',
  },
  {
    image: IMAGES.paisajeHero,
    title: 'Memoria Histórica Viva',
    subtitle: '438 años de cultura, desde los indios Tacaribas hasta la comunidad de hoy',
  },
  {
    image: IMAGES.iglesiaPlazaAerea,
    title: 'Patrimonio Cultural',
    subtitle: 'Fiestas patronales, música folklórica, costumbres, tradiciones y gastronomía que enriquecen nuestra identidad',
  },
];

function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => setCurrentIndex(index);
  const prev = () => setCurrentIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrentIndex((i) => (i + 1) % SLIDES.length);

  return (
    <section className={styles.hero} aria-label="Carrusel principal">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.title}
          className={index === currentIndex ? styles.slideActive : styles.slide}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={slide.image.src}
            alt={slide.image.alt}
            className={styles.slideImage}
            onError={(e) => { e.currentTarget.src = slide.image.fallback; }}
          />
          <div className={styles.gradientOverlay} />
          <div className={styles.radialOverlay} />

          <div className={styles.content}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>Una Sola Tacarigua</span>
            </div>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <div className={styles.accentLine} />
          </div>
        </div>
      ))}

      <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Slide anterior">
        <ChevronLeft size={20} />
      </button>
      <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Slide siguiente">
        <ChevronRight size={20} />
      </button>

      <div className={styles.dots}>
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === currentIndex ? styles.dotActive : styles.dot}
            onClick={() => goTo(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;