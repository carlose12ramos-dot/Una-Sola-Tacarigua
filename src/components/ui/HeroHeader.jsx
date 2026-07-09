import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroHeader.module.css';

/**
 * Calcula la configuración óptima del grid para N imágenes,
 * de forma que no queden celdas vacías.
 * Devuelve { cols, rows, gridTemplateColumns, gridTemplateRows, itemStyles[] }
 */
function getCollageGridConfig(count) {
  if (count === 0) return null;

  // Mapas predefinidos para conteos comunes (sin huecos)
  const presets = {
    1:  { cols: 1, rows: 1 },
    2:  { cols: 2, rows: 1 },
    3:  { cols: 3, rows: 1 },
    4:  { cols: 2, rows: 2 },
    5:  { cols: 3, rows: 2 },  // última col de fila 2 ocupa 2 cols
    6:  { cols: 3, rows: 2 },
    7:  { cols: 4, rows: 2 },  // 4+3 → última fila: 3 items en 4 cols
    8:  { cols: 4, rows: 2 },
    9:  { cols: 3, rows: 3 },
    10: { cols: 5, rows: 2 },
  };

  const cfg = presets[count] || { cols: 3, rows: Math.ceil(count / 3) };
  const { cols, rows } = cfg;

  // Para cada imagen, calculamos si necesita "span" extra para cubrir huecos
  const itemStyles = [];
  const lastRowStart = cols * (rows - 1); // índice de inicio de la última fila
  const lastRowCount = count - lastRowStart; // cuántas imágenes quedan en la última fila

  for (let i = 0; i < count; i++) {
    if (rows > 1 && i >= lastRowStart && lastRowCount < cols && lastRowCount > 0) {
      // Distribuir el espacio sobrante entre los items de la última fila
      const spanBase = Math.floor(cols / lastRowCount);
      const extra = cols % lastRowCount;
      const myPosition = i - lastRowStart;
      const span = spanBase + (myPosition < extra ? 1 : 0);
      itemStyles.push({ gridColumn: `span ${span}` });
    } else {
      itemStyles.push({});
    }
  }

  return {
    cols,
    rows,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    itemStyles,
  };
}

/**
 * HeroHeader Component
 * @param {string} title - Título principal
 * @param {string} kicker - Texto pequeño superior o badge
 * @param {string} description - Texto descriptivo debajo del título
 * @param {string} theme - 'primary' | 'sunset' | 'nature' | 'sepia' | 'ocean' | 'vibrant'
 * @param {string} shape - 'waves' | 'geometric' | 'dots' | 'diagonal' | 'minimal' | 'curves'
 * @param {string[]} images - Array de rutas de imágenes para el collage
 */
function HeroHeader({ 
  title, 
  kicker, 
  description, 
  theme = 'primary', 
  shape = 'minimal',
  images = [],
  children
}) {
  const themeClass = styles[`theme-${theme}`] || styles['theme-primary'];
  const shapeClass = styles[`shape-${shape}`] || styles['shape-minimal'];
  const hasCollage = images && images.length > 0;
  const gridConfig = hasCollage ? getCollageGridConfig(images.length) : null;

  return (
    <section className={`${styles.headerSection} ${themeClass} ${!hasCollage ? shapeClass : ''} ${hasCollage ? styles.hasCollage : ''}`}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {kicker && (
            <span className={styles.kickerBadge}>{kicker}</span>
          )}
          
          <h1 className={styles.title}>{title}</h1>
          
          {description && (
            <p className={styles.description}>{description}</p>
          )}

          {children && (
            <div className={styles.heroActions}>
              {children}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Collage de imágenes con grid dinámico sin huecos */}
      {hasCollage && gridConfig ? (
        <>
          <div
            className={styles.collageContainer}
            aria-hidden="true"
            style={{
              gridTemplateColumns: gridConfig.gridTemplateColumns,
              gridTemplateRows: gridConfig.gridTemplateRows,
              display: 'grid',
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className={styles.collageImageWrapper}
                style={gridConfig.itemStyles[index]}
              >
                <img
                  src={img}
                  alt=""
                  className={styles.collageImage}
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
          <div className={styles.collageOverlay} aria-hidden="true"></div>
        </>
      ) : (
        <div className={styles.decorations} aria-hidden="true">
          {shape === 'waves' && (
            <svg className={styles.waveSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          )}
          
          {shape === 'curves' && (
            <div className={styles.curveBottom}></div>
          )}

          {shape === 'geometric' && (
            <>
              <div className={`${styles.geoShape} ${styles.geo1}`}></div>
              <div className={`${styles.geoShape} ${styles.geo2}`}></div>
              <div className={`${styles.geoShape} ${styles.geo3}`}></div>
            </>
          )}

          {shape === 'diagonal' && (
            <div className={styles.diagonalBottom}></div>
          )}
          
          {shape === 'dots' && (
            <div className={styles.dotsPattern}></div>
          )}
        </div>
      )}
    </section>
  );
}

export default HeroHeader;
