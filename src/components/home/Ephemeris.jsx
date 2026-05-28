import React, { useState, useEffect } from 'react';
import styles from './Ephemeris.module.css';
import { efemeridesMock } from '../../data/mockData';

const Ephemeris = () => {
  const [efemerides, setEfemerides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de datos desde una API local (Offline-First preparation)
    const fetchEfemerides = () => {
      setTimeout(() => {
        setEfemerides(efemeridesMock);
        setLoading(false);
      }, 500); // 500ms de retraso simulado
    };

    fetchEfemerides();
  }, []);

  return (
    <section className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h2>Efemérides Locales del Día</h2>
          <div className="divider" style={{ margin: '1rem auto', width: '100px' }}></div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Cargando memoria histórica...</p>
        ) : (
          <div className={styles.grid}>
            {efemerides.map((item) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.date}>{item.dia} de {item.mes}</div>
                <h3 className={styles.cardTitle}>{item.titulo}</h3>
                <p className={styles.description}>{item.descripcion}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Ephemeris;
