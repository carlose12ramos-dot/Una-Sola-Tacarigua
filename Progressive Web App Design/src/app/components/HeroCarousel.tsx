import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden" style={{
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
    }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
            pointerEvents: index === currentIndex ? 'auto' : 'none'
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gradient Overlays - Multi-layer for premium effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(29, 53, 87, 0.95) 0%, rgba(29, 53, 87, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)'
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-10">
            <div
              className="mb-4 px-6 py-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
                boxShadow: '0 4px 16px rgba(218, 165, 32, 0.4)',
                display: 'inline-block'
              }}
            >
              <span style={{
                color: 'var(--oxford-navy)',
                fontSize: '0.875rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Una Sola Tacarigua
              </span>
            </div>
            <h1
              className="mb-4 max-w-4xl"
              style={{
                color: 'var(--cream)',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                animation: index === currentIndex ? 'fadeInUp 0.8s ease-out' : 'none'
              }}
            >
              {slide.title}
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{
                color: 'var(--cream)',
                opacity: 0.95,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                animation: index === currentIndex ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none'
              }}
            >
              {slide.subtitle}
            </p>
            <div
              className="mt-3 h-1 w-24 rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))',
                animation: index === currentIndex ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
              }}
            />
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all z-20"
        style={{
          background: 'rgba(29, 53, 87, 0.8)',
          backdropFilter: 'blur(10px)',
          color: 'var(--goldenrod)',
          border: '2px solid var(--goldenrod)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          transition: 'var(--transicion-suave)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--goldenrod)';
          e.currentTarget.style.color = 'var(--oxford-navy)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(29, 53, 87, 0.8)';
          e.currentTarget.style.color = 'var(--goldenrod)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all z-20"
        style={{
          background: 'rgba(29, 53, 87, 0.8)',
          backdropFilter: 'blur(10px)',
          color: 'var(--goldenrod)',
          border: '2px solid var(--goldenrod)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          transition: 'var(--transicion-suave)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--goldenrod)';
          e.currentTarget.style.color = 'var(--oxford-navy)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(29, 53, 87, 0.8)';
          e.currentTarget.style.color = 'var(--goldenrod)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
        aria-label="Slide siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="rounded-full transition-all"
            style={{
              width: index === currentIndex ? '40px' : '12px',
              height: '12px',
              background: index === currentIndex ? 'linear-gradient(90deg, var(--goldenrod), var(--copper))' : 'rgba(244, 241, 222, 0.4)',
              border: '1px solid',
              borderColor: index === currentIndex ? 'var(--goldenrod)' : 'transparent',
              transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)',
              boxShadow: index === currentIndex ? '0 2px 8px rgba(218, 165, 32, 0.5)' : 'none',
              transition: 'var(--transicion-suave)'
            }}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
