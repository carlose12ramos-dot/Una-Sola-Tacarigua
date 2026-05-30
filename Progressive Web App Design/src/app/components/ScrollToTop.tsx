import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full transition-all shadow-lg"
      style={{
        background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
        color: 'var(--oxford-navy)',
        border: '2px solid white',
        boxShadow: '0 6px 24px rgba(218, 165, 32, 0.5)',
        transition: 'var(--transicion-suave)',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(218, 165, 32, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(218, 165, 32, 0.5)';
      }}
      aria-label="Volver arriba"
    >
      <ArrowUp size={24} />
    </button>
  );
}
