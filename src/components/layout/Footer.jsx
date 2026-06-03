import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { label: 'Inicio', path: '/' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Cultura', path: '/cultura' },
  { label: 'Historia', path: '/historia' },
  { label: 'Geografía', path: '/geografia' },
  { label: 'Sociedad', path: '/sociedad' },
  { label: 'Biblioteca', path: '/biblioteca' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandHeader}>
              <div className={styles.brandIcon}>
                <span className={styles.brandLetter}>T</span>
              </div>
              <h3 className={styles.brandTitle}>Una Sola Tacarigua</h3>
            </div>
            <p className={styles.brandDesc}>
              Tu portal digital para descubrir la rica cultura, historia y servicios de la Parroquia Guevara en la Isla de Margarita.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Share2 size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Sitio web">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Enlaces Rápidos</h4>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Contacto</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>Parroquia Guevara, Isla de Margarita, Venezuela</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <span>+58 (295) 000-0000</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <span>info@tacariguadigital.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Una Sola Tacarigua. Todos los derechos reservados.
            </p>
            <p className={styles.devCredit}>Desarrollado por Carlos Eduardo Ramos González</p>
          </div>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Privacidad</a>
            <a href="#" className={styles.legalLink}>Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
