import React from 'react';
import styles from './CultureItemCard.module.css';

const CultureItemCard = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={item.imagen} alt={item.titulo} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{item.titulo}</h3>
        <p className={styles.description}>{item.descripcion}</p>
      </div>
    </div>
  );
};

export default CultureItemCard;
