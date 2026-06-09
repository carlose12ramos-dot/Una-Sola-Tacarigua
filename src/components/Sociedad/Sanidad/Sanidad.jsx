import React, { useState } from 'react';
import styles from './Sanidad.module.css';

const historiaAgua = [
  {
    periodo: '1579 – 1927',
    titulo: 'Época de los Manantiales',
    descripcion:
      'Durante casi 350 años, los tacarigüeros dependieron de los ríos, riachuelos, pozos, pozas, tanquillas y aljibes naturales de la serranía. Los indios Tacaribas, presentes desde hace unos 1.500 años, se asentaron en el Valle de los Olleros atraídos por la abundancia de agua y la fertilidad de la tierra.',
    icono: '💧',
  },
  {
    periodo: '1927 – 1939',
    titulo: 'Galerías, Cajas y Molinos',
    descripcion:
      'Con el ingreso del siglo XX, se construyeron galerías filtrantes (720m y 780m), cajas recolectoras y molinos de viento. El Molino de Aleja y El Molino de Las Delicias permitían bomber agua para consumo familiar.',
    icono: '⚙️',
  },
  {
    periodo: '1960 – Presente',
    titulo: 'Acueducto Submarino',
    descripcion:
      'La construcción del acueducto submarino marcó un antes y un después. Traía agua desde Sucre (3200 l/s) hasta comunidades como Tacarigua, aunque hoy enfrentamos racionamiento de 25-32 días sin suministro.',
    icono: '🚰',
  },
];

const dispensarios = [
  {
    nombre: 'Dispensario de Tacarigua',
    descripcion:
      'Centro de atención primaria que durante décadas fue el único punto de salud formal en la comunidad. Atendido por médicos residentes y no residentes, junto a enfermeras dedicadas que fueron el pilar de la sanidad local.',
    tipo: 'Centro de Salud',
  },
];

const medicinaTrad = [
  {
    nombre: 'Parteras Tradicionales',
    descripcion:
      'Las parteras de Tacarigua fueron por generaciones las encargadas de traer al mundo a los hijos del pueblo. Con sabiduría ancestral heredada de los Guaiqueríes, atendían partos en los hogares con técnicas transmitidas de madre a hija.',
    icono: '🤱',
  },
  {
    nombre: 'Sobadores y Curanderos',
    descripcion:
      'Los sobadores y curanderos utilizaban hierbas, arbustos y remedios de la serranía tacarigüera para aliviar males. Esta práctica, originada con los indios Tacaribas, perduró como primera línea de salud antes de la llegada de la medicina formal.',
    icono: '🌿',
  },
  {
    nombre: 'Curanderos Emblemáticos',
    descripcion:
      'Ladislao Romero (curaba tifus, tétano, dolores) y Antonio Romero Mata (sobador de huesos, preparaba colirios) fueron figuras destacadas que combinaban oraciones con remedios de monte.',
    icono: '✨',
  },
  {
    nombre: 'Sobadores Legendarios',
    descripcion:
      'Jóvito Antonio Moya (masajista con "Mentol Davis") y Esteban Rivera atendían personas desde Anaco hasta California, curando torceduras, zafaduras y picaduras de animales ponzoñosos.',
    icono: '💪',
  },
];

const personajes = [
  {
    nombre: 'Evaristo Rivera',
    resumen: 'Personaje emblemático de la salud comunitaria en Tacarigua.',
  },
  {
    nombre: 'Esteban Rivera',
    resumen: 'Sobador y curandero destacado, heredero de las tradiciones guaiqueríes.',
  },
  {
    nombre: 'Luis Laplana',
    resumen: 'Médico español que hizo historia en Tacarigua (1946-1948), primer médico residente ampliamente recordado.',
  },
  {
    nombre: 'Idahís Marcano',
    resumen: 'Investigadora y asesora clave en la documentación de la historia sanitaria, 33 años en el Dispensario.',
  },
  {
    nombre: 'Jóvito Antonio Moya',
    resumen: 'Masajista y sobador aprendiz de un viejo indio en la Hacienda de Isla de Gato, atendió desde El Tigre hasta California.',
  },
  {
    nombre: 'Helvecia Marcano',
    resumen: 'Primera enfermera graduada tacarigüera (1954), pionera en la profesión de salud.',
  },
];

