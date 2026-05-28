import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          Tacarigua <span>Digital</span>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="/">Inicio</a></li>
          <li><a href="/geografia.html">Geografía</a></li>
          <li><a href="/historia.html">Historia</a></li>
          <li><a href="/cultura.html">Cultura</a></li>
          <li className={styles.dropdown}>
            <span className={styles.dropdownLink}>Sociedad ▾</span>
            <ul className={styles.dropdownMenu}>
              <li><a href="/educacion.html">Educación</a></li>
              <li><a href="/sanidad.html">Sanidad</a></li>
              <li><a href="/deportes.html">Deportes</a></li>
            </ul>
          </li>
          <li><a href="/biblioteca.html">Biblioteca</a></li>
          <li><a href="/nosotros.html">Sobre Nosotros</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
