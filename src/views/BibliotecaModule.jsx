import React, { useState, useEffect } from 'react';
import styles from './BibliotecaModule.module.css';
import { bibliotecaMock } from '../data/mockData';

const BibliotecaModule = () => {
  const [items, setItems] = useState([]);
  const [filtro, setFiltro] = useState('Música');

  useEffect(() => {
    setItems(bibliotecaMock);
  }, []);

  return (
    <section className={styles.container} id="biblioteca">
      <div className={styles.header}>
        <h2 className={styles.title}>Biblioteca Multimedia</h2>
      </div>
      
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${filtro === 'Música' ? styles.active : ''}`} onClick={() => setFiltro('Música')}>Música</button>
        <button className={`${styles.tab} ${filtro === 'Libros' ? styles.active : ''}`} onClick={() => setFiltro('Libros')}>Libros (PDF)</button>
        <button className={`${styles.tab} ${filtro === 'Videos' ? styles.active : ''}`} onClick={() => setFiltro('Videos')}>Videos</button>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.id} className={styles.listItem}>
            <img src={item.imagen} alt={item.titulo} className={styles.itemImage} />
            <div className={styles.itemInfo}>
              <div className={styles.itemTitle}>{item.titulo}</div>
              <div className={styles.itemAuthor}>{item.autor}</div>
              <div className={styles.itemCategory}>{item.categoria}</div>
            </div>
            <div className={styles.arrow}>›</div>
          </div>
        ))}
      </div>


    </section>
  );
};

export default BibliotecaModule;
