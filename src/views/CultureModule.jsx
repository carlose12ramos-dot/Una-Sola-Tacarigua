import React, { useState, useEffect } from 'react';
import CultivatorCard from '../components/culture/CultivatorCard';
import styles from './CultureModule.module.css';
import { cultoresMock } from '../data/mockData';

const CultureModule = () => {
  const [cultores, setCultores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de conexión Offline-First
    const fetchCultores = () => {
      setTimeout(() => {
        setCultores(cultoresMock);
        setLoading(false);
      }, 600);
    };

    fetchCultores();
  }, []);

  return (
    <section className={styles.container} id="cultura">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Directorio de Cultores</h2>
          <div className="divider" style={{ margin: '1rem auto', width: '150px' }}></div>
          <p className={styles.description}>
            Conoce a los hombres y mujeres que mantienen viva la llama de nuestras tradiciones en la Parroquia Guevara.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Cargando directorio...</p>
        ) : (
          <div className={styles.grid}>
            {cultores.map(cultor => (
              <CultivatorCard key={cultor.id} cultor={cultor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CultureModule;
