import React, { useState } from 'react';
import styles from './Educacion.module.css';
import { IMAGES } from '../../../data/images';

const escuelas = [
  {
    nombre: 'U.E. "Napoleón Narváez"',
    nivel: 'Educación Inicial y Básica',
    descripcion:
      'Fundada en 1946. Lleva el nombre del ilustre historiador neoespartano Napoleón Narváez. Ha formado generaciones de tacarigüeros y cuenta con biblioteca escolar desde 1987.',
    icono: '🏫',
  },
  {
    nombre: 'U.E.E. "Cruz Millán García"',
    nivel: 'Educación Inicial, Básica y Media General',
    descripcion:
      'La U.E.E. Cruz Millán García (Unidad Educativa Estadal Cruz Millán García) es una institución pública de educación básica y media general ubicada en el Valle de Tacarigua, en el Municipio Gómez del Estado Nueva Esparta, Venezuela',
    icono: '🏫',
  },
  {
    nombre: 'U.E. "Roraima"',
    nivel: 'Educación Inicial, Básica y Media General',
    descripcion:
      'La Unidad Educativa Roraima es un prestigioso colegio privado ubicado en el Estado Nueva Esparta, específicamente en el Municipio Gómez. Ofrece formación integral (Educación Inicial, Primaria y Media General) enfocada en la libertad, el contacto con la naturaleza y la diversión.',
    icono: '📖',
  },
  {
    nombre: 'U.E. "Colegio Divina Pastora"',
    nivel: 'Educación Inicial, Básica y Media General',
    descripcion:
      'Fundada el 23 de septiembre de 1993 por la Licenciada Yumeli Rivera Núñez. Proyecto educativo privado basado en valores cristianos y humanos, con una pedagogía participativa y progresista.',
    icono: '✏️',
  },
];

const hitos = [
  {
    año: '1875',
    evento:
      'Decreto 1723: Antonio Guzmán Blanco crea la Escuela Federal N° 860 en Tacarigua. Primer preceptor: Ignacio Jiménez, con 42 alumnos. Esta fecha marcó el inicio de la Educación Oficial en la comunidad.',
  },
  {
    año: '1897',
    evento:
      'Se crea la Escuela Federal Femenina N° 1550 en Tacarigua-Corazón de Jesús. Las primeras 30 muchachas fundadoras incluyeron a Eladia Landaeta, Cruz María Guilarte y Petra Guzmán.',
  },
  {
    año: '1946',
    evento:
      'Se funda la Escuela Napoleón Narváez mediante fusión de tres unidades educativas. Fundadores: Luis Beltrán Rivero, Pablo Romero Millán, Eustasio Marcano (Prefecto del Pueblo) y Rosendo Rivera.',
  },
  {
    año: '1960',
    evento:
      'Inauguración del edificio de la Escuela San Sebastián, posteriormente nombrada "Cruz Millán García" en honor a la educadora pionera.',
  },
  {
    año: '1993',
    evento:
      'Fundación del Colegio Divina Pastora por Yumeli Rivera Núñez, con filosofía basada en valores, educación progresista y participativa. Inspirado en el milagro de la Virgen Divina Pastora.',
  },
];

const educadores = [
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

      {/* Botón de Descarga PDF */}
      <div className={styles.downloadSection}>
        <a
          href="/MODULO-II-EDUCACION-2022.pdf"
          download="MODULO-II-EDUCACION-2022.pdf"
          className={styles.downloadBtn}
          title="Descargar PDF del Módulo II: Educación (2022)"
        >
          📥 Módulo II: Educación (2022)
        </a>
        <a
          href="/MODULO-II-EDUCACION-Final.pdf"
          download="MODULO-II-EDUCACION-Final.pdf"
          className={styles.downloadBtn}
          title="Descargar PDF del Módulo II: Educación (Versión Final)"
        >
          📥 Educación (Versión Final)
        </a>
      </div>

      {/* Línea de tiempo */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleAccent}>📅</span> Línea de Tiempo Educativa
        </h3>
        <div className={styles.timeline}>
          {hitos.map((h, i) => (
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
      </section>

      {/* Escuelas actuales */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleAccent}>🏫</span> Instituciones Educativas
        </h3>
        <div className={styles.cardGrid}>
          {escuelas.map((e, i) => (
            <div key={i} className={styles.card}>
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
          {educadores.map((ed, i) => (
            <div key={i} className={styles.educadorCard}>
              <div className={styles.educadorAvatar}>
                {ed.nombre.charAt(0)}
              </div>
              <div>
                <h4>{ed.nombre}</h4>
                <p>{ed.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Educacion;
