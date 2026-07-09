import { useEffect, useRef, useState, useCallback } from 'react';

const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    useThrottle = true,
  } = options;

  const throttle = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          func(...args);
          timeout = null;
        }, wait);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) setHasAnimated(true);
          }
          if (triggerOnce && hasAnimated && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce && !hasAnimated) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  return [ref, isVisible];
};

// Hook for scroll-triggered sequential animations
export const useStaggerAnimation = (itemCount = 0, options = {}) => {
  const [ref, isVisible] = useScrollAnimation(options);
  const [visibleItems, setVisibleItems] = useState([]);
  
  useEffect(() => {
    if (isVisible && itemCount > 0) {
      const timers = [];
      for (let i = 0; i < itemCount; i++) {
        timers.push(
          setTimeout(() => {
            setVisibleItems(prev => [...prev, i]);
          }, i * 50)
        );
      }
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [isVisible, itemCount]);

  return { ref, visibleItems, isVisible };
};

// Hook for scroll progress
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setProgress(scrolled);
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};

// Hook for parallax effect
export const useParallaxOffset = (speed = 0.1) => {
  const y = typeof window !== 'undefined' ? window.scrollY * speed : 0;
  return y;
};

export default useScrollAnimation;