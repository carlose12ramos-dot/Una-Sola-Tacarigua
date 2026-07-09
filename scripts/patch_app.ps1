$content = @'
import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './components/layout/AppLayout';
import Home from './views/Home';

const NosotrosModule = lazy(() => import('./views/NosotrosModule'));
const CultureModule = lazy(() => import('./views/CultureModule'));
const GeografiaModule = lazy(() => import('./views/GeografiaModule'));
const SociedadModule = lazy(() => import('./views/SociedadModule'));
const HistoriaModule = lazy(() => import('./views/HistoriaModule'));
const BibliotecaModule = lazy(() => import('./views/BibliotecaModule'));
const ParticipaModule = lazy(() => import('./views/ParticipaModule'));

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
          Cargando...
        </div>
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<NosotrosModule />} />
            <Route path="/cultura" element={<CultureModule />} />
            <Route path="/geografia" element={<GeografiaModule />} />
            <Route path="/sociedad" element={<SociedadModule />} />
            <Route path="/historia" element={<HistoriaModule />} />
            <Route path="/biblioteca" element={<BibliotecaModule />} />
            <Route path="/participa" element={<ParticipaModule />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </AppLayout>
  );
}

export default App;
'@

[System.IO.File]::WriteAllText(
    (Resolve-Path 'src\App.jsx').Path,
    $content,
    [System.Text.Encoding]::UTF8
)
Write-Host "App.jsx actualizado exitosamente."
