import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroBanner.module.css';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1576469197040-d06a796697cd?w=1200&h=600&fit=crop',
    title: '¡Bienvenidos a la Parroquia Guevara!',
    subtitle: 'Descubre la riqueza cultural e histórica de Tacarigua en la Isla de Margarita',
  },
  {
    image: 'https://images.unsplash.com/photo-1643238974302-381f0fbd8211?w=1200&h=600&fit=crop',
    title: 'Patrimonio Histórico',
    subtitle: 'Explora nuestras tradiciones y arquitectura colonial',
  },
  {
    image: 'https://images.unsplash.com/photo-1585607344893-43a4bd91169a?w=1200&h=600&fit=crop',
    title: 'Cultura Viva',
    subtitle: 'Celebramos nuestras festividades y expresiones artísticas',
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
          <img src={slide.image} alt={slide.title} className={styles.slideImage} />
          <div className={styles.gradientOverlay} />
          <div className={styles.radialOverlay} />

          <div className={styles.content}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>Tacarigua Digital</span>
            </div>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <div className={styles.accentLine} />
          </div>
        </div>
      ))}

      <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Slide anterior">
        <ChevronLeft size={24} />
      </button>
      <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Slide siguiente">
        <ChevronRight size={24} />
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
