import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Download, Menu, X, Bell, CalendarDays } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { calendarData } from '../../data/calendarData';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { path: '/calendario', label: 'Calendario' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/cultura', label: 'Cultura' },
  { path: '/historia', label: 'Historia' },
  { label: 'Geografía', path: '/geografia' },
  { label: 'Sociedad', path: '/sociedad' },
  { label: 'Biblioteca', path: '/biblioteca' },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef(null);

  const today = new Date();
  const todayEvents = calendarData.filter(e => e.mes === today.getMonth() + 1 && e.dia === today.getDate());

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handlePromptReady = () => {
      setDeferredPrompt(window.deferredPrompt);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-prompt-ready', handlePromptReady);

    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-prompt-ready', handlePromptReady);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('La aplicación ya está instalada o el navegador no soporta esta función.');
    }
  };

  const closeMobile = () => setMobileMenuOpen(false);



  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <Link to="/" className={styles.logo} onClick={closeMobile} title="Inicio">
            <div className={styles.logoIcon} aria-hidden="true" />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Una Sola Tacarigua</span>
              <span className={styles.logoSubtitle}>Cultura y Tradición</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={isActive(link.path) ? styles.navLinkActive : styles.navLink}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <div ref={bellRef} style={{ position: 'relative' }}>
              <AnimatePresence>
                {bellOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{
                      position: 'absolute', top: '100%', right: 0,
                      marginTop: '0.5rem',
                      width: '340px',
                      background: 'rgba(13,27,42,0.97)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(212,160,69,0.3)',
                      borderRadius: '1rem',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      zIndex: 1000,
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: -6, right: '1.5rem',
                      width: 0, height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderBottom: '6px solid rgba(13,27,42,0.97)',
                    }} />
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Bell size={16} color='#d4a045' />
                        <span style={{ color: '#d4a045', fontWeight: 700, fontSize: '0.9rem' }}>Efemérides de Hoy</span>
                      </div>
                      <button onClick={() => setBellOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>
                        <X size={16} />
                      </button>
                    </div>
                    <div style={{ padding: '0.75rem', maxHeight: '320px', overflowY: 'auto' }}>
                      {todayEvents.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {todayEvents.map((evt) => {
                            const tipoColors = {
                              natalicio: '#2e8b57',
                              historia: '#8b5a2b',
                              religiosa: '#7c3aed',
                              cultural: '#d97706',
                              duelo: '#374151'
                            };
                            const color = tipoColors[evt.tipo] || '#d4a045';
                            return (
                              <div key={evt.id} style={{
                                background: 'rgba(255,255,255,0.04)',
                                borderRadius: '0.75rem',
                                padding: '0.75rem',
                                borderLeft: `3px solid ${color}`,
                              }}>
                                <div style={{ fontSize: '0.78rem', color: color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>{evt.tipo.charAt(0).toUpperCase() + evt.tipo.slice(1)}{evt.anio ? ` · ${evt.anio}` : ''}</div>
                                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.4 }}>{evt.titulo}</div>
                                {evt.descripcion && (
                                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', lineHeight: 1.4, marginTop: '0.25rem' }}>{evt.descripcion}</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>
                          <CalendarDays size={28} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
                          <p>No hay efemérides para hoy</p>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button
                        onClick={() => { navigate('/calendario'); setBellOpen(false); }}
                        style={{
                          width: '100%', padding: '0.5rem', borderRadius: '0.5rem',
                          background: 'linear-gradient(135deg, #d4a045, #b8860b)',
                          border: 'none', cursor: 'pointer', fontWeight: 600,
                          fontSize: '0.8rem', color: '#0d1b2a',
                        }}
                      >
                        Ver Calendario Completo
                      </button>
                      <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
                        {today.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                onClick={() => setBellOpen(prev => !prev)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  width: 44, height: 44, borderRadius: '0.75rem',
                  background: 'rgba(244,241,222,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--goldenrod)',
                  position: 'relative',
                }}
                aria-label="Ir al Calendario"
                title="Ir al Calendario"
              >
                <Bell size={18} />
                {todayEvents.length > 0 && (
                  <span style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#ef4444',
                    border: '2px solid #0d1b2a',
                  }} />
                )}
              </motion.button>
            </div>

            <button
              type="button"
              onClick={handleInstall}
              className={styles.installBtn}
              aria-label="Instalar aplicación"
            >
              <Download size={18} />
              <span>Instalar</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={mobileMenuOpen ? styles.menuToggleOpen : styles.menuToggle}
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobile}
                className={isActive(link.path) ? styles.mobileLinkActive : styles.mobileLink}
              >
                {link.label}
              </Link>
            ))}

            {/* Install en mobile */}
            <button
              type="button"
              onClick={handleInstall}
              className={styles.mobileInstallBtn}
              aria-label="Instalar aplicación"
            >
              <Download size={18} />
              <span>Instalar App</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
