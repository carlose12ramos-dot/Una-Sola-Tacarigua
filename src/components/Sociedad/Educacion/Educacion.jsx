import React, { useState } from 'react';
import styles from './Educacion.module.css';
import { IMAGES } from '../../../data/images';

const escuelas = [
  {
    nombre: 'U.E. Napoleón Narváez',
    nivel: 'Educación Básica',
    descripcion:
      'Fundada en 1946. Lleva el nombre del ilustre historiador neoespartano Napoleón Narváez. Ha formado generaciones de tacarigüeros y cuenta con biblioteca escolar desde 1987.',
    icono: '🏫',
  },
  {
    nombre: 'U.E. Cruz Millán García',
    nivel: 'Educación Básica — El Salado',
    descripcion:
      'Escuela estadal graduada en El Salado. Formó a músicos como Lico Lárez y ha sido sede de formación para docentes y estudiantes de toda la parroquia.',
    icono: '📚',
  },
  {
    nombre: 'U.E. Colegio Divina Pastora',
    nivel: 'Educación Integral',
    descripcion:
      'Fundada el 23 de septiembre de 1993 por la Licenciada Yumeli Rivera Núñez. Proyecto educativo basado en valores, educación progresista y participativa.',
    icono: '✏️',
  },
];

const hitos = [
  {
    año: '1875',
    evento:
      'Antonio Guzmán Blanco decreta la Escuela Federal N° 860 el 12 de julio. Primer preceptor: Ignacio Jiménez, con 42 alumnos de sectores de una sola Tacarigua, incluidos Tacarigua, Tacarigüita, El Alto del Gallego y El Río (hoy San Sebastián).',
  },
  {
    año: '1897',
    evento:
      'Creada la primera Escuela Federal Femenina N° 155 de Tacarigua — Corazón de Jesús, el 21 de marzo.',
  },
  {
    año: '1946',
    evento:
      'Se funda la Escuela Napoleón Narváez, consolidando la tradición educativa que llevaría a Tacarigua a ser reconocida como La Atenas Neoespartana.',
  },
  {
    año: '1973',
    evento:
      'Inaugurada la Casa de la Cultura en Corazón de Jesús por el Gobernador Bernardo Acosta, fortaleciendo la vida cultural comunitaria.',
  },
  {
    año: '1993',
    evento:
      'Fundación del Colegio Divina Pastora por Yumeli Rivera Núñez, ampliando la oferta educativa integral en la parroquia.',
  },
];

const educadores = [
  {
    nombre: 'Ignacio Jiménez',
    descripcion:
      'Primer preceptor oficial de la Escuela Federal N° 860 (1875–1883). Regentaba una escuelita particular antes de la oficialización. Falleció el 24 de octubre de 1883, rodeado de sus familiares.',
  },
  {
    nombre: 'Napoleón Narváez',
    descripcion:
      'Historiador neoespartano epónimo de la escuela fundada en 1946. Documentó la historia de Margarita y Tacarigua, incluyendo la participación de José Jesús Guevara en el Congreso de Angostura.',
  },
  {
    nombre: 'Maestros Normalistas (1951–1964)',
    descripcion:
      'Docentes formados en Escuelas Normales que transformaron la enseñanza en Tacarigua con metodología y dedicación ejemplar, sentando bases para el 28,3 % de profesionales universitarios.',
  },
];

const Educacion = () => {
  const [hitoActivo, setHitoActivo] = useState(null);

  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <img
          src={IMAGES.educacionHero.src}
          alt={IMAGES.educacionHero.alt}
          className={styles.heroImg}
          onError={(e) => { e.currentTarget.src = IMAGES.educacionHero.fallback; }}
        />
        <div className={styles.heroText}>
          <div className={styles.heroTextInner}>
            <span className={styles.badge}>Módulo II · Sociedad</span>
            <h2>Educación en Tacarigua</h2>
            <p>
              Desde el 12 de julio de 1875, cuando Guzmán Blanco decretó la Escuela Federal N° 860,
              Tacarigua ha construido su historia educativa con el esfuerzo de maestros, familias
              y comunidades enteras — camino que la llevó a ser reconocida como La Atenas Neoespartana.
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className={styles.intro}>
        <p>
          La educación en Nueva Esparta tuvo un inicio difícil. El mismo Bolívar, en 1827,
          negó la fundación de un Colegio Nacional en el Estado argumentando falta de
          presupuesto. No fue sino hasta 1833 que el Vicepresidente Andrés Narvarte creó el
          Colegio Nacional de Margarita en La Asunción — y tardó casi siete años en abrir
          sus puertas. Tacarigua vivió estas mismas carencias, pero su comunidad nunca dejó
          de luchar por el acceso al conocimiento.
        </p>
        <p>
          <em>
            "…aquellos muchachos con sus silletas al hombro hacia la casa del maestro y
            luego el regreso a casa a buscar pasto a los chivos, agua en los riachuelos y el
            almuerzo al viejo; y los años pasaban con su carga de angustias y tormentos…
            cerro arriba."
          </em>
          <span className={styles.cita}>— Actualización Memoria Histórica, Módulo II: Educación, 2022</span>
        </p>
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
              <div className={styles.educadorAvatar}>👨‍🏫</div>
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
