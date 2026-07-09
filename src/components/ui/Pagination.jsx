import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={styles.paginationContainer}>
      <button 
        className={styles.navButton} 
        onClick={handlePrev} 
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <div className={styles.pagesWrapper}>
        {pages}
      </div>
      <button 
        className={styles.navButton} 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
