import React from 'react';
import styles from './CultivatorCard.module.css';

const CultivatorCard = ({ cultor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={cultor.imagen} alt={cultor.nombre} />
      </div>
      <h3 className={styles.name}>{cultor.nombre}</h3>
      <span className={styles.discipline}>{cultor.disciplina}</span>
      
      <div className={styles.locationContainer}>
        <span className={styles.flag}>{cultor.bandera}</span>
        <span>{cultor.localidad}</span>
      </div>
    </div>
  );
};

export default CultivatorCard;
