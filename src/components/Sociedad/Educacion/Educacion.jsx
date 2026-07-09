import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen } from 'lucide-react';
import styles from './Educacion.module.css';
import { IMAGES, getImageSrc, getImageAlt } from '../../../data/images';

const escuelas = [
  {
    nombre: 'U.E. "Napoleón Narváez"',
    nivel: 'Educación Inicial y Básica',
    descripcion:
      'Fundada en 1946. Lleva el nombre del ilustre historiador neoespartano Napoleón Narváez. Ha formado generaciones de tacarigüeros y cuenta con biblioteca escolar desde 1987. Ubicadada en la Calle Principal de Tacarigua.',
    icono: '🏫',
    imagen: 'escuelaNapoleonNarvaez',
  },
  {
    nombre: 'U.E.E. "Cruz Millán García"',
    nivel: 'Educación Inicial, Básica y Media General',
    descripcion:
      'La U.E.E. Cruz Millán García (Unidad Educativa Estadal Cruz Millán García) es una institución pública de educación básica y media general. Fue fundada en enero de 1963. Su historia se remonta a 1931 cuando inició como la Escuela Mixta Nº 26. Ubicada en el Valle de San Sebastián, en el Municipio Gómez del Estado Nueva Esparta, Venezuela.',
    icono: '🏫',
    imagen: 'escuelaCruzMillanGarcia',
  },
  {
    nombre: 'U.E. "Roraima"',
    nivel: 'Educación Inicial, Básica y Media General',
    descripcion:
      'La Unidad Educativa Roraima es un prestigioso colegio privado bilingue ubicado en la Calle Principal de Tacariguita, Municipio Gómez, Estado Nueva Esparta, específicamente en el Municipio Gómez. Ofrece formación integral (Educación Inicial, Primaria y Media General) enfocada en la libertad, el contacto con la naturaleza y la diversión.',
    icono: '📖',
    imagen: 'escuelaRoraima',
  },
  {
    nombre: 'U.E. "Colegio Divina Pastora"',
    nivel: 'Educación Inicial, Básica y Media General',
    descripcion:
      'Fundada el 23 de septiembre de 1993 por la Licenciada Yumeli Rivera Núñez. Proyecto educativo privado basado en valores cristianos y humanos, con una pedagogía participativa y progresista. Ubicado en la Vía Principal de Tacarigua.',
    icono: '✏️',
    imagen: 'colegioDivinaPastora',
  },
];

const hitos = [
  {
    año: '1870',
    evento:
      'Firma del Decreto de Instrucción Pública Gratuita y Obligatoria por el presidente Antonio Guzmán Blanco el 27 de junio de 1870, sentando la base legal para las escuelas oficiales.',
  },
  {
    año: '1875',
    evento:
      'El 12 de julio de 1875 se inaugura la Escuela Federal Diurna de Varones N° 860 en Tacarigua (Resolución N° 20). Su primer preceptor/maestro fue Ignacio Jiménez, con 42 alumnos.',
  },
  {
    año: '1897',
    evento:
      'Reapertura de la Escuela Federal de Varones N° 860, renombrada como Escuela Federal N° 1550 de Hembras Diurna, abriendo el acceso formal para las mujeres del pueblo bajo la dirección de Anastasia Rivero.',
  },
  {
    año: '1934',
    evento:
      'El 20 de octubre de 1934 se nombra a Cándido Sánchez como maestro de la Escuela Nocturna N° 8 de Tacarigua.',
  },
  {
    año: '1939',
    evento:
      'El 14 de septiembre de 1939 (según Gaceta Oficial N° 532) se nombra a nuevos educadores, incluyendo a Evaristo Alfonzo Guerra en la Escuela Nocturna N° 8 (o de Varones Diurna N° 8) en Corazón de Jesús, Tacarigua.',
  },
  {
    año: '1946',
    evento:
      'El 16 de septiembre de 1946 se funda el Grupo Escolar / Escuela Napoleón Narváez mediante la fusión de la Escuela Federal N° 651 de Varones, la Escuela Federal N° 1354 de Hembras y la Escuela Estadal N° 18 Nocturna de Adultos, con el impulso de Luis Beltrán Rivero Millán y Pablo Romero Millán.',
  },
  {
    año: '1949',
    evento:
      'Evaristo Alfonzo Guerra «Lico» se gradúa como Licenciado en Química en la Universidad Central de Venezuela (UCV), convirtiéndose en el primer universitario graduado originario de Tacarigua.',
  },
  {
    año: '1951',
    evento:
      'En julio de 1951, Antonio «Toñito» Millán Guerra se gradúa como el primer Maestro Normalista nacido en Tacarigua, obteniendo su título en la Escuela Normal "El Mácaro" de Maracay a los 17 años.',
  },
  {
    año: '1954',
    evento:
      'En julio de 1954, Helvecia Marcano González se gradúa como la primera enfermera profesional originaria de Tacarigua, en la Escuela de Enfermeras "Domingo Badaracco Bermúdez" de Cumaná.',
  },
  {
    año: '1961',
    evento:
      'Florentino Lárez (egresado de la Escuela Normal "Miguel Suniaga") y Juana María Gil Ordaz (quien obtuvo su título tras equivalencias en el Liceo "Francisco Antonio Rísquez") se gradúan como Maestros Normalistas.',
  },
  {
    año: '1963',
    evento:
      'Se inaugura el edificio de la Escuela San Sebastián en el sector Tacarigua (posteriormente renombrada "Cruz Millán García" en honor a su célebre educador).',
  },
  {
    año: '1990',
    evento:
      'Agustín Landaeta obtiene su Licenciatura en Educación, completando su formación docente y continuando su trayectoria como subdirector desde 1994.',
  },
  {
    año: '1993',
    evento:
      'El 23 de septiembre de 1993, la Licenciada Yumeli Rivera Núñez funda el Colegio Divina Pastora, enfocado en valores cristianos y pedagogía participativa.',
  },
];


const educadores = [
  {
    nombre: 'Evaristo Alfonzo Guerra',
    apodo: 'Profesor "Lico"',
    imagen: 'evaristoAlfonzo',
    descripcion: 'Primer Profesional Universitario de la Parroquia Guevara, Municipio Gómez, Estado Nueva Esparta. Profesor de Biología y Química graduado en el Instituto Pedagógico de Caracas en julio de 1949. Ejerció en varias instituciones, destacando en el Colegio San Pablo de Caracas, donde fue Director.',
    detallesHtml: (
      <>
        <p>
          En la Parroquia Guevara, municipio Gómez del estado Nueva Esparta, la Humildad duerme en cada quicio y cada estera; sueña con cosas hermosas y no solo se aferra a la esperanza sino que duerme con ella, lucha por ella y se sacrifica por ella…. amor del bueno. Evaristo Alfonzo Guerra es de los nuestros, con la Humildad con mayúscula, sueños al aire, visión de alguien en la vida y misión de luchar por sus sueños.
        </p>
        <p>
          Nació el 27 de octubre de 1922 en nuestra población de Tacarigua - San Sebastián, del vientre de Atanasia Guerra, vecina del lugar, y de la varonilidad de Emilio Alfonzo, agricultor del antiguo Caserío El Río. Sus padrinos fueron Juan Romero y Catalina Moya.
        </p>
        <h4 className={styles.modalSubTitle}>Infancia y Formación</h4>
        <p>
          Su infancia transcurrió en su pueblo natal hasta que, a los 7 años de edad, fue inscrito en la Escuela Estadal N° 43, en Tacarigua San Sebastián bajo la dirección de la Preceptora Magdalena Piñerúa. Esta era una Escuela de Varones Diurna con un presupuesto de Bs. 60 y la asistencia de unos 42 estudiantes. En esa escuela estuvo hasta aprobar el 4to grado, cuando fue trasladado a Santa Ana del Norte en septiembre de 1934, a la Escuela Federal EF-9 bajo la dirección de Víctor Aumaitre Villarroel.
        </p>
        <p>
          Luego de obtener su sexto grado, pidió a su madre continuar estudiando y fue inscrito en el Liceo "Francisco Antonio Rísquez", donde estudió hasta 4to año en 1938.
        </p>
        <h4 className={styles.modalSubTitle}>Primeros Pasos como Maestro</h4>
        <p>
          En el año 1939, estando en su población natal, reemplazó a Pablito Romero Millán en la Escuela Estadal de Varones Diurna N° 8, según la Gaceta Oficial N° 532 del 14-09-1939. Una semana más tarde, el 21 de septiembre de 1939, fue nombrado como Maestro de la Escuela Estadal Varones Diurna N° 117 en Carapacho (Municipio Díaz), en reemplazo de Ana Luisa Heredia (Gaceta Oficial N° 567 del 21-09-1939). No obstante, ese cambio no fue de su agrado y renunció al mismo el 2 de octubre, según la Gaceta Oficial N° 569.
        </p>
        <h4 className={styles.modalSubTitle}>Estudios en Caracas y Título Universitario</h4>
        <p>
          Posteriormente, se trasladó a Puerto Cabello, donde estaba su padre, y luego a Caracas, donde cursó estudios en el Colegio La Salle. En ese instituto se graduó de Bachiller en Ciencias Biológicas en el lapso 1943-1944.
        </p>
        <p>
          El 24 de septiembre de 1945 se inscribió en el Instituto Pedagógico de Caracas, identificado con la cédula de identidad N° V-89.751. Tras culminar su carrera, se graduó como <strong>Profesor en Biología y Química en julio de 1949</strong>, logro que lo cataloga históricamente como el <strong>primer Profesional Universitario de la Parroquia Guevara</strong>.
        </p>
        <h4 className={styles.modalSubTitle}>Carrera Profesional y Legado</h4>
        <p>
          El Profesor "Lico" inició su carrera como Educador en varias instituciones educativas de la capital, entre las cuales destaca principalmente el Colegio San Pablo, donde tuvo una ejemplar trayectoria hasta llegar a ser Director de la institución.
        </p>
        <p>
          El Profesor Evaristo falleció en Caracas el 15 de marzo de 1992, sin dejar descendencia pero con el corazón henchido de satisfacciones al comprobar que su obra educativa y su ejemplo fueron de una dimensión extraordinaria. ¡Gloria al Profesor Evaristo Alfonzo!
        </p>
      </>
    )
  },
  {
    nombre: 'Ignacio Jiménez',
    descripcion:
      'Primer preceptor oficial de la Escuela Federal N° 860 (1875–1883). El "Apostól de la Educación Tacarigüera" falleció joven a los 29 años, dejando el legado que hizo de Tacarigua "La Atenas Neoespartana".',
  },
  {
    nombre: 'Napoleón Narváez',
    descripcion:
      'Historiador neoespartano epónimo de la escuela fundada en 1946. Documentó la historia de Margarita y Tacarigua, incluyendo la participación de José Jesús Guevara en el Congreso de Angostura.',
  },
  {
    nombre: 'Toñito Millán',
    descripcion:
      'Primer Maestro Normalista tacarigüero (1951). Su espíritu libertario lo llevó a combatir a Pérez Jiménez y posteriormente ejercer en El Tigre y Valencia. Homenajeado como Ciudadano Ejemplar.',
  },
  {
    nombre: 'Juana María Gil Ordaz',
    descripcion:
      'Maestra Normalista graduada (1961) que ejerció como Directora en la Escuela "Napoleón Narváez". Condecorada con la "Orden Victor Aumaitre Villarroel" por su 36 años de servicio educativo.',
  },
  {
    nombre: 'Agustín Landaeta',
    descripcion:
      'Maestro Normalista (1963) y Licenciado en Educación (1990). Director de escuelas en San Sebastián y lideró el Grupo Escolar "Nuestra Señora de La Asunción". Fue SubDirector desde 1994.',
  },
  {
    nombre: 'Florentino Larez',
    descripcion:
      'Maestro Normalista (1961) que ejerció en San Antonio de Irapa y luego en Porlamar y Santa Ana. Fundador del periódico "Los Angeles" y pionero en agrupaciones musicales. Jubilado en 1986.',
  },
];

const Educacion = () => {
  const [hitoActivo, setHitoActivo] = useState(null);
  const [educadorSeleccionado, setEducadorSeleccionado] = useState(null);
  const [mostrarMemoriaViva, setMostrarMemoriaViva] = useState(false);
  const [mostrarTodoTimeline, setMostrarTodoTimeline] = useState(false);
  const [escuelasVisibles, setEscuelasVisibles] = useState(escuelas);
  const [hitosData, setHitosData] = useState(hitos);
  const [educadoresData, setEducadoresData] = useState(educadores);

  useEffect(() => {
    fetch('/api/sociedad/educacion/hitos')
      .then(res => res.json())
      .then(data => { if (data?.length) setHitosData(data.map(d => ({ año: d.anio, evento: d.evento }))); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/sociedad/educadores')
      .then(res => res.json())
      .then(data => {
        if (data?.length) {
          setEducadoresData(data.map(d => ({
            nombre: d.nombre,
            apodo: d.apodo,
            imagen: d.imagen,
            descripcion: d.descripcion,
            detallesHtml: d.detalles_html || null,
          })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/sociedad/educacion')
      .then(res => res.json())
      .then(data => {
        if (data?.length) {
          setEscuelasVisibles(data.map(d => ({
            nombre: d.nombre,
            nivel: d.nivel,
            descripcion: d.descripcion,
            icono: d.icono || '🏫',
            imagen: d.imagen,
          })));
        }
      })
      .catch(() => {});
  }, []);

  const abrirModal = (ed) => setEducadorSeleccionado(ed);
  const cerrarModal = () => setEducadorSeleccionado(null);

  return (
    <div className={styles.container}>
      {/* Título principal */}
      <div className={styles.header}>
        <h2 className={styles.title}>Educación en Tacarigua</h2>
      </div>

      {/* Intro */}
      <div className={styles.intro}>
        <p>
          La educación en Nueva Esparta tuvo un inicio difícil. El mismo Libertador Simón Bolívar, en 1827,
          negó la fundación de un Colegio Nacional en el Estado argumentando falta de
          presupuesto. No fue sino hasta 1833 que el Vicepresidente Andrés Narvarte creó el
          Colegio Nacional de Margarita en La Asunción — y tardó casi siete años en abrir
          sus puertas. Tacarigua vivió estas mismas carencias, pero su comunidad nunca dejó
          de luchar por el acceso al conocimiento, ganándose el apodo de la "Atenas de Margarita"
          debido a la gran cantidad de educadores, poetas e intelectuales nacidos en su seno.
        </p>
        <p>
          La historia educativa registra que los jóvenes tacarigüeros caminaban largas distancias,
          cruzando cerros con sus silletas al hombro para recibir clases bajo árboles o en humildes casas
          particulares de maestros voluntarios, antes de la creación de las primeras escuelas oficiales.
        </p>
        <p>
          <em>
            "…aquellos muchachos con sus silletas al hombro hacia la casa del maestro y
            luego el regreso a casa a buscar pasto a los chivos, agua en los riachuelos y el
            almuerzo al viejo; y los años pasaban con su carga de angustias y tormentos…
            cerro arriba."
          </em>
        </p>
      </div>

      {/* Sección Destacada: Grid de Hitos Importantes */}
      <div className={styles.featuredGrid}>
        {/* Tarjeta destacada Memoria Viva */}
        <div className={styles.memoriaVivaCard} onClick={() => setMostrarMemoriaViva(true)}>
          <div className={styles.memoriaVivaImageWrap}>
            <img
              src={getImageSrc('primeraEscuelaFederal')}
              alt={getImageAlt('primeraEscuelaFederal')}
              className={styles.memoriaVivaThumbnail}
            />
          </div>
          <div className={styles.memoriaVivaContent}>
            <span className={styles.memoriaVivaBadge}>Memoria Viva</span>
            <h3 className={styles.memoriaVivaTitle}>El Origen de la Educación Oficial en Tacarigua</h3>
            <p className={styles.memoriaVivaText}>
              El 12 de julio de 1875 se abrió la primera escuela pública oficial en esta tierra. Conoce la historia de la placa conmemorativa de la Escuela Federal N° 860 y cómo comenzó la revolución cultural del pueblo.
            </p>
            <button className={styles.leerMasBtn} onClick={(e) => { e.stopPropagation(); setMostrarMemoriaViva(true); }}>
              Ver Historia Completa 🔍
            </button>
          </div>
        </div>

        {/* Tarjeta destacada Evaristo Alfonzo Guerra */}
        <div className={styles.memoriaVivaCard}         onClick={() => abrirModal(educadoresData[0])}
          style={{ borderLeftColor: 'var(--primary-blue)' }}>
          <div className={styles.memoriaVivaImageWrap}>
            <img
              src={getImageSrc('evaristoAlfonzo')}
              alt={getImageAlt('evaristoAlfonzo')}
              className={styles.memoriaVivaThumbnail}
            />
          </div>
          <div className={styles.memoriaVivaContent}>
            <span className={styles.memoriaVivaBadge} style={{ background: 'rgba(29, 53, 87, 0.1)', color: 'var(--primary-blue)' }}>Personaje Ilustre</span>
            <h3 className={styles.memoriaVivaTitle}>Evaristo Alfonzo Guerra: Primer Profesional Universitario</h3>
            <p className={styles.memoriaVivaText}>
              Nacido en Tacarigua - San Sebastián, "Lico" se graduó en el Instituto Pedagógico de Caracas en 1949, convirtiéndose en el primer profesional universitario egresado de la Parroquia Guevara.
            </p>
            <button className={styles.leerMasBtn} onClick={(e) => { e.stopPropagation(); abrirModal(educadoresData[0]); }}
              style={{ background: 'var(--primary-blue)' }}>
              Ver Biografía Completa 🔍
            </button>
          </div>
        </div>
      </div>

      {/* Botón de Descarga PDF */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(212,160,69,0.2)',
          borderRadius: '1.25rem',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(212,160,69,0.08)',
          margin: '1.5rem 0',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.35rem 1.1rem',
            background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--oxford-navy)',
            marginBottom: '0.75rem',
          }}>
            <BookOpen size={14} style={{ marginRight: '0.35rem', display: 'inline', verticalAlign: 'middle' }} />
            DOCUMENTO SOCIAL · EDUCACIÓN
          </span>
          <h3 style={{ color: 'var(--goldenrod)', fontWeight: 700, margin: 0, fontSize: '1.15rem' }}>
            Módulos de Educación para Descargar
          </h3>
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
            Documentos completos sobre la historia educativa de Tacarigua
          </p>
        </div>
        <div className={styles.downloadSection}>
          <motion.a
            href="/MODULO-II-EDUCACION-2022.pdf"
            download="MODULO-II-EDUCACION-2022.pdf"
            className={styles.downloadBtn}
            title="Descargar PDF del Módulo II: Educación (2022)"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} style={{ marginRight: '0.35rem' }} />
            Módulo II: Educación (2022)
          </motion.a>
          <motion.a
            href="/MODULO-II-EDUCACION-Final.pdf"
            download="MODULO-II-EDUCACION-Final.pdf"
            className={styles.downloadBtn}
            title="Descargar PDF del Módulo II: Educación (Versión Final)"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} style={{ marginRight: '0.35rem' }} />
            Educación (Versión Final)
          </motion.a>
        </div>
      </motion.div>

      {/* Línea de tiempo */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleAccent}>📅</span> Línea de Tiempo Educativa
        </h3>
        <div className={styles.timeline}>
          {hitosData.slice(0, mostrarTodoTimeline ? hitosData.length : 4).map((h, i) => (
            <div
              key={i}
              className={`${styles.timelineItem} ${hitoActivo === i ? styles.timelineActive : ''}`}
              onClick={() => setHitoActivo(hitoActivo === i ? null : i)}
            >
              <div className={styles.timelineYear}>{h.año}</div>
              <div className={styles.timelineContent}>
                <p>{h.evento}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setMostrarTodoTimeline(!mostrarTodoTimeline)}
          className={styles.verMasTimelineBtn}
        >
          {mostrarTodoTimeline ? 'Ver menos 🔼' : 'Ver más hitos 🔽'}
        </button>
      </section>

      {/* Escuelas actuales */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleAccent}>🏫</span> Instituciones Educativas
        </h3>
        <div className={styles.cardGrid}>
          {escuelasVisibles.map((e, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <img
                  src={getImageSrc(e.imagen)}
                  alt={getImageAlt(e.imagen)}
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardIcon}>{e.icono}</div>
              <h4>{e.nombre}</h4>
              <span className={styles.nivel}>{e.nivel}</span>
              <p>{e.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Educadores destacados */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleAccent}>🎓</span> Educadores Destacados
        </h3>
        <div className={styles.educadoresList}>
          {educadoresData.map((ed, i) => (
            <div
              key={i}
              className={styles.educadorCard}
              onClick={() => abrirModal(ed)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && abrirModal(ed)}
            >
              <div className={styles.educadorAvatar}>
                {ed.nombre.charAt(0)}
              </div>
              <div>
                <h4>{ed.nombre}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Educador */}
      {educadorSeleccionado && (
        <div className={styles.overlay} onClick={cerrarModal}>
          <div className={educadorSeleccionado.detallesHtml ? styles.modalLarge : styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={cerrarModal}>&times;</button>

            {educadorSeleccionado.imagen ? (
              <div className={styles.modalLargeImageWrap}>
                <img
                  src={getImageSrc(educadorSeleccionado.imagen)}
                  alt={getImageAlt(educadorSeleccionado.imagen)}
                  className={styles.modalLargeImage}
                />
                {educadorSeleccionado.apodo && (
                  <span className={styles.imageCaption}>
                    {educadorSeleccionado.nombre} — {educadorSeleccionado.apodo}
                  </span>
                )}
              </div>
            ) : (
              <div className={styles.modalAvatar}>
                {educadorSeleccionado.nombre.charAt(0)}
              </div>
            )}

            <h3 className={styles.modalTitle} style={{ textAlign: educadorSeleccionado.detallesHtml ? 'left' : 'center' }}>
              {educadorSeleccionado.nombre}
            </h3>

            {educadorSeleccionado.detallesHtml ? (
              <div className={styles.modalBody}>
                {typeof educadorSeleccionado.detallesHtml === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: educadorSeleccionado.detallesHtml }} />
                ) : (
                  educadorSeleccionado.detallesHtml
                )}
              </div>
            ) : (
              <p className={styles.modalDescripcion}>{educadorSeleccionado.descripcion}</p>
            )}
          </div>
        </div>
      )}

      {/* Modal Memoria Viva */}
      {mostrarMemoriaViva && (
        <div className={styles.overlay} onClick={() => setMostrarMemoriaViva(false)}>
          <div className={styles.modalLarge} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setMostrarMemoriaViva(false)}>&times;</button>

            <div className={styles.modalHeader}>
              <span className={styles.memoriaVivaBadge}>Memoria Viva</span>
              <h3 className={styles.modalMainTitle}>El Origen de la Educación Oficial en Tacarigua</h3>
            </div>

            <div className={styles.modalLargeImageWrap}>
              <img
                src={getImageSrc('primeraEscuelaFederal')}
                alt={getImageAlt('primeraEscuelaFederal')}
                className={styles.modalLargeImage}
              />
              <span className={styles.imageCaption}>
                Placa de bronce instalada en 2014, marcando el origen de la primera escuela pública oficial el 12 de julio de 1875.
              </span>
            </div>

            <div className={styles.modalBody}>
              <p>
                En el corazón de Tacarigua (Municipio Gómez, Estado Nueva Esparta), una sobria placa de bronce sobre una pared de piedra resguarda uno de los capítulos más importantes de la identidad margariteña. Se trata del recordatorio del <strong>12 de julio de 1875</strong>, el día en que la educación formal y pública abrió sus puertas por primera vez en esta tierra.
              </p>
              <p>
                Esta inscripción, avalada por el Centro de Desarrollo de la Calidad Educativa (CDC-Tacarigua) y develada en febrero de 2014, marca el punto exacto donde comenzó una revolución cultural que transformaría a un pueblo agrícola en una cantera de intelectuales.
              </p>

              <h4 className={styles.modalSubTitle}>El Contexto: Un decreto que cambió la historia</h4>
              <p>
                Para entender el valor de este hito, debemos viajar al año 1870. El entonces presidente de Venezuela, Antonio Guzmán Blanco, firmó el histórico Decreto de Instrucción Pública Gratuita y Obligatoria. El objetivo era claro: llevar las letras y los números a cada rincón del país para erradicar el analfabetismo.
              </p>
              <p>
                Bajo este impulso nacional, se dictó la Resolución Nº 20 que ordenó la creación de la <strong>Escuela Federal Diurna de Varones Nº 860</strong> en Tacarigua.
              </p>

              <h4 className={styles.modalSubTitle}>Ignacio Jiménez: El maestro pionero</h4>
              <p>
                La responsabilidad de encender la chispa del saber recayó sobre <strong>Ignacio Jiménez</strong>, un respetado preceptor local que ya enseñaba de forma particular. Al asumir el cargo oficial, Jiménez se convirtió en el primer maestro del pueblo, guiando a la institución con recursos sumamente limitados.
              </p>

              <div className={styles.statsBox}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--oxford-navy)' }}>
                  Registros Históricos de la Región:
                </p>
                <ul>
                  <li><span className={styles.statsLabel}>Matrícula inicial:</span> 42 alumnos varones.</li>
                  <li><span className={styles.statsLabel}>Presupuesto de apertura:</span> 120 bolívares destinados a salarios y mantenimiento, y otra cantidad igual para la fabricación de los primeros bancos, mesas y pizarrones de madera.</li>
                </ul>
              </div>

              <p>
                El maestro Jiménez dedicó su vida entera a esta aula, ejerciendo de forma ininterrumpida hasta su fallecimiento en octubre de 1883.
              </p>

              <h4 className={styles.modalSubTitle}>De un aula de barro a la "Atenas Neoespartana"</h4>
              <p>
                El impacto de la Escuela Federal Nº 860 superó cualquier expectativa administrativa. La semilla sembrada en 1875 floreció a lo largo del siglo XX, convirtiendo a Tacarigua en un fenómeno social: un porcentaje altísimo de sus jóvenes nativos terminaron convirtiéndose en profesionales universitarios, poetas, científicos y, sobre todo, en una legión de educadores que salieron a alfabetizar al resto de la Isla de Margarita y de Venezuela.
              </p>
              <p>
                Gracias a este arraigo por el estudio y la cultura, Tacarigua se ganó con orgullo el título de <strong>"La Atenas Neoespartana"</strong>.
              </p>

              <h4 className={styles.modalSubTitle}>Un patrimonio que debemos cuidar</h4>
              <p>
                La placa instalada en 2014 no es solo metal; es un espejo del esfuerzo de nuestros antepasados. Cada vez que pases frente a ella, recuerda que allí comenzó el camino del conocimiento que hoy define el orgullo de ser tacarigüero.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Educacion;
