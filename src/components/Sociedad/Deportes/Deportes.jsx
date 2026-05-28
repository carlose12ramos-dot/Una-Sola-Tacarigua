import React, { useState } from 'react';
import styles from './Deportes.module.css';

const disciplinas = [
  {
    nombre: 'Béisbol',
    icono: '⚾',
    color: 'var(--dep-red)',
    descripcion:
      'En la Isla de Margarita el Béisbol inició oficialmente el 26 de agosto de 1907 en Porlamar, con la fundación del Club "Mariño" por Jesús Carrasquero Ortega y Eduardo Hernández. En Tacarigua, los equipos Los Sapos I y Los Sapos II escribieron capítulos memorables del béisbol aficionado, con no-hit-no-run propinados por Dalmiro Malaver y Félix José Guerra en torneos nacionales.',
    datos: [
      'Club "Mariño" fundado en 1907 en Porlamar',
      'Equipos emblemáticos: Los Sapos I y Los Sapos II',
      'No-hit-no-run de Dalmiro Malaver y Félix José Guerra',
      'Luis Barboza Ortega tradujo las reglas del béisbol al español',
    ],
  },
  {
    nombre: 'Atletismo Olímpico Especial',
    icono: '🏅',
    color: 'var(--dep-gold)',
    descripcion:
      'La hazaña más importante de Tacarigua en el deporte: Nicomedes "Nico" Maza González obtuvo dos Medallas Olímpicas en los Juegos Especiales de Minnesota en 1991. Un logro que llenó de orgullo a toda la comunidad tacarigüera y al estado Nueva Esparta.',
    datos: [
      'Nicomedes "Nico" Maza González',
      '2 Medallas Olímpicas en Juegos Especiales',
      'Minnesota, Estados Unidos, 1991',
      'Mayor logro deportivo individual de Tacarigua',
    ],
  },
  {
    nombre: 'Ciclismo',
    icono: '🚴',
    color: 'var(--dep-green)',
    descripcion:
      'Los "caballitos de hierro" del ciclismo tacarigüero han ganado numerosas carreras en varios sitios del país. El ciclismo se convirtió en una tradición que unía a las familias del pueblo en torno a las competencias locales y regionales.',
    datos: [
      'Conocidos como los "caballitos de hierro"',
      'Múltiples carreras ganadas a nivel nacional',
      'Tradición ciclística arraigada en la comunidad',
    ],
  },
  {
    nombre: 'Maratón',
    icono: '🏃',
    color: 'var(--dep-blue)',
    descripcion:
      'Los maratonistas tacarigüeros han proporcionado innumerables medallas en todo el Estado Nueva Esparta y en el Oriente de Venezuela. La resistencia y el coraje de estos atletas han sido insignia de la comunidad.',
    datos: [
      'Múltiples medallas a nivel estadal y regional',
      'Participación en competencias del Oriente venezolano',
      'Tradición de resistencia y coraje',
    ],
  },
  {
    nombre: 'Softball',
    icono: '🥎',
    color: 'var(--dep-orange)',
    descripcion:
      'El softball llegó como alternativa al béisbol y encontró en Tacarigua tierra fértil para su práctica. Ligas locales organizadas por la comunidad mantuvieron vivo este deporte durante décadas.',
    datos: [
      'Ligas locales comunitarias',
      'Práctica extendida entre jóvenes y adultos',
    ],
  },
  {
    nombre: 'Otros Deportes',
    icono: '🏐',
    color: 'var(--dep-purple)',
    descripcion:
      'Tacarigua también ha brillado en Bowling, Boxeo, Baloncesto, Volleyball y Taekwondo. Cada disciplina ha aportado atletas destacados que han representado dignamente a la comunidad.',
    datos: [
      'Bowling · Boxeo · Baloncesto',
      'Volleyball · Taekwondo',
      'Diversidad deportiva que enorgullece al pueblo',
    ],
  },
];

const Deportes = () => {
  const [deporteActivo, setDeporteActivo] = useState(0);
  const activo = disciplinas[deporteActivo];

  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <img
          src="/images/SaveClip.App_660065822_18062828069682253_632179900671888838_n.jpg"
          alt="Deportes en Tacarigua"
          className={styles.heroImg}
        />
        <div className={styles.heroText}>
          <span className={styles.badge}>Módulo V · Sociedad</span>
          <h2>Deportes y Recreación</h2>
          <p>
            Tacarigua ha sido cuna de atletas excepcionales. A pesar de las carencias,
            sus hijos han construido un historial deportivo con entusiasmo y coraje.
          </p>
        </div>
      </div>

      {/* Cita emblemática */}
      <blockquote className={styles.cita}>
        <p>
          "Tantas victorias y no tenemos un estadio donde practicar nada… nos hemos
          circunscrito a practicar entre cepas de guícheres, entre hierbas de chacaca,
          entre cardones y tunas pero nadie nos quita lo bailao porque somos y estamos
          por encima de los obstáculos que se nos presenten."
        </p>
        <footer>— Memoria Histórica, Módulo V: Deportes, 2022</footer>
      </blockquote>

      {/* Selector de disciplinas */}
      <div className={styles.disciplinasNav}>
        {disciplinas.map((d, i) => (
          <button
            key={i}
            className={`${styles.discBtn} ${deporteActivo === i ? styles.discBtnActive : ''}`}
            onClick={() => setDeporteActivo(i)}
          >
            <span className={styles.discIcon}>{d.icono}</span>
            <span className={styles.discLabel}>{d.nombre}</span>
          </button>
        ))}
      </div>

      {/* Detalle */}
      <div className={styles.detallePanel} key={deporteActivo}>
        <div className={styles.detalleHeader}>
          <span className={styles.detalleEmoji}>{activo.icono}</span>
          <h3>{activo.nombre}</h3>
        </div>
        <p className={styles.detalleDesc}>{activo.descripcion}</p>
        <ul className={styles.datosLista}>
          {activo.datos.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>

      {/* Presentación del módulo */}
      <section className={styles.presentacion}>
        <h3>Espíritu Deportivo Tacarigüero</h3>
        <p>
          El deporte en Tacarigua, como en todos los pueblos de Margarita y Coche, ha sido
          una vía de escape para niños, adolescentes y jóvenes. No importa si es corriendo,
          jugando al béisbol o softball, atravesando calles o montando bicicletas. Los
          tacarigüeros nos alegramos cuando nuestros vecinos salen a la calle a practicar un
          deporte, y ahí descargamos energías, nos reímos, discutimos y regresamos a casa
          pensando en el nuevo amanecer para seguir jugando.
        </p>
        <p>
          Los tacarigüeros hemos sido exitosos en el deporte, a pesar del Instituto Nacional
          de Deporte, a pesar de los Institutos Deportivos Municipales y a pesar de los
          burócratas. Aquí seguimos <em>"subiendo la cuesta"</em> de lo posible, con la
          esperanza en el cuadril de los sueños.
        </p>
      </section>
    </div>
  );
};

export default Deportes;
