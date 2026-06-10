import { useState, useEffect, useMemo } from 'react';
import { Play, X, Search, BookOpen, Music, Film, Download, ExternalLink, FileText, Image } from 'lucide-react';
import styles from './BibliotecaModule.module.css';
import { bibliotecaMock } from '../data/mockData';
import librosAutoData from '../data/librosAuto.json';
import musicaAutoData from '../data/musicaAuto.json';
import videosAutoData from '../data/videosAuto.json';
import documentosAutoData from '../data/documentosAuto.json';
import imagenesAutoData from '../data/imagenesAuto.json';

// Convierte títulos con guiones (formato URL) en títulos legibles para mostrar
const formatTitle = (titulo) => (titulo || '').replace(/-/g, ' ').trim();

const TABS = ['Música', 'Libros', 'Videos', 'Documentos', 'Imágenes'];

const TAB_FORMATO = {
  Música: 'Música',
  Libros: 'Libros',
  Videos: 'Videos',
  Documentos: 'Documentos',
  'Imágenes': 'Imágenes',
};

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function BibliotecaModule() {
  const [filtro, setFiltro] = useState('Libros'); // Default to Libros as requested by user
  const [selected, setSelected] = useState(null);
  const [activeTrack, setActiveTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga de datos desde la API
  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/biblioteca`);
        if (!response.ok) {
          throw new Error('No se pudo cargar la biblioteca desde la API');
        }
        const data = await response.json();
        
        if (active) {
          if (data && data.length > 0) {
            // Normalizar elementos
            const normalized = data.map(item => ({
              id: item.id,
              titulo: item.titulo,
              autor: item.autor,
              categoria: item.categoria,
              formato: item.formato, // 'Libros', 'Música', 'Videos'
              url: item.url_archivo || null,
              imagen: item.imagen_portada || item.imagen || '/images/plaza-comunitaria-tacarigua.webp',
              extra: item.formato === 'Libros' ? 'Libro PDF' : 'Archivo digital'
            }));
            setItems(normalized);
          } else {
            // Si la base de datos está vacía, usar mock
            useFallbackMock();
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn('Conexión con la API fallida, usando mockData y libros locales:', err.message);
        if (active) {
          useFallbackMock();
          setLoading(false);
        }
      }
    };

    const useFallbackMock = () => {
      // Usamos el listado auto-generado de libros locales si existe y tiene elementos, de lo contrario usamos bibliotecaMock
      const fallbackBooks = (librosAutoData && librosAutoData.length > 0) 
        ? librosAutoData 
        : bibliotecaMock.filter(item => item.formato === 'Libros').map(item => ({
            id: item.id,
            titulo: item.titulo,
            autor: item.autor,
            categoria: item.categoria,
            formato: item.formato,
            url: `/api/libros/${encodeURIComponent(item.titulo)}.pdf`,
            imagen: item.imagen || '/images/plaza-comunitaria-tacarigua.webp',
            extra: item.paginas || 'Libro PDF'
          }));

      // Integrar música local autogenerada si existe, sino mock
      const fallbackMusic = (musicaAutoData && musicaAutoData.length > 0)
        ? musicaAutoData
        : bibliotecaMock.filter(item => item.formato === 'Música').map(item => ({
            id: item.id,
            titulo: item.titulo,
            autor: item.autor,
            categoria: item.categoria,
            formato: item.formato,
            url: item.url || null,
            imagen: null,
            extra: item.duracion || 'Archivo digital'
          }));

      const fallbackVideos = (videosAutoData && videosAutoData.length > 0)
        ? videosAutoData
        : bibliotecaMock.filter(item => item.formato === 'Videos').map(item => ({
            id: item.id,
            titulo: item.titulo,
            autor: item.autor,
            categoria: item.categoria,
            formato: item.formato,
            url: item.url || null,
            imagen: item.imagen || '/images/plaza-comunitaria-tacarigua.webp',
            extra: item.extra || 'Video'
          }));

      const otherMockItems = bibliotecaMock.filter(item => item.formato !== 'Libros' && item.formato !== 'Música' && item.formato !== 'Videos').map(item => ({
        id: item.id,
        titulo: item.titulo,
        autor: item.autor,
        categoria: item.categoria,
        formato: item.formato,
        url: null,
        imagen: item.imagen || '/images/plaza-comunitaria-tacarigua.webp',
        extra: 'Archivo digital'
      }));

      // Documentos históricos locales
      const fallbackDocumentos = (documentosAutoData && documentosAutoData.length > 0)
        ? documentosAutoData
        : [];

      // Imágenes Santos locales
      const fallbackImagenes = (imagenesAutoData && imagenesAutoData.length > 0)
        ? imagenesAutoData
        : [];

      setItems([...fallbackBooks, ...fallbackMusic, ...fallbackVideos, ...fallbackDocumentos, ...fallbackImagenes, ...otherMockItems]);
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const handleSelect = (item) => {
    if (selected?.id === item.id) {
      setSelected(null);
      setActiveTrack(null);
    } else {
      setSelected(item);
      if (item._trackDirect) {
        // Pista individual de resultados de búsqueda
        setActiveTrack({ titulo: item.titulo, url: item.url });
      } else if (item.formato === 'Música' && item.canciones && item.canciones.length > 0) {
        setActiveTrack(item.canciones[0]);
      } else {
        setActiveTrack(null);
      }
    }
  };

  // Filtrado de ítems por Tab activa
  const tabFilteredItems = useMemo(() => {
    return items.filter((item) => item.formato === TAB_FORMATO[filtro]);
  }, [items, filtro]);

  // Obtener categorías únicas según los ítems de la pestaña actual
  const categories = useMemo(() => {
    const cats = new Set(tabFilteredItems.map(item => item.categoria));
    return ['Todas', ...Array.from(cats)];
  }, [tabFilteredItems]);

  // Resetear filtros si cambiamos de Tab
  const handleTabChange = (tab) => {
    setFiltro(tab);
    setSelected(null);
    setActiveTrack(null);
    setSearchQuery('');
    setSelectedCategory('Todas');
  };

  // Filtrado final aplicando búsqueda y categoría
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase();

    // Si estamos en Imágenes y no hay búsqueda/categoría extra,
    // devolvemos una lista ya deduplicada por imagen.
    // (Evita que entradas duplicadas sigan colándose por diferencias sutiles en datos)
    if (filtro === 'Imágenes' && !q.trim() && selectedCategory === 'Todas') {
      const seen = new Set();
      const normalizeImageKey = (item) => {
        const raw = item?.imagen || item?.url_archivo || item?.url || '';
        const str = String(raw || '');
        const filename = str.split('/').pop() || str;
        const cleaned = filename
          .trim()
          .toLowerCase()
          .replace(/\?.*$/, '')
          .replace(/#.*$/, '');
        return cleaned || `${(item?.titulo || '').trim().toLowerCase()}__${(item?.categoria || '').trim().toLowerCase()}`;
      };

      return tabFilteredItems.filter((item) => {
        const key = normalizeImageKey(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }


    // Si estamos en Música y hay una búsqueda activa, expandimos canciones individuales
    if (filtro === 'Música' && q.trim()) {
      const results = [];
      tabFilteredItems.forEach((album) => {
        if (!album.canciones) return;
        album.canciones.forEach((cancion, idx) => {
          if (cancion.titulo.toLowerCase().includes(q)) {
            results.push({
              id: `${album.id}_track_${idx}`,
              titulo: cancion.titulo,
              autor: album.titulo,
              categoria: album.categoria,
              formato: 'Música',
              url: cancion.url,
              imagen: null,
              extra: 'Cancion MP3',
              // Para que el reproductor sepa que es una pista directa
              _trackDirect: true,
            });
          }
        });
      });
      return results;
    }

    // Comportamiento normal: filtrar por título/autor
    const normalFiltered = tabFilteredItems.filter((item) => {
      const titulo = item.titulo || '';
      const autor = item.autor || '';
      const matchSearch =
        !q ||
        titulo.toLowerCase().includes(q) ||
        autor.toLowerCase().includes(q);
      const matchCategory =
        selectedCategory === 'Todas' || item.categoria === selectedCategory;
      return matchSearch && matchCategory;
    });

    // Deduplicación en Imágenes + eliminación de tarjetas sin imagen real
    if (filtro === 'Imágenes') {
      const seen = new Set();
      const PLACEHOLDER_IMAGE = '/images/plaza-comunitaria-tacarigua.webp';

      const hasRealImage = (item) => {
        const img = item?.imagen;
        if (!img) return false;
        const str = String(img).trim();
        if (!str) return false;
        // Excluir placeholder por defecto
        if (str === PLACEHOLDER_IMAGE) return false;
        return true;
      };

      const normalizeImageKey = (item) => {
        const raw = item?.imagen || item?.url_archivo || item?.url || '';
        const str = String(raw || '');
        const filename = str.split('/').pop() || str;
        const cleaned = filename
          .trim()
          .toLowerCase()
          .replace(/\?.*$/, '')
          .replace(/#.*$/, '');

        return cleaned || `${(item?.titulo || '').trim().toLowerCase()}__${(item?.categoria || '').trim().toLowerCase()}`;
      };

      return normalFiltered
        .filter((item) => hasRealImage(item))
        .filter((item) => {
          const key = normalizeImageKey(item);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
    }

    return normalFiltered;
  }, [tabFilteredItems, searchQuery, selectedCategory, filtro]);

  return (
    <section className={styles.container} id="biblioteca">
      <div className={styles.header}>
        <span className={styles.badge}>Memoria Histórica</span>
        <h1 className={styles.title}>Biblioteca Digital</h1>
        <p className={styles.lead}>
          Explora la colección de libros históricos, música tradicional y archivos multimedia de Tacarigua de Margarita.
        </p>
      </div>

      {/* Tabs Principales */}
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={filtro === tab ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(tab)}
          >
            {tab === 'Música' && <Music size={16} style={{ marginRight: '6px' }} />}
            {tab === 'Libros' && <BookOpen size={16} style={{ marginRight: '6px' }} />}
            {tab === 'Videos' && <Film size={16} style={{ marginRight: '6px' }} />}
            {tab === 'Documentos' && <FileText size={16} style={{ marginRight: '6px' }} />}
            {tab === 'Imágenes' && <Image size={16} style={{ marginRight: '6px' }} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder={`Buscar en ${filtro.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={styles.clearSearch}
              aria-label="Limpiar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className={styles.categoryWrapper}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
            aria-label="Filtrar por categoría"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contenido principal (Grid Premium) */}
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner} />
          <p>Cargando elementos de la biblioteca...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={selected?.id === item.id ? styles.cardActive : styles.card}
                onClick={() => handleSelect(item)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(item)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.cardMedia}>
                  {item.formato === 'Música' ? (
                    <div className={styles.musicPlaceholder}>
                      <Music size={48} className={styles.placeholderIcon} />
                    </div>
                  ) : item.formato === 'Videos' ? (
                    <video
                      src={item.url}
                      className={styles.cardImage}
                      preload="metadata"
                      muted
                      playsInline
                      onLoadedMetadata={(e) => { e.target.currentTime = 1; }}
                    />
                  ) : (
                    <img
                      src={item.imagen}
                      alt={item.titulo || item.categoria || "Imagen"}
                      className={styles.cardImage}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/plaza-comunitaria-tacarigua.webp';
                      }}
                    />
                  )}

                </div>

                <div className={styles.cardContent}>
                  <span className={styles.cardCategory}>{item.categoria}</span>
                  <h3 className={styles.cardTitle}>{formatTitle(item.titulo || item.categoria || item.id)}</h3>
                  <p className={styles.cardAuthor}>{item.autor}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardExtra}>{item.extra}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyContainer}>
              <p className={styles.empty}>No se encontraron elementos con los filtros aplicados.</p>
            </div>
          )}
        </div>
      )}

      {/* MODAL PARA VIDEOS */}
      {selected && selected.formato === 'Videos' && (
        <div className={styles.videoModalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.videoModalContent} onClick={e => e.stopPropagation()}>
            <button 
              className={styles.modalCloseBtn} 
              onClick={() => setSelected(null)}
              title="Cerrar Video"
            >
              <X size={24} />
            </button>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{formatTitle(selected.titulo || selected.categoria || selected.id)}</h2>
              <p className={styles.modalAuthor}>{selected.autor}</p>
            </div>
            {selected.url ? (
              <video 
                controls 
                src={selected.url} 
                className={styles.modalVideoPlayer}
                autoPlay
              >
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <span className={styles.noFileText}>Video no disponible</span>
            )}
          </div>
        </div>
      )}

      {/* MODAL/PANEL PARA DOCUMENTOS (igual que LIBROS) */}
      {selected && selected.formato === 'Documentos' && (
        <div className={`${styles.player} ${selected ? styles.playerVisible : ''}`}>
          <div className={styles.playerImage} style={{width: 56, height: 72, borderRadius: 6, overflow: 'hidden'}}>
            <img
              src={selected.imagen}
              alt={selected.titulo || selected.categoria || 'Imagen'}
              className={styles.playerImage}
              onError={(e) => {
                e.target.src = '/images/plaza-comunitaria-tacarigua.webp';
              }}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>
          <div className={styles.playerInfo}>
            <div className={styles.playerTitle}>{formatTitle(selected.titulo || selected.categoria || selected.id)}</div>
            <div className={styles.playerAuthor}>{selected.autor}</div>
            <div className={styles.playerMeta}>
              <span className={styles.playerBadge}>{selected.categoria}</span>
              <span className={styles.playerExtraText}>{selected.extra}</span>
            </div>
          </div>

          <div className={styles.controls}>
            {selected.url ? (
              <>
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                  title="Abrir documento en pestaña nueva"
                >
                  <FileText size={16} />
                  <span className={styles.btnText}>Abrir Documento</span>
                  <ExternalLink size={12} className={styles.btnIconSub} />
                </a>
                <a
                  href={selected.url}
                  download={`${selected.titulo || selected.categoria || selected.id}.pdf`}
                  className={styles.secondaryBtn}
                  title="Descargar PDF"
                >
                  <Download size={16} />
                  <span className={styles.btnText}>Descargar</span>
                </a>
              </>
            ) : (
              <span className={styles.noFileText}>Documento no disponible</span>
            )}

            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => { setSelected(null); setActiveTrack(null); }}
              aria-label="Cerrar detalles"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* MODAL LIGHTBOX PARA IMÁGENES */}
      {selected && selected.formato === 'Imágenes' && (
        <div className={styles.videoModalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.imagenModalContent} onClick={e => e.stopPropagation()}>
            <button 
              className={styles.modalCloseBtn} 
              onClick={() => setSelected(null)}
              title="Cerrar imagen"
            >
              <X size={24} />
            </button>
            <img
              src={selected.imagen}
              alt={selected.titulo || selected.categoria || "Imagen"}
              className={styles.lightboxImage}
              onError={(e) => { e.target.src = '/images/plaza-comunitaria-tacarigua.webp'; }}
            />
            <div className={styles.lightboxCaption}>
              <h3>{selected.titulo || selected.categoria || "Imagen"}</h3>
              <p>{selected.categoria} · {selected.autor || "Archivo Fotográfico Tacarigua"}</p>
              <a
                href={selected.url}
                download
                className={styles.secondaryBtn}
                title="Descargar imagen"
                style={{marginTop: '8px'}}
              >
                <Download size={16} />
                <span className={styles.btnText}>Descargar</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Player Panel (Sólo para Libros y Música) */}
      {selected && selected.formato !== 'Videos' && selected.formato !== 'Documentos' && selected.formato !== 'Imágenes' && ( 
        <div className={`${styles.player} ${selected ? styles.playerVisible : ''}`}>
          {selected.formato === 'Música' ? (
            <div className={styles.playerMusicPlaceholder}>
              <Music size={32} className={styles.placeholderIcon} />
            </div>
          ) : (
            <img
              src={selected.imagen}
              alt={selected.titulo || selected.categoria || "Imagen"}
              className={styles.playerImage}
              onError={(e) => {
                e.target.src = '/images/plaza-comunitaria-tacarigua.webp';
              }}
            />
          )}
          <div className={styles.playerInfo}>
            <div className={styles.playerTitle}>{formatTitle(selected.titulo || selected.categoria || selected.id)}</div>
            <div className={styles.playerAuthor}>{selected.autor}</div>
            <div className={styles.playerMeta}>
              <span className={styles.playerBadge}>{selected.categoria}</span>
              <span className={styles.playerExtraText}>{selected.extra}</span>
            </div>
          </div>

          <div className={styles.controls}>
            {selected.formato === 'Libros' ? (
              <>
                {selected.url ? (
                  <>
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                      title="Leer Libro en pestaña nueva"
                    >
                      <BookOpen size={16} />
                      <span className={styles.btnText}>Leer Libro</span>
                      <ExternalLink size={12} className={styles.btnIconSub} />
                    </a>
                    <a
                      href={selected.url}
                      download={`${selected.titulo || selected.categoria || selected.id}.pdf`}
                      className={styles.secondaryBtn}
                      title="Descargar PDF"
                    >
                      <Download size={16} />
                      <span className={styles.btnText}>Descargar</span>
                    </a>
                  </>
                ) : (
                  <span className={styles.noFileText}>Archivo no disponible</span>
                )}
              </>
            ) : selected.formato === 'Música' ? (
              selected._trackDirect && selected.url ? (
                <div className={styles.audioPlayerWrapper}>
                  <audio 
                    controls 
                    src={selected.url} 
                    className={styles.audioPlayer}
                    autoPlay
                  >
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                  <div className={styles.nowPlayingText}>
                    Reproduciendo: {selected.titulo || selected.categoria || selected.id}
                  </div>
                </div>
              ) : selected.canciones && selected.canciones.length > 0 ? (
                <div className={styles.trackListContainer}>
                  <div className={styles.audioPlayerWrapper}>
                    <audio 
                      controls 
                      src={activeTrack ? activeTrack.url : selected.canciones[0].url} 
                      className={styles.audioPlayer}
                      autoPlay={activeTrack !== null}
                    >
                      Tu navegador no soporta el elemento de audio.
                    </audio>
                    <div className={styles.nowPlayingText}>
                      Reproduciendo: {activeTrack ? activeTrack.titulo : selected.canciones[0].titulo}
                    </div>
                  </div>
                  <div className={styles.trackList}>
                    {selected.canciones.map((cancion, idx) => (
                      <button 
                        key={idx} 
                        className={activeTrack?.url === cancion.url ? styles.trackItemActive : styles.trackItem}
                        onClick={() => setActiveTrack(cancion)}
                        type="button"
                      >
                        <span className={styles.trackNumber}>{idx + 1}</span>
                        <span className={styles.trackTitle}>{cancion.titulo}</span>
                        {activeTrack?.url === cancion.url && <Play size={14} className={styles.playingIcon} />}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <span className={styles.noFileText}>Este álbum no tiene pistas disponibles.</span>
              )
            ) : null}

            {selected.formato === 'Música' && selected.downloadUrl && (
              <a 
                href={selected.downloadUrl}
                download
                className={styles.secondaryBtn}
                title="Descargar Álbum Completo (ZIP)"
              >
                <Download size={16} />
                <span className={styles.btnText}>Descargar ZIP</span>
              </a>
            )}

            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => { setSelected(null); setActiveTrack(null); }}
              aria-label="Cerrar detalles"
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






