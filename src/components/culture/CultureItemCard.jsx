import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './CultureItemCard.module.css';

const CultureItemCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className={styles.card} onClick={() => setIsOpen(true)}>
        <div className={styles.imageWrapper}>
          <img src={item.imagen} alt={item.titulo} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{item.titulo}</h3>
          
          <button 
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            Más información
          </button>
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div 
                className={styles.modalContent}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
                
                <div className={styles.modalHeader}>
                  <div className={styles.modalImageWrapper}>
                    <img src={item.imagen} alt={item.titulo} />
                  </div>
                  <h2 className={styles.modalTitle}>{item.titulo}</h2>
                </div>

                <div className={styles.modalBody}>
                  <h4>Información</h4>
                  <p>{item.descripcion}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default CultureItemCard;
