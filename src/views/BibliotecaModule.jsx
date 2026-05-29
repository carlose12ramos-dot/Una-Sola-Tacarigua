import { useState, useMemo } from 'react';
import { ChevronRight, Play, X } from 'lucide-react';
import styles from './BibliotecaModule.module.css';
import { bibliotecaMock } from '../data/mockData';

const TABS = ['Música', 'Libros', 'Videos'];

const TAB_FORMATO = {
  Música: 'Música',
  Libros: 'Libros',
  Videos: 'Videos',
};

function BibliotecaModule() {
  const [filtro, setFiltro] = useState('Música');
  const [selected, setSelected] = useState(null);

  const items = useMemo(
    () => bibliotecaMock.filter((item) => item.formato === TAB_FORMATO[filtro]),
    [filtro]
  );

  const handleSelect = (item) => {
    setSelected(selected?.id === item.id ? null : item);
  };

  return (
    <section className={styles.container} id="biblioteca">
      <header className={styles.header}>
        <span className={styles.badge}>Archivo Digital</span>
        <h1 className={styles.title}>Biblioteca Multimedia</h1>
        <p className={styles.lead}>
          Música tradicional, libros digitales y videos del patrimonio de la Parroquia Guevara.
        </p>
      </header>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={filtro === tab ? styles.tabActive : styles.tab}
            onClick={() => { setFiltro(tab); setSelected(null); }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className={selected?.id === item.id ? styles.listItemActive : styles.listItem}
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(item)}
              role="button"
              tabIndex={0}
            >
              <img src={item.imagen} alt={item.titulo} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <div className={styles.itemTitle}>{item.titulo}</div>
                <div className={styles.itemAuthor}>{item.autor}</div>
                <div className={styles.itemMeta}>
                  <span className={styles.itemCategory}>{item.categoria}</span>
                  {(item.duracion || item.paginas) && (
                    <span className={styles.itemDuration}>
                      {item.duracion || item.paginas}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight size={22} className={styles.arrow} />
            </div>
          ))
        ) : (
          <p className={styles.empty}>No hay elementos en esta categoría.</p>
        )}
      </div>

      {selected && (
        <div className={styles.player}>
          <img src={selected.imagen} alt={selected.titulo} className={styles.playerImage} />
          <div className={styles.playerInfo}>
            <div className={styles.playerTitle}>{selected.titulo}</div>
            <div className={styles.playerAuthor}>{selected.autor}</div>
          </div>
          <div className={styles.controls}>
            <button type="button" className={styles.playBtn} aria-label="Reproducir">
              <Play size={18} fill="currentColor" />
            </button>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelected(null)}
              aria-label="Cerrar reproductor"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default BibliotecaModule;