const Sanidad = () => {
  const [tabActiva, setTabActiva] = useState('agua');

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Sanidad y Salud</h2>
      </div>

      {/* Presentación */}
      <div className={styles.intro}>
        <p>
          Es posible que la presencia de los indios Tacaribas en el Valle de los Olleros haya
          tenido lugar hace unos 1.500 años. Al llegar al valle, se quedaron: zona fértil, ríos abundantes, clima acogedor. Ahí levantaron sus refugios de palmas y comenzaron a usar arbustos y hierbas para curar sus males.
        </p>
        <p>
          <em>
            "…hasta la llegada de los españoles a nuestros predios, en 1579, los primeros
            habitantes nuestros tenían agua en forma permanente, en abundancia y, por otro
            lado, utilizaban arbustos y hierbas como una manera de curar sus males; así
            empezó la época sanitaria en nuestra región: primitiva y silvestre."
          </em>
        </p>
      </div>

      {/* Botón de Descarga PDF */}
      <div className={styles.downloadSection}>
        <a
          href="/MODULO-IV-SANIDAD.pdf"
          download="MODULO-IV-SANIDAD.pdf"
          className={styles.downloadBtn}
          title="Descargar PDF del Módulo IV: Sanidad"
        >
          📥 Módulo IV: Sanidad
        </a>
        <a
          href="/MODULO-IV-SANIDAD-Final.pdf"
          download="MODULO-IV-SANIDAD-Final.pdf"
          className={styles.downloadBtn}
          title="Descargar PDF del Módulo IV: Sanidad (Edición Especial)"
        >
          📥 Sanidad (Edición Especial)
        </a>
      </div>

      {/* Sub-navegación */}
      <div className={styles.subTabs}>
        <button
          className={`${styles.subTab} ${tabActiva === 'agua' ? styles.subTabActive : ''}`}
          onClick={() => setTabActiva('agua')}
        >
          💧 Historia del Agua
        </button>
        <button
          className={`${styles.subTab} ${tabActiva === 'dispensarios' ? styles.subTabActive : ''}`}
          onClick={() => setTabActiva('dispensarios')}
        >
          🏥 Dispensarios
        </button>
        <button
          className={`${styles.subTab} ${tabActiva === 'tradicional' ? styles.subTabActive : ''}`}
          onClick={() => setTabActiva('tradicional')}
        >
          🌿 Medicina Tradicional
        </button>
        <button
          className={`${styles.subTab} ${tabActiva === 'personajes' ? styles.subTabActive : ''}`}
          onClick={() => setTabActiva('personajes')}
        >
          👤 Personajes
        </button>
      </div>

      {/* Contenido por pestaña */}
      <div className={styles.tabContent}>
        {tabActiva === 'agua' && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Historia del Agua en Tacarigua (1579 – Presente)
            </h3>
            <p className={styles.sectionIntro}>
              La serranía tacarigüera, desde el Cerro Pelón hasta la Palma Real, pasando por
              El Manantial de Belén, El Tamoco, Chupacachimbo, El Peñón, la Matica Redonda,
              el Portachuelo, El Rincón, Tibio y La Barca, fue denominada por los primeros
              españoles como "la savaneta del Portezuelo de la Banda del Norte". Ahí vivían
              los indios Tacaribas, nuestros antepasados.
            </p>
            <div className={styles.timelineCards}>
              {historiaAgua.map((item, i) => (
                <div key={i} className={styles.timelineCard}>
                  <div className={styles.tcIcon}>{item.icono}</div>
                  <div className={styles.tcBody}>
                    <span className={styles.tcPeriodo}>{item.periodo}</span>
                    <h4>{item.titulo}</h4>
                    <p>{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
            <blockquote className={styles.blockquote}>
              "De esta serranía (El Copey) se desprende una fila hacia el oeste del sector que
              separa dos valles: el del norte, regado por el río Tacarigua; y el del sur, costeado
              por los cerros de la Vega de San Juan y el Copey, recorrido por el río San Juan.
              Estos valles son de gran importancia en el sector agrícola de la isla."
              <footer>— Cecilia Ayala Lafée, «La Etno-Historia pre-hispánica Guaiquerí»</footer>
            </blockquote>
          </section>
        )}

        {tabActiva === 'dispensarios' && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Dispensarios y Centros de Salud</h3>
            <p className={styles.sectionIntro}>
              La atención médica formal en Tacarigua comenzó con la instalación de
              dispensarios que fueron atendidos por médicos residentes y no residentes, junto a
              enfermeras que dedicaron su vida al cuidado de la comunidad.
            </p>
            <div className={styles.cardGrid}>
              {dispensarios.map((d, i) => (
                <div key={i} className={styles.dispensarioCard}>
                  <div className={styles.dispensarioIcon}>🏥</div>
                  <h4>{d.nombre}</h4>
                  <span className={styles.dispensarioTipo}>{d.tipo}</span>
                  <p>{d.descripcion}</p>
                </div>
              ))}
              <div className={styles.dispensarioCard}>
                <div className={styles.dispensarioIcon}>👩‍⚕️</div>
                <h4>Enfermeras de Tacarigua</h4>
                <span className={styles.dispensarioTipo}>Personal de Salud</span>
                <p>
                  Mujeres tacarigüeras que se formaron como enfermeras y dieron brillo a la
                  comunidad con su servicio. Muchas de ellas fueron reconocidas a nivel
                  regional y nacional por su dedicación y vocación humanitaria.
                </p>
              </div>
              <div className={styles.dispensarioCard}>
                <div className={styles.dispensarioIcon}>👨‍⚕️</div>
                <h4>Médicos Residentes</h4>
                <span className={styles.dispensarioTipo}>Atención Profesional</span>
                <p>
                  Doctores que eligieron residir en Tacarigua para atender directamente a la
                  población, complementando la labor de los dispensarios y las campañas de
                  vacunación.
                </p>
              </div>
            </div>
          </section>
        )}

        {tabActiva === 'tradicional' && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Medicina Tradicional</h3>
            <p className={styles.sectionIntro}>
              Antes de la medicina formal, Tacarigua contó con curanderos, parteras y
              sobadores que, con sabiduría heredada de los Guaiqueríes, atendían los males
              de la comunidad usando hierbas de la serranía.
            </p>
            <div className={styles.tradGrid}>
              {medicinaTrad.map((m, i) => (
                <div key={i} className={styles.tradCard}>
                  <div className={styles.tradIcon}>{m.icono}</div>
                  <h4>{m.nombre}</h4>
                  <p>{m.descripcion}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {tabActiva === 'personajes' && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Personajes de la Sanidad</h3>
            <p className={styles.sectionIntro}>
              Personas que marcaron rumbo en la historia sanitaria de Tacarigua, asesoraron
              y documentaron situaciones y eventos que hoy son memoria viva de nuestro pueblo.
            </p>
            <div className={styles.personajesList}>
              {personajes.map((p, i) => (
                <div key={i} className={styles.personajeCard}>
                  <div className={styles.personajeAvatar}>
                    {p.nombre.charAt(0)}
                  </div>
                  <div>
                    <h4>{p.nombre}</h4>
                    <p>{p.resumen}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Sanidad;