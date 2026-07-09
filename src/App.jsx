import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AppLayout from './components/layout/AppLayout';
import Home from './views/Home';

const pageTransition = {
  initial: { opacity: 0, y: 20, scale: 0.99 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: 'beforeChildren',
      staggerChildren: 0.05
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.99,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const NosotrosModule = lazy(() => import('./views/NosotrosModule'));
const CultureModule = lazy(() => import('./views/CultureModule'));
const GeografiaModule = lazy(() => import('./views/GeografiaModule'));
const SociedadModule = lazy(() => import('./views/SociedadModule'));
const HistoriaModule = lazy(() => import('./views/HistoriaModule'));
const BibliotecaModule = lazy(() => import('./views/BibliotecaModule'));
const CalendarioModule = lazy(() => import('./views/CalendarioModule'));

function App() {
  const location = useLocation();

  return (
    <AppLayout>
      <Suspense fallback={
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'var(--oxford-navy)',
          fontFamily: 'var(--fuente-display)'
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            Cargando...
          </motion.div>
        </div>
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={
              <motion.div {...pageTransition}>
                <NosotrosModule />
              </motion.div>
            } />
            <Route path="/cultura" element={
              <motion.div {...pageTransition}>
                <CultureModule />
              </motion.div>
            } />
            <Route path="/geografia" element={
              <motion.div {...pageTransition}>
                <GeografiaModule />
              </motion.div>
            } />
            <Route path="/sociedad" element={
              <motion.div {...pageTransition}>
                <SociedadModule />
              </motion.div>
            } />
            <Route path="/historia" element={
              <motion.div {...pageTransition}>
                <HistoriaModule />
              </motion.div>
            } />
            <Route path="/biblioteca" element={
              <motion.div {...pageTransition}>
                <BibliotecaModule />
              </motion.div>
            } />
            <Route path="/calendario" element={
              <motion.div {...pageTransition}>
                <CalendarioModule />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </AppLayout>
  );
}

export default App;