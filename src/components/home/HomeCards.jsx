import React, { useState, useEffect } from 'react';
import styles from './HomeCards.module.css';
import { homeCardsMock } from '../../data/mockData';

const HomeCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Simular carga Offline-First
    setCards(homeCardsMock);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {cards.map((card) => {
          const isPrimary = card.tipo === 'memoria';
          return (
            <article 
              key={card.id} 
              className={`${styles.card} ${isPrimary ? styles.cardPrimary : styles.cardWhite}`}
            >
              {isPrimary && card.imagen && (
                <div className={styles.imageWrapper}>
                  <img src={card.imagen} alt={card.titulo} />
                </div>
              )}
              <div className={styles.contentWrapper}>
                <h3 className={styles.cardTitle}>{card.titulo}</h3>
                <p className={styles.description}>{card.descripcion}</p>
                <button className={styles.btn}>Ver Más</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HomeCards;
