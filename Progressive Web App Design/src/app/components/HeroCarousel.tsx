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
  const [isHovering, setIsHovering] = useState(false);

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
    <div className="relative w-full max-w-7xl mx-auto h-[350px] md:h-[500px] overflow-hidden rounded-2xl" style={{
      boxShadow: '0 20px 60px rgba(29, 53, 87, 0.25), 0 0 0 1px rgba(218, 165, 32, 0.3)',
      border: '2px solid var(--goldenrod)',
      transition: 'var(--transicion-suave)',
      animation: 'fadeIn 1s ease-out'
    }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'scale(1)' : 'scale(1.08)',
            pointerEvents: index === currentIndex ? 'auto' : 'none'
          }}
        >
          {/* Background Image with overlay */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative border overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }} />

          {/* Gradient Overlays - Multi-layer for premium effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(29, 53, 87, 0.95) 0%, rgba(29, 53, 87, 0.4) 50%, transparent 100%)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.4) 100%)'
            }}
          />

          {/* Shimmer effect overlay */}
          {index === currentIndex && (
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden rounded-2xl">
              <div className="absolute top-0 -left-1/3 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" style={{
                animation: 'shimmer 3s infinite'
              }} />
            </div>
          )}

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-10">
            <div
              className="mb-4 px-6 py-2 rounded-full backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(218, 165, 32, 0.9), rgba(184, 134, 11, 0.9))',
                boxShadow: '0 4px 20px rgba(218, 165, 32, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                display: 'inline-block',
                transition: 'var(--transicion-suave)',
                transform: isHovering ? 'scale(1.05)' : 'scale(1)'
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
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.6), 2px 2px 0 rgba(29, 53, 87, 0.8)',
                animation: index === currentIndex ? 'slideInUp 1s ease-out' : 'none',
                fontFamily: 'Georgia, serif',
                fontWeight: '800'
              }}
            >
              {slide.title}
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{
                color: 'var(--cream)',
                opacity: 0.95,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                animation: index === currentIndex ? 'slideInUp 1s ease-out 0.2s both' : 'none',
                fontWeight: '300'
              }}
            >
              {slide.subtitle}
            </p>
            <div
              className="mt-6 h-1.5 w-32 rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))',
                animation: index === currentIndex ? 'slideInUp 1s ease-out 0.4s both' : 'none',
                boxShadow: '0 2px 12px rgba(218, 165, 32, 0.4)'
              }}
            />
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all z-20 group"
        style={{
          background: 'rgba(29, 53, 87, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'var(--goldenrod)',
          border: '2px solid var(--goldenrod)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          transition: 'var(--transicion-suave)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, var(--goldenrod), var(--copper))';
          e.currentTarget.style.color = 'var(--oxford-navy)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.15) rotate(-5deg)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(218, 165, 32, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(29, 53, 87, 0.85)';
          e.currentTarget.style.color = 'var(--goldenrod)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1) rotate(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        }}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all z-20 group"
        style={{
          background: 'rgba(29, 53, 87, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'var(--goldenrod)',
          border: '2px solid var(--goldenrod)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          transition: 'var(--transicion-suave)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, var(--goldenrod), var(--copper))';
          e.currentTarget.style.color = 'var(--oxford-navy)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.15) rotate(5deg)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(218, 165, 32, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(29, 53, 87, 0.85)';
          e.currentTarget.style.color = 'var(--goldenrod)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1) rotate(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        }}
        aria-label="Slide siguiente"
      >
        <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="rounded-full transition-all relative overflow-hidden"
            style={{
              width: index === currentIndex ? '48px' : '14px',
              height: '14px',
              background: index === currentIndex 
                ? 'linear-gradient(90deg, var(--goldenrod), var(--copper))' 
                : 'rgba(244, 241, 222, 0.3)',
              border: '1px solid',
              borderColor: index === currentIndex ? 'var(--goldenrod)' : 'rgba(218, 165, 32, 0.3)',
              transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
              boxShadow: index === currentIndex 
                ? '0 0 15px rgba(218, 165, 32, 0.6), 0 2px 8px rgba(0, 0, 0, 0.3)' 
                : '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'var(--transicion-suave)',
              backdropFilter: 'blur(4px)'
            }}
            aria-label={`Ir a slide ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
