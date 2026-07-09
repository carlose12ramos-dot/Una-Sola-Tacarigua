import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Trophy } from 'lucide-react';
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
  const [disciplinasData, setDisciplinasData] = useState(disciplinas);
  const activo = disciplinasData[deporteActivo];

  useEffect(() => {
    fetch('/api/sociedad/deportes')
      .then(res => res.json())
      .then(data => {
        if (data?.length) {
          const apiItems = data.map(d => ({
            nombre: d.disciplina,
            icono: d.icono || '🏅',
            color: d.color_hex || 'var(--dep-gold)',
            descripcion: d.descripcion || '',
            datos: d.hitos_destacados || [],
          }));
          setDisciplinasData(apiItems);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className={styles.container}>
      {/* Título principal */}
      <div className={styles.header}>
        <h2 className={styles.title}>Deportes en Tacarigua</h2>
      </div>

      {/* Intro */}
      <div className={styles.intro}>
        <p>
          El deporte en Tacarigua ha sido un bastión de resistencia, orgullo y recreación.
          Desde el béisbol aficionado con los míticos "Los Sapos" hasta las hazañas olímpicas
          especiales, la comunidad ha encontrado en las diversas disciplinas una vía de
          crecimiento, hermandad y superación ante las adversidades de infraestructura.
        </p>
        <p>
          Cada trofeo, medalla y victoria representa el espíritu indomable de un pueblo que,
          a pesar de las limitaciones de canchas y estadios, entrena con pasión en cualquier
          espacio disponible, llevando el nombre de Tacarigua a lo más alto a nivel nacional
          e internacional.
        </p>
        <p>
          <em>
            "Tantas victorias y no tenemos un estadio donde practicar nada… nos hemos
            circunscrito a practicar entre cepas de guícheres, entre hierbas de chacaca,
            entre cardones y tunas pero nadie nos quita lo bailao porque somos y estamos
            por encima de los obstáculos que se nos presenten."
          </em>
        </p>
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
            <Trophy size={14} style={{ marginRight: '0.35rem', display: 'inline', verticalAlign: 'middle' }} />
            DOCUMENTO SOCIAL · DEPORTES
          </span>
          <h3 style={{ color: 'var(--goldenrod)', fontWeight: 700, margin: 0, fontSize: '1.15rem' }}>
            Módulos de Deportes para Descargar
          </h3>
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
            Documentos completos sobre la historia deportiva de Tacarigua
          </p>
        </div>
        <div className={styles.downloadSection}>
          <motion.a
            href="/MODULO-V-DEPORTES.pdf"
            download="MODULO-V-DEPORTES.pdf"
            className={styles.downloadBtn}
            title="Descargar PDF del Módulo V: Deportes"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} style={{ marginRight: '0.35rem' }} />
            Módulo V: Deportes
          </motion.a>
          <motion.a
            href="/MODULO-V-DEPORTES-Final.pdf"
            download="MODULO-V-DEPORTES-Final.pdf"
            className={styles.downloadBtn}
            title="Descargar PDF del Módulo V: Deportes (Versión Final)"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} style={{ marginRight: '0.35rem' }} />
            Deportes (Versión Final)
          </motion.a>
        </div>
      </motion.div>

      {/* Selector de disciplinas */}
      <div className={styles.disciplinasNav}>
        {disciplinasData.map((d, i) => (
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
