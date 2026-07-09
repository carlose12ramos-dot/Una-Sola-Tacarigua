import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
};

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const ScrollReveal = ({ 
  children, 
  variant = 'up', 
  delay = 0, 
  duration = 0.8,
  className = '',
  amount = 0,
  once = true
}) => {
  const controls = useAnimation();
  const [ref, isVisible] = useScrollAnimation({ 
    threshold: 0.1, 
    triggerOnce: once,
    delay: Math.max(0, delay - amount)
  });

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        transition: {
          duration: duration * 0.8,
          delay: amount,
          ease: smoothEase,
        }
      });
    }
  }, [controls, isVisible, duration, amount]);

  const getInitial = () => {
    const base = {
      opacity: 0,
      filter: 'blur(4px)',
    };
    
    switch (variant) {
      case 'up':
        return { ...base, y: 40, scale: 0.98 };
      case 'down':
        return { ...base, y: -40, scale: 0.98 };
      case 'left':
        return { ...base, x: -50, scale: 0.98 };
      case 'right':
        return { ...base, x: 50, scale: 0.98 };
      case 'scale':
        return { ...base, scale: 0.9, y: 10 };
      case 'fade':
        return { ...base, scale: 1 };
      case 'rotate':
        return { ...base, rotate: -5, scale: 0.95 };
      case 'flip':
        return { ...base, rotateY: -90, scale: 0.9 };
      default:
        return { ...base, y: 40, scale: 0.98 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, delay = 0, index = 0, className = '', style = {} }) => {
  const staggeredDelay = delay + (index * 0.08);
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 25, 
        scale: 0.95,
        filter: 'blur(2px)'
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: 'blur(0px)'
      }}
      transition={{ 
        duration: 0.6, 
        delay: staggeredDelay,
        ease: smoothEase,
        scale: { type: 'spring', stiffness: 150, damping: 15 }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, delay = 0, className = '' }) => {
  const controls = useAnimation();
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    }
  }, [controls, isVisible]);

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MagneticElement = ({ children, radius = 100 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-radius, radius], [10, -10]);
  const rotateY = useTransform(x, [-radius, radius], [-10, 10]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 2);
        y.set((e.clientY - centerY) / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

export const TiltCard = ({ children, scale = 1.05 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [-15, 15]);
  const rotateY = useTransform(x, [-100, 100], [15, -15]);

  return (
    <motion.div
      style={{ 
        x, 
        y, 
        rotateX, 
        rotateY, 
        transformStyle: 'preserve-3d',
        perspective: 1000 
      }}
      whileHover={{ scale }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;