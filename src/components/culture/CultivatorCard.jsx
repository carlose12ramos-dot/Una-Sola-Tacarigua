import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';
import styles from './CultivatorCard.module.css';
import { generateCultorPDF } from '../../utils/pdfGenerator';

const CultivatorCard = ({ cultor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Normalize description into an array of paragraphs/pages
  let descPages = [];
  if (Array.isArray(cultor.descripcion)) {
    descPages = cultor.descripcion;
  } else if (typeof cultor.descripcion === 'string') {
    descPages = [cultor.descripcion];
  } else {
    descPages = ["Información no disponible."];
  }

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentPage < descPages.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    setIsImageExpanded(true);
  };

  return (
    <>
      <div className={styles.card} onClick={() => setIsOpen(true)}>
        <div className={styles.imageWrapper} onClick={handleImageClick}>
          <img
            src={cultor.imagen}
            alt={cultor.nombre}
            onError={e => { e.target.onerror = null; e.target.src = '/images/cultores/cultor_generico.png'; }}
          />
          <div className={styles.zoomOverlay}>
            <ZoomIn size={24} color="#fff" />
          </div>
        </div>
        <h3 className={styles.name}>{cultor.nombre}</h3>
        <span className={styles.discipline}>{cultor.disciplina}</span>
        
        <button
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
            setCurrentPage(0);
          }}
        >
          Biografía
        </button>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsOpen(false); setCurrentPage(0); }}
            >
              <motion.div 
                className={styles.modalContent}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <div className={styles.modalActions}>
                  <button 
                    className={styles.downloadBtn} 
                    onClick={() => generateCultorPDF(cultor)}
                    title="Descargar Biografía en PDF"
                  >
                    <Download size={24} />
                  </button>
                  <button className={styles.closeBtn} onClick={() => { setIsOpen(false); setCurrentPage(0); }}>
                    <X size={24} />
                  </button>
                </div>
                
                <div className={styles.modalHeader}>
                  <div className={styles.modalImageWrapper} onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                    <img
                      src={cultor.imagen}
                      alt={cultor.nombre}
                      onError={e => { e.target.onerror = null; e.target.src = '/images/cultores/cultor_generico.png'; }}
                    />
                    <div className={styles.zoomOverlaySm}>
                      <ZoomIn size={20} color="#fff" />
                    </div>
                  </div>
                  <div>
                    <h2 className={styles.modalName}>{cultor.nombre}</h2>
                    <p className={styles.modalDiscipline}>{cultor.disciplina}</p>
                    <p className={styles.modalYears}>{cultor.anios}</p>
                  </div>
                </div>

                <div className={styles.modalBody}>
                  <h4>Biografía / Información</h4>
                  
                  <div className={styles.bioTextContainer}>
                    {descPages[currentPage].split('\n').map((paragraph, idx) => (
                      paragraph.trim() && <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {descPages.length > 1 && (
                    <div className={styles.paginationControls}>
                      <button 
                        onClick={handlePrev} 
                        disabled={currentPage === 0}
                        className={styles.pageBtn}
                      >
                        <ChevronLeft size={20} /> Anterior
                      </button>
                      <span className={styles.pageIndicator}>
                        Página {currentPage + 1} de {descPages.length}
                      </span>
                      <button 
                        onClick={handleNext} 
                        disabled={currentPage === descPages.length - 1}
                        className={styles.pageBtn}
                      >
                        Siguiente <ChevronRight size={20} />
                      </button>
                    </div>
                  )}

                  {cultor.especialidad && (
                    <p className={styles.specialty}><strong>Especialidad:</strong> {cultor.especialidad}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {isImageExpanded && (
            <motion.div 
              className={styles.fullScreenImageOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); setIsImageExpanded(false); }}
            >
              <button className={styles.closeFullscreenBtn} onClick={(e) => { e.stopPropagation(); setIsImageExpanded(false); }}>
                <X size={32} color="#fff" />
              </button>
              <motion.img 
                src={cultor.imagen}
                alt={cultor.nombre}
                className={styles.fullScreenImage}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                onError={e => { e.target.onerror = null; e.target.src = '/images/cultores/cultor_generico.png'; }}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default CultivatorCard;
