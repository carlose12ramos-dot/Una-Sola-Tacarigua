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
  { label: 'Biblioteca', path: '/biblioteca' }
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Una Sola Tacarigua. Todos los derechos reservados.
        </p>
        <p className={styles.devCredit}>Desarrollado por Carlos Eduardo Ramos González</p>
      </div>
    </footer>
  );
}

export default Footer;
