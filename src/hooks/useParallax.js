import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

const useParallax = (speed = 0.1) => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      controls.start({
        y: scrollY * speed,
        transition: { type: 'spring', stiffness: 100, damping: 30 }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, speed]);

  return controls;
};

export default useParallax;