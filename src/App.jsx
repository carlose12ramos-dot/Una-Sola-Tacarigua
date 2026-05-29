import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './views/Home';

const NosotrosModule = lazy(() => import('./views/NosotrosModule'));
const CultureModule = lazy(() => import('./views/CultureModule'));
const GeografiaModule = lazy(() => import('./views/GeografiaModule'));
const SociedadModule = lazy(() => import('./views/SociedadModule'));
const HistoriaModule = lazy(() => import('./views/HistoriaModule'));
const BibliotecaModule = lazy(() => import('./views/BibliotecaModule'));

function App() {
  return (
    <AppLayout>
        <Suspense fallback={
          <div style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'var(--oxford-navy)',
            fontFamily: 'var(--fuente-display)'
          }}>
            Cargando...
          </div>
        }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<NosotrosModule />} />
          <Route path="/cultura" element={<CultureModule />} />
          <Route path="/geografia" element={<GeografiaModule />} />
          <Route path="/sociedad" element={<SociedadModule />} />
          <Route path="/historia" element={<HistoriaModule />} />
          <Route path="/biblioteca" element={<BibliotecaModule />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
