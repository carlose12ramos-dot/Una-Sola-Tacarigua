import React, { useState, useEffect } from 'react';
import styles from './HeroBanner.module.css';

const images = [
  {
    url: '/images/hero-bg.jpg', // Asumiendo que es la foto panorámica principal
    caption: 'Cerro Copey, Venezuela'
  },
  {
    url: '/images/iglesia-tacarigua.jpg', // La foto hermosa de la plaza hexagonal
    caption: 'Iglesia de Tacarigua'
  },
  {
    url: '/images/pueblo-panoramica.jpg', // La otra vista del pueblo
    caption: 'Valle de Parroquia Guevara'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Auto-play del carrusel cada 5 segundos
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Slides Backgrounds */}
      {images.map((img, index) => (
        <div 
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
        >
          {/* Capa 1: Fondo desenfocado para llenar el espacio panorámico */}
          <div 
            className={styles.slideBlurBg} 
            style={{ backgroundImage: `url(${img.url})` }}
          ></div>
          {/* Capa 2: Imagen central completa, sin recortes */}
          <div 
            className={styles.slideImage} 
            style={{ backgroundImage: `url(${img.url})` }}
          ></div>
        </div>
      ))}
      
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>¡Bienvenidos a la Parroquia Guevara!</h1>
      </div>
      
      <div className={styles.bottomContent}>
        <div className={styles.captionContainer}>
          <p className={styles.caption}>{images[currentSlide].caption}</p>
        </div>
        
        {/* Indicadores del Carrusel */}
        <div className={styles.indicators}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
