import React, { useState } from 'react';
import styles from './Educacion.module.css';

const escuelas = [
  {
    nombre: 'U.E. Napoleón Narváez',
    nivel: 'Educación Básica',
    descripcion:
      'Una de las instituciones educativas más antiguas de Tacarigua. Lleva el nombre de un ilustre hijo de la tierra tacarigüera y ha formado a generaciones de estudiantes desde sus primeras décadas de funcionamiento.',
    icono: '🏫',
  },
  {
    nombre: 'U.E. Cruz Millán García',
    nivel: 'Educación Básica',
    descripcion:
      'Institución dedicada a la formación integral de niños y jóvenes, en honor al educador Cruz Millán García, quien dejó una profunda huella en la vida escolar de la comunidad tacarigüera.',
    icono: '📚',
  },
  {
    nombre: 'U.E. Divina Pastora',
    nivel: 'Educación Básica',
    descripcion:
      'Con arraigo en la fe y la tradición local, esta escuela ha sido pilar de la formación primaria en el sector sur de Tacarigua, reuniendo a familias de varias generaciones bajo su techo.',
    icono: '✏️',
  },
];

const hitos = [
  {
    año: '1830',
    evento:
      'Venezuela comienza a planificar su sistema educativo con la Constitución de ese año, asignando la Educación Primaria a las Diputaciones Provinciales.',
  },
  {
    año: '1833',
    evento:
      'El Vicepresidente Andrés Narvarte crea el Colegio Nacional de Margarita en La Asunción, primer hito de la educación secundaria en Nueva Esparta.',
  },
  {
    año: '1875',
    evento:
      'Llegan las primeras escuelas formales a Tacarigua, marcando el inicio de la educación popular en la comunidad.',
  },
  {
    año: '1929',
    evento:
      'Consolidación del sistema escolar tacarigüero con la presencia de maestros normalistas que elevan el nivel educativo de la población.',
  },
  {
    año: '1951–1964',
    evento:
      'Era de los Maestros Normalistas. Educadores de alta vocación transforman las escuelas de Tacarigua, sentando bases sólidas para las generaciones venideras.',
  },
];

const educadores = [
  {
    nombre: 'Ignacio Jiménez',
    descripcion:
      'Figura clave en la educación tacarigüera del siglo XIX. Sus rasgos biográficos son testimonio del sacrificio y la vocación de los primeros maestros de la comunidad.',
  },
  {
    nombre: 'Maestros Normalistas (1951–1964)',
    descripcion:
      'Un grupo de docentes formados en las Escuelas Normales del país que llegaron a Tacarigua y transformaron la enseñanza con metodología y dedicación ejemplar.',
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
          src="/images/SaveClip.App_649857402_17940416358159625_3299975488844600819_n.jpg"
          alt="Educación en Tacarigua"
          className={styles.heroImg}
        />
        <div className={styles.heroText}>
          <span className={styles.badge}>Módulo II · Sociedad</span>
          <h2>Educación en Tacarigua</h2>
          <p>
            Desde 1875, Tacarigua ha construido su historia educativa con el esfuerzo de
            maestros, familias y comunidades enteras. Un camino de conocimiento que parte
            desde la enseñanza bajo los cerros hasta las aulas modernas de hoy.
          </p>
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
