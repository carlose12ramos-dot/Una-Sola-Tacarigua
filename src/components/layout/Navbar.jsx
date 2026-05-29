import { Link, useLocation } from 'react-router-dom';
import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { path: '/', label: 'Inicio' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/cultura', label: 'Cultura' },
  { path: '/historia', label: 'Historia' },
  { path: '/geografia', label: 'Geografía' },
  { path: '/sociedad', label: 'Sociedad' },
  { path: '/biblioteca', label: 'Biblioteca' },
];

function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleInstall = () => {
    alert('Funcionalidad de instalación PWA — en producción activaría el prompt nativo del navegador.');
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <Link to="/" className={styles.logo} onClick={closeMobile}>
            <div className={styles.logoIcon}>
              <span className={styles.logoLetter}>T</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Tacarigua Digital</span>
              <span className={styles.logoSubtitle}>Cultura y Tradición</span>
            </div>
          </Link>

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

          <div className={styles.actions}>
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
