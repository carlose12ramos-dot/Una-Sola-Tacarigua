import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, X, Download } from 'lucide-react';
import CultivatorCard from '../components/culture/CultivatorCard';
import CultureItemCard from '../components/culture/CultureItemCard';
import HeroHeader from '../components/ui/HeroHeader';
import Pagination from '../components/ui/Pagination';
import ScrollReveal, { StaggerItem } from '../components/ui/ScrollReveal';
import styles from './CultureModule.module.css';
import { generateAllCultoresPDF } from '../utils/pdfGenerator';
import { getImageSrc, getImageAlt } from '../data/images';
import { cultoresMock, costumbresMock, gastronomiaMock } from '../data/mockData';

const MAIN_TABS = ['Cultores', 'Costumbres y Tradiciones', 'Gastronomía', 'Centros Culturales'];
const CULTORES_SUBTABS = ['Todos', 'Músicos', 'Artesanos', 'Personajes'];

const centrosCulturales = [
  {
    id: 'moculta',
    titulo: 'Movimiento Cultural Tacarigua Adentro (MOCULTA)',
    subtitulo: 'Fundado el 19 de abril de 1985',
    imagen: '/images/Moculta.png',
    imagenLogo: '/images/logomoculta.png',
    resumen: 'Salvaguarda de la identidad, cotidianidad, deporte y expresiones folclóricas de San Sebastián de Tacarigua.',
    modalContenido: (
      <>
        <p><strong>Fecha de fundación:</strong> 19 de abril de 1985</p>
        <p><strong>Lugar:</strong> Sector San Sebastián de Tacarigua, Municipio Gómez, Isla de Margarita</p>
        <p><strong>Sede física:</strong> Terrenos donados por la familia de Antonia Quijada de Cova</p>
        <p><strong>Misión:</strong> Salvaguarda de la identidad, cotidianidad, deporte y expresiones folclóricas del gentilicio "sebastino"</p>

        <h4 className={styles.modalSubTitle}>1. Origen y Contexto de la Fundación</h4>
        <p>
          El Movimiento Cultural Tacarigua Adentro (MOCULTA) nació formalmente la noche del 19 de abril de 1985. La asamblea constitutiva se llevó a cabo en la residencia del vecino Jesús Linares, ubicada en el sector San Sebastián.
        </p>
        <p>
          La organización no surgió de forma aislada, sino como una respuesta comunitaria a una necesidad institucional: el Comité Organizador de las Fiestas de San Sebastián requería de un brazo popular, operativo y vecinal de carácter permanente. Este apéndice civil se diseñó específicamente para coordinar y ejecutar con mayor eficiencia los eventos culturales, recreativos y deportivos de las festividades patronales del pueblo.
        </p>

        <h4 className={styles.modalSubTitle}>2. Fundadores y Primera Junta Directiva</h4>
        <p>La iniciativa fue respaldada, firmada y ejecutada por un grupo de 17 cultores y vecinos fundadores de la localidad:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', margin: '0.8rem 0', fontSize: '0.9rem' }}>
          <div>• Hilario González</div>
          <div>• Jesús Linares (anfitrión)</div>
          <div>• Erasmo Ramos</div>
          <div>• Saturnino González</div>
          <div>• Francisco Ramos</div>
          <div>• Bartolo Alfonzo</div>
          <div>• Andrés Rivas</div>
          <div>• Hernán Malaver</div>
          <div>• José Alfonzo</div>
          <div>• Modesto Rivas</div>
          <div>• Luis Quijada</div>
          <div>• José Gregorio Alfonzo</div>
          <div>• Yuraima Da Silva</div>
          <div>• Diomira Campos</div>
          <div>• Victoria Rojas</div>
          <div>• Carmen González</div>
          <div>• Gregoria Montaño</div>
        </div>
        <p>Para la operatividad inicial del movimiento, se estructuró la primera junta de coordinadores, la cual asumió las riendas de la institución:</p>
        <ul>
          <li><strong>Director General:</strong> Bartolo Alfonzo Moya</li>
          <li><strong>Director de Investigaciones:</strong> Hernán José Malaver</li>
          <li><strong>Director de Promoción:</strong> José Antonio Lista</li>
        </ul>

        <h4 className={styles.modalSubTitle}>3. Evolución y Consolidación Institucional</h4>
        <p>
          Rápidamente, MOCULTA rebasó sus objetivos iniciales de trabajar únicamente durante las fiestas de San Sebastián. Se transformó en un movimiento autónomo activo durante todo el año, dedicado a frenar la pérdida de identidad local frente a corrientes culturales foráneas.
        </p>
        <p>A lo largo de las décadas, la conducción histórica del movimiento ha recaído sobre directores de comprobada trayectoria comunitaria, entre quienes destacan:</p>
        <ul>
          <li>Mario Gabriel Alfonzo</li>
          <li>Bubo Malaver</li>
          <li>Petra González Malaver</li>
          <li>Juan González</li>
        </ul>

        <h4 className={styles.modalSubTitle}>4. Hitos y Proyección Artística Regional</h4>
        <p>MOCULTA diversificó sus esfuerzos para involucrar activamente a la juventud del municipio, logrando dos grandes proyectos que marcaron la historia cultural de la Isla de Margarita:</p>
        <ul>
          <li><strong>El Grupo de Teatro "Guaitoroco":</strong> Fundado el 15 de abril de 1986 bajo la dirección artística de Hernán Malaver y Mario Alfonzo. Esta agrupación se convirtió en un pilar tradicional de la región al escenificar en vivo la Pasión y Muerte de Jesús durante la Semana Santa. El proyecto llegó a movilizar elencos masivos de hasta 100 jóvenes locales y se mantuvo en escena de forma ininterrumpida por una década.</li>
          <li><strong>Escuela Tradicional de Cantos "Hernán Malaver":</strong> Espacio creado para preservar y enseñar las estructuras musicales tradicionales margariteñas, tales como el galerón, las parrandas y los cantos de faena tradicionales, garantizando el relevo generacional de los cultores locales.</li>
        </ul>

        <h4 className={styles.modalSubTitle}>5. Reconocimiento y Legado Actual</h4>
        <p>
          El impacto social de MOCULTA ha sido validado formalmente por los poderes públicos del estado Nueva Esparta. Al cumplir sus aniversarios más destacados, la Cámara Municipal del Municipio Gómez ha trasladado sus funciones para realizar sesiones especiales solemnes dentro de la sede propia de la institución para condecorar a sus miembros.
        </p>
        <p>
          Hoy en día, el movimiento trabaja en estrecha alianza con centros de investigación de la memoria regional, tales como la Fundación Cheguaco y el equipo del Proyecto Tacarigua Histórica, manteniéndose como un modelo de gestión cultural comunitaria autogestionada en el oriente venezolano.
        </p>
      </>
    )
  },
  {
    id: 'casa_cultura',
    titulo: 'Casa de la Cultura "Poeta Pedro Rivero Navarro"',
    subtitulo: 'Centro Artístico de Tacarigua',
    imagen: '/images/CDCPPRN.jpeg',
    imagenLogo: '/images/cdct.jpg',
    resumen: 'Complejo cultural dotado de concha acústica y sede oficial del Comité de Desarrollo Cultural.',
    modalContenido: (
      <>
        <p><strong>Ubicación:</strong> Tacarigua, Municipio Gómez, Isla de Margarita, Estado Nueva Esparta, Venezuela</p>
        <p><strong>Institución Gestora:</strong> Comité de Desarrollo Cultural de Tacarigua (C.D.C.)</p>
        <p><strong>Eje Central:</strong> Preservación del patrimonio, las artes plásticas, el galerón y las letras neoespartanas</p>

        <h4 className={styles.modalSubTitle}>1. Origen y Contexto (Década de 1960 y 1970)</h4>
        <p>
          La creación de la Casa de la Cultura "Poeta Pedro Rivero Navarro" está ligada a la fundación del Comité de Desarrollo Cultural de Tacarigua (C.D.C.) en agosto de 1968. El C.D.C. nació como un movimiento vecinal para canalizar la profunda vocación artística, literaria y musical de la población tacarigüera.
        </p>
        <p>
          Hacia principios de la década de 1970, la dirección del C.D.C. y el liderazgo del Ingeniero Pedro Rivero Núñez —quien se desempeñaba simultáneamente como director de Obras Públicas del Estado Nueva Esparta— impulsaron el diseño y edificación de un complejo físico permanente que sirviera como epicentro para el desarrollo de las artes en la región. Fue así como se inauguró la sede oficial, equipada no solo con salones de reuniones, sino también con una concha acústica y una cancha deportiva para uso comunitario.
        </p>

        <h4 className={styles.modalSubTitle}>2. Epónimo: ¿Quién fue Pedro Rivero Navarro?</h4>
        <p>
          La institución fue bautizada en honor al célebre poeta, periodista y diplomático margariteño Pedro Rivero Navarro, nacido en Porlamar en 1893 y fallecido trágicamente en Madrid, España, el 7 de enero de 1959.
        </p>
        <p>
          Rivero Navarro fue una de las plumas más refinadas del oriente venezolano, fundador del periódico Génesis (1909) y autor de obras fundamentales de la poesía marina como El Mar de las Perlas y El Pescador de Ánforas. Su vinculación espiritual con Tacarigua y su legado intelectual hicieron que el pueblo adoptara su nombre como símbolo de su faro cultural.
        </p>

        <h4 className={styles.modalSubTitle}>3. Cronología de Directores Históricos</h4>
        <p>A lo largo de sus más de 50 años de trayectoria institucional, la Casa de la Cultura ha mantenido sus puertas abiertas bajo la guía de destacados defensores del folclore insular:</p>
        <ul>
          <li>José Rosa Acosta (1973–1974)</li>
          <li>Juan Morales Pérez (1974–1979)</li>
          <li><strong>Pablo Romero Millán (1979–1993):</strong> Bajo su larga gestión, la institución se consolidó a nivel regional.</li>
          <li>Eligio González (1993–1996)</li>
          <li>Ambrosio Cabrera (1996–2002)</li>
          <li>Luzminia Fuentes (2003–2018)</li>
          <li>Félix Gil Gil (2018–presente)</li>
        </ul>

        <h4 className={styles.modalSubTitle}>4. Impacto Social y Programas Permanentes</h4>
        <p>La Casa de la Cultura no es solo un monumento histórico, sino un espacio vivo en constante articulación con organismos como el Instituto Autónomo de Cultura del Estado Nueva Esparta (Iacene). Entre sus principales aportes destacan:</p>
        <ul>
          <li><strong>Escuela de Cantos Tradicionales:</strong> Dirigida por maestros locales (como el profesor Eliut González), se encarga de instruir de manera gratuita a niños y jóvenes en la ejecución del galerón y los cantos tradicionales de faena.</li>
          <li><strong>Planes Vacacionales y Educativos:</strong> Desde hace décadas coordina actividades junto a la comunidad ("Descubre las Maravillas de Nuestra Isla") para fomentar la lectura y el arraigo territorial en las infancias.</li>
          <li><strong>Sede de Encuentros Regionales:</strong> Funciona de forma permanente como el punto de encuentro de las redes culturales de Gómez, agrupando a entes como la Fundación Cheguaco y agrupaciones aliadas como MOCULTA.</li>
        </ul>
      </>
    )
  },
  {
    id: 'cdc_tacarigua',
    titulo: 'Comité de Desarrollo Cultural de Tacarigua (C.D.C.)',
    subtitulo: 'Fundado el 15 de agosto de 1968',
    imagen: '/images/cdcta.jpeg',
    resumen: 'Institución civil madre de la infraestructura y el movimiento sociocultural del pueblo.',
    modalContenido: (
      <>
        <p><strong>Fecha de fundación:</strong> 15 de agosto de 1968</p>
        <p><strong>Lugar:</strong> Tacarigua, Municipio Gómez, Isla de Margarita, Estado Nueva Esparta, Venezuela</p>
        <p><strong>Estatus:</strong> Institución civil madre de la infraestructura y el movimiento sociocultural del pueblo de Tacarigua</p>

        <h4 className={styles.modalSubTitle}>1. Origen y Contexto de la Fundación</h4>
        <p>
          A finales de la década de 1960, el pueblo de Tacarigua experimentaba una efervescencia intelectual, artística y deportiva que requería de una estructura formal para canalizarla. Bajo esta premisa, la noche del 15 de agosto de 1968, un grupo de destacados líderes vecinales, intelectuales y jóvenes se reunió con el objetivo de constituir un organismo que impulsara el progreso integral de la comunidad.
        </p>
        <p>
          Así nació el Comité de Desarrollo Cultural de Tacarigua (C.D.C.), concebido no solo como un promotor de eventos, sino como un motor de desarrollo de infraestructura pública y resguardo del patrimonio tangible e intangible de la zona.
        </p>

        <h4 className={styles.modalSubTitle}>2. Miembros Fundadores y Primera Junta Directiva</h4>
        <p>La asamblea fundacional estuvo integrada por personalidades de gran relevancia para la historia neoespartana. La primera junta directiva que asumió las riendas de la institución estuvo conformada por:</p>
        <ul>
          <li><strong>Presidente:</strong> Ing. Pedro Rivero Núñez</li>
          <li><strong>Vicepresidente:</strong> José Joaquín Salazar Franco ("Cheguaco")</li>
          <li><strong>Secretario de Actas:</strong> Ángel Félix Gómez (célebre cronista e historiador)</li>
          <li><strong>Tesorero:</strong> Juan José Alfonzo</li>
          <li><strong>Vocales:</strong> Domingo Carrasquero, Francisco Lárez y Luis Beltrán Alfonzo.</li>
        </ul>
        <p>Este equipo inicial combinó el conocimiento técnico del ámbito público con la vocación literaria e histórica de la isla.</p>

        <h4 className={styles.modalSubTitle}>3. El Gran Logro: Gestión de la Sede Física (Década de 1970)</h4>
        <p>
          El mayor hito histórico del C.D.C. fue dotar a Tacarigua de un espacio digno para las manifestaciones colectivas. Aprovechando que el presidente fundador, el Ingeniero Pedro Rivero Núñez, ejercía funciones como Director de Obras Públicas del Estado Nueva Esparta a inicios de los años 70, la junta directiva gestionó e impulsó la construcción de un moderno complejo cultural.
        </p>
        <p>El proyecto se consolidó en el centro de Tacarigua e integró en un solo terreno la edificación central de la Casa de la Cultura (inaugurada formalmente a mediados de 1973), una Concha Acústica para festivales masivos y espectáculos musicales, y una Cancha Deportiva que sirvió como punto de encuentro.</p>
        <p>Por unanimidad, la institución bautizó esta sede como Casa de la Cultura "Poeta Pedro Rivero Navarro", rindiendo tributo al ilustre escritor, diplomático y periodista porlamarense (tío del Ingeniero Rivero Núñez).</p>

        <h4 className={styles.modalSubTitle}>4. Proyección Intelectual: El Periódico C.D.C.</h4>
        <p>
          El C.D.C. entendió la cultura como un ejercicio de comunicación y registro del pensamiento local. Para ello, fundaron y mantuvieron de forma permanente el periódico impreso C.D.C., un órgano informativo comunitario que circuló en la Isla de Margarita durante las décadas de 1970 y 1980.
        </p>
        <p>
          A través de sus páginas, intelectuales de la talla de "Cheguaco" Salazar Franco, Ángel Félix Gómez y José Rosa Acosta publicaban crónicas populares, poesía local, demandas sociales para el municipio Gómez e investigaciones sobre el folklore del oriente venezolano. Este impreso es hoy en día un tesoro archivístico para comprender la microhistoria del estado Nueva Esparta.
        </p>

        <h4 className={styles.modalSubTitle}>5. Evolución, Alianzas y Legado Actual</h4>
        <p>
          Con el paso de los años, las actividades diarias de la infraestructura construida por el C.D.C. pasaron a ser coordinadas por directores de la Casa de la Cultura (adscritos formalmente al Ejecutivo Regional e Iacene), mientras que el espíritu comunitario del C.D.C. sirvió de inspiración directa para el surgimiento de nuevos movimientos vecinales en los años 80, tales como el Movimiento Cultural Tacarigua Adentro (MOCULTA) en el sector San Sebastián.
        </p>
        <p>
          Hoy en día, el C.D.C. de Tacarigua es recordado como la organización pionera y vanguardista que transformó un pequeño pueblo agrícola y artesanal en el epicentro de las letras y la identidad folclórica del Municipio Gómez.
        </p>
      </>
    )
  }
];

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const CultureModule = () => {
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0]);
  const [activeCultorSubtab, setActiveCultorSubtab] = useState(CULTORES_SUBTABS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [cultoresList, setCultoresList] = useState([]);
  const [costumbresList, setCostumbresList] = useState([]);
  const [gastronomiaList, setGastronomiaList] = useState([]);
  const [centrosList, setCentrosList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [selectedCentro, setSelectedCentro] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [cult, cost, gast, cent] = await Promise.all([
          fetch(`${API_BASE}/cultores`).then(res => res.json()),
          fetch(`${API_BASE}/cultura/costumbres`).then(res => res.json()),
          fetch(`${API_BASE}/cultura/gastronomia`).then(res => res.json()),
          fetch(`${API_BASE}/cultura/centros`).then(res => res.json())
        ]);
        setCultoresList(cult.length ? cult : cultoresMock);
        setCostumbresList(cost.length ? cost.map(c => ({ ...c, titulo: c.nombre })) : costumbresMock);
        setGastronomiaList(gast.length ? gast.map(c => ({ ...c, titulo: c.nombre })) : gastronomiaMock);
        const imagenPorTitulo = {
          'Movimiento Cultural Tacarigua Adentro (MOCULTA)': '/images/Moculta.png',
          'Casa de la Cultura "Poeta Pedro Rivero Navarro"': '/images/CDCPPRN.jpeg',
          'Comité de Desarrollo Cultural de Tacarigua (C.D.C.)': '/images/cdcta.jpeg',
        };
        const logoPorTitulo = {
          'Movimiento Cultural Tacarigua Adentro (MOCULTA)': '/images/logomoculta.png',
          'Casa de la Cultura "Poeta Pedro Rivero Navarro"': '/images/cdct.jpg',
          'Comité de Desarrollo Cultural de Tacarigua (C.D.C.)': '/images/cdcta.jpeg',
        };
        setCentrosList(cent.length ? cent.map(c => ({
          ...c,
          titulo: c.titulo || c.nombre,
          imagen: imagenPorTitulo[c.titulo] || c.imagen,
          imagenLogo: logoPorTitulo[c.titulo] || c.imagen_logo,
        })) : []);
      } catch (err) {
        console.error('Error fetching culture data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredData = () => {
    if (activeTab === 'Costumbres y Tradiciones') {
      return costumbresList.filter(item =>
        item.activo !== false &&
        (item.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (activeTab === 'Gastronomía') {
      return gastronomiaList.filter(item =>
        item.activo !== false &&
        (item.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (activeTab === 'Centros Culturales') {
      // Use API data if available, otherwise use static centrosCulturales
      const centrosSource = centrosList.length > 0
        ? centrosList
        : centrosCulturales;
      return centrosSource.filter(item =>
        item.activo !== false &&
        (item.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.resumen?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    let filtered = cultoresList.filter(item => item.activo !== false);
    if (activeCultorSubtab !== 'Todos') {
      filtered = filtered.filter(item => item.categoria === activeCultorSubtab || item.disciplina === activeCultorSubtab || item.disciplina?.startsWith(activeCultorSubtab + ' /'));
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(item =>
        item.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.biografia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.disciplina?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const items = getFilteredData();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleGenerateGeneralPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateAllCultoresPDF(items);
    } catch (error) {
      console.error("Error generating general PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <motion.section
      className={styles.moduleWrapper}
      id="cultura"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Cultura | Una Sola Tacarigua</title>
        <meta name="description" content="Directorio de cultores, centros culturales, costumbres de Tacarigua de Margarita." />
      </Helmet>

      <HeroHeader
        title="Patrimonio Cultural"
        description="Explora las tradiciones, festividades, centros culturales, gastronomia y el legado musical que define la identidad de Tacarigua."
        theme="sunset"
        shape="curves"
        images={[
          '/Portada documentos/Portada Tacarigua Cultural.png',
          '/Portada documentos/Portada Tacarigua Cultural 2.png',
          '/images/cdct.jpg',
          '/images/Moculta.png',
          '/images/cdcta.jpeg',
          '/Imagenes Santos/culturainicio.jpg'
        ]}
      />

      <div className={`container ${styles.innerContent}`}>
        <div className={styles.tabsContainer}>
          {MAIN_TABS.map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setActiveCultorSubtab('Todos');
                setSearchTerm('');
                setCurrentPage(1);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder={`Buscar en ${activeTab.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button type="button" onClick={() => setSearchTerm('')} className={styles.clearSearch}>
                <X size={16} />
              </button>
            )}
          </div>
          
          {activeTab === 'Cultores' && (
            <button className={styles.globalPdfBtn} onClick={handleGenerateGeneralPDF} disabled={isGeneratingPDF}>
              <Download size={18} />
              {isGeneratingPDF ? "Generando..." : "Descargar Catálogo"}
            </button>
          )}
        </div>

        {isLoading ? (
          <p style={{ textAlign: 'center' }}>Cargando directorio...</p>
        ) : (
          <>
            <ScrollReveal variant="scale" delay={0.2}>
              {activeTab === 'Centros Culturales' ? (
                <div className={styles.centrosGrid}>
                  {items.map((centro) => (
                    <div key={centro.id} className={styles.centroCard} onClick={() => setSelectedCentro(centro)}>
                      <div className={styles.centroImageWrap}>
                        <img 
                          src={getImageSrc(centro.imagen) || centro.imagen} 
                          alt={getImageAlt(centro.imagen) || ''} 
                          className={styles.centroImage} 
                        />
                        {centro.imagenLogo && (
                          <div className={styles.logoBadge}>
                            <img 
                              src={getImageSrc(centro.imagenLogo) || centro.imagenLogo} 
                              alt="Logo" 
                              className={styles.logoBadgeImg} 
                            />
                          </div>
                        )}
                      </div>
                      <div className={styles.centroCardBody}>
                        <h4 className={styles.centroCardTitle}>{centro.titulo}</h4>
                        <span className={styles.centroCardSub}>{centro.subtitulo}</span>
                        <p className={styles.centroCardText}>{centro.resumen}</p>
                        <span className={styles.verMasLink}>Leer Reseña Completa →</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.grid}>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <StaggerItem key={item.id || index} delay={index * 0.05} style={{ height: '100%' }}>
                        {activeTab === 'Cultores'
                          ? <CultivatorCard cultor={item} />
                          : <CultureItemCard item={item} />}
                      </StaggerItem>
                    ))
                  ) : (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No se encontraron registros en esta categoría.</p>
                  )}
                </div>
              )}
            </ScrollReveal>
            
            {activeTab !== 'Centros Culturales' && items.length > itemsPerPage && (
              <ScrollReveal variant="up" delay={0}>
                <Pagination
                  currentPage={currentPage}
                  totalItems={items.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </ScrollReveal>
            )}
          </>
        )}
      </div>

      {/* Modal Centros Culturales */}
      {selectedCentro && (
        <div className={styles.modalOverlay} onClick={() => setSelectedCentro(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setSelectedCentro(null)}>&times;</button>
            <div className={styles.modalHeroImage}>
              <img 
                src={getImageSrc(selectedCentro.imagen) || selectedCentro.imagen} 
                alt={getImageAlt(selectedCentro.imagen) || ''} 
                className={styles.modalImg} 
              />
            </div>
            <div className={styles.modalBodyContent}>
              <h3 className={styles.modalTitle}>{selectedCentro.titulo}</h3>
              <span className={styles.modalSubtitle}>{selectedCentro.subtitulo}</span>
              <div className={styles.modalText}>
                {selectedCentro.modalContenido
                  ? selectedCentro.modalContenido
                  : selectedCentro.contenido_html
                    ? <div dangerouslySetInnerHTML={{ __html: selectedCentro.contenido_html }} />
                    : <p>{selectedCentro.descripcion || selectedCentro.resumen}</p>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default CultureModule;

