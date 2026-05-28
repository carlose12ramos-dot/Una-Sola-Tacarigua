import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <h3>Parroquia Guevara - Memoria Geocultural</h3>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Tacarigua Digital. Todos los derechos reservados.
        </p>
        <div className={styles.accentLine}></div>
      </div>
    </footer>
  );
};

export default Footer;
