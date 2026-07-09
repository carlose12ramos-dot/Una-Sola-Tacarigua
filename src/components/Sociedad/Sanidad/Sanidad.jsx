import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Heart } from 'lucide-react';
import styles from './Sanidad.module.css';
import { IMAGES, getImageSrc, getImageAlt } from '../../../data/images';

const historiaAgua = [
  {
    periodo: '1579 – 1927',
    titulo: 'Época de los Manantiales',
    icono: '💧',
    imagen: 'manantial',
    resumen: 'Durante casi 350 años los tacarigüeros dependieron de ríos, pozas y manantiales de la serranía.',
    modalContenido: (
      <>
        <p>
          Durante casi 350 años, los tacarigüeros dependieron de los ríos, riachuelos, pozos, pozas,
          tanquillas y aljibes naturales de la serranía. Los indios Tacaribas, presentes desde hace
          unos 1.500 años, se asentaron en el Valle de los Olleros atraídos por la abundancia de agua
          y la fertilidad de la tierra.
        </p>
        <h4 className={styles.modalSubTitle}>La Poza "La Barca"</h4>
        <p>
          En el sitio conocido como el Copeicillo, ubicado en la montaña Palma Real en el pueblo de
          San Sebastián, se encuentra una famosa poza en medio del riachuelo que baja de su montaña,
          la cual pertenece al Parque Nacional "Jovito Villalba" de la serranía del Copey.
        </p>
        <p>
          El riachuelo baja serpenteante entre las piedras limosas, regando a su paso antiguas y nuevas
          matas de mamey, níspero, aguacate, mango, cocotero, hicacos y otras. En su recorrido cae
          sobre una enorme piedra cavada por el agua a través de muchos años, formando una poza en
          forma de "Barca".
        </p>
        <p>
          Esta formación rocosa abarca una extensión grande y la poza queda en el centro de la misma,
          con un nivel de llenado que llega a la cintura. Para el lejano año de <strong>1890</strong> se
          construyó una represa conocida como Alberca, en la parte de arriba de la poza, para almacenar
          el agua y llevarla por tuberías hasta la Caja Vieja o depósito de agua —la primera obra civil
          construida en el pueblo.
        </p>
        <p>
          La antigua poza lleva el nombre de "Barca" por su parecido a la misma. También se oye decir
          entre los más viejos del pueblo que su nombre viene de la palabra <em>Alberca</em>, que encierra
          o represa el agua, y que luego comenzaron a llamarle Albercón, después Abarcón y con el tiempo
          simplemente "Barca", como se le conoce hoy.
        </p>
      </>
    ),
  },
  {
    periodo: '1889 – 1939',
    titulo: 'Galerías, Cajas y Molinos',
    icono: '⚙️',
    imagen: 'galeria',
    imagenExtra: 'tuberiasCajaAgua',
    resumen: 'Galerías filtrantes excavadas en 1934–1935, molinos de viento y la primera caja de agua del pueblo.',
    modalContenido: (
      <>
        <h4 className={styles.modalSubTitle}>Las Galerías Filtrantes</h4>
        <p>
          En la montaña Palma Real se encuentran dos galerías filtrantes, excavadas en el año 1934
          y finalizadas en 1935. Aún se pueden observar. Las entradas de ambas están hechas con
          concreto armado hasta dos metros, luego sigue la galería excavada al natural. Estas forman
          parte del patrimonio del pueblo de San Sebastián.
        </p>
        <h4 className={styles.modalSubTitle}>La Vieja Caja de Agua</h4>
        <p>
          Antigua y legendaria estructura hecha de ladrillos, piedras y cemento. Ubicada en medio de
          dos cerros, muy cerca del riachuelo "Copeicillo" y no muy lejos del sitio denominado "La Barca".
        </p>
        <p>
          Su construcción se hizo en terrenos de Don Felipe Morao y data del año <strong>1889</strong>, en
          el gobierno del General Juan Pablo Rojas Paúl. En ese mismo año se da inicio a los trabajos del
          Acueducto Tacarigua-Juangriego, siendo ésta la primera obra civil hecha en el pueblo, junto a
          la instalación de las tuberías que bajaban del sitio conocido como "El Carapo", en la montaña
          "Palma Real". Se empleó el sistema de gravedad para llevar el agua fresca y cristalina hasta
          la Caja o depósito de agua, y de allí a pueblos como Juangriego, Los Millanes, La Vecindad,
          Santa Ana, Tacarigua y San Sebastián por espacio de 8 años.
        </p>
        <h4 className={styles.modalSubTitle}>Los Molinos de Viento de Tacarigua</h4>
        <p>
          En la población de Tacarigua, el término se asocia a la memoria histórica de sus viejos molinos
          de viento. Estos molinos se utilizaban para bombear agua salobre desde los pozos subterráneos
          hacia tanques de almacenamiento.
        </p>
        <p>
          <strong>El Molino de Aleja</strong>, situado en el sector Tacarigua-Corazón de Jesús (Calle Principal),
          es uno de los más icónicos y emblemáticos de la zona, conservándose en su lugar como un símbolo
          de la identidad local. También existió el Molino de Las Delicias.
        </p>
      </>
    ),
  },
  {
    periodo: '1960 – Presente',
    titulo: 'Acueducto Submarino',
    icono: '🚰',
    imagen: 'asim',
    resumen: 'El acueducto submarino transformó el acceso al agua en la isla, conectando a Margarita con el continente y permitiendo el desarrollo de la red local de Tacarigua (1962–1964).',
    modalContenido: (
      <>
        <p>
          El acueducto submarino de la Isla de Margarita es la red de tuberías que transporta agua dulce desde
          el estado Sucre (Venezuela) hasta la isla. Su relación directa con Tacarigua radica en que allí se
          construyó un acueducto terrestre (1962–1964) que sirvió de complemento y distribuidor del sistema insular.
        </p>

        <h4 className={styles.modalSubTitle}>El Acueducto Submarino</h4>
        <p>
          <strong>Primer acueducto:</strong> Inaugurado en <strong>1960</strong> por el presidente Rómulo Betancourt,
          atravesó el mar desde la población de Cariaco y el río Carinicuao (Clavellinos), trayendo por primera vez
          agua continental a la isla de forma permanente.
        </p>
        <p>
          <strong>Segundo acueducto «Luisa Cáceres de Arismendi»:</strong> Inaugurado en <strong>1988</strong> por el
          presidente Jaime Lusinchi, trajo agua desde el embalse de Turimiquire, reforzando significativamente el sistema
          y ampliando la capacidad de suministro para toda Margarita y Coche.
        </p>
        <p>
          <strong>Impacto regional:</strong> Permitió conectar a Margarita y Coche con el continente, reemplazando
          definitivamente el suministro de emergencia que anteriormente se hacía mediante barcos cisterna (gabarras),
          lo que representó un salto histórico en la calidad de vida de los isleños.
        </p>

        <h4 className={styles.modalSubTitle}>Relación con Tacarigua</h4>
        <p>
          <strong>El sistema distribuidor:</strong> Entre <strong>1962 y 1964</strong> se construyó la red local de
          Tacarigua, pensada como parte de la infraestructura necesaria para gestionar y canalizar el agua proveniente
          del continente hacia esta zona del municipio Gómez.
        </p>
        <p>
          <strong>Memoria histórica:</strong> Esta conexión fue vital para la región. A nivel local se recuerda con
          especial cariño a figuras como <strong>Emilia José Salinas Ordaz</strong>, apodada la{' '}
          <em>«Reina del Acueducto Submarino de Margarita»</em>, por su histórica labor comunitaria y su incansable
          abogacía por el derecho al agua en esta localidad. Su figura encarna la lucha popular que hizo posible
          llevar este recurso fundamental a cada hogar tacarigüero.
        </p>
      </>
    ),
  },

];

const dispensarios = [
  {
    nombre: 'Dispensarios de la Parroquia',
    imagen: 'centroSaludCpt3',
    descripcion: (
      <>
        <p>
          En el Valle de Tacarigua (Municipio Gómez), en la Isla de Margarita, operan dos centros de atención médica primaria distintos que forman parte de la red de salud pública de Nueva Esparta:
        </p>
        <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div>
            <strong>1. Ambulatorio de San Sebastián (Rural Tipo I)</strong>
            <br />
            <em>Ubicación:</em> Calle San Sebastián, justo al frente de la panadería principal, San Sebastián.
            <br />
            <em>Alcance:</em> Brinda atención de primer nivel, orientada a consultas comunitarias de medicina general, vacunación preventiva y control de pacientes crónicos.
          </div>
          <div>
            <strong>2. Ambulatorio de Tacarigua (Rural Tipo II / Consultorio Popular Tipo 3)</strong>
            <br />
            <em>Ubicación:</em> Calle Guevara, sector Los Andes, al frente de la prefectura de Tacarigua.
            <br />
            <em>Alcance:</em> Al ser Tipo II, suele contar con una infraestructura ligeramente mayor, personal de enfermería continuo y recepción periódica de insumos y jornadas mediante la corporación regional de salud (Corposalud Nueva Esparta).
          </div>
        </div>
      </>
    ),
    tipo: 'Centros de Salud Pública',
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
    resumen: 'Evaristo Rivera fue una figura emblemática de la salud comunitaria en Tacarigua. Reconocido por su vocación de servicio, apoyó activamente las labores de prevención y atención primaria en el pueblo, convirtiéndose en un referente de la memoria sanitaria del Valle de Tacarigua.',
  },
  {
    nombre: 'Esteban Rivera',
    resumen: 'Sobador y curandero destacado, Esteban Rivera fue heredero directo de las tradiciones medicinales guaiqueríes. Con técnicas aprendidas de los antiguos pobladores de la isla, atendía torceduras, zafaduras y picaduras de animales ponzoñosos. Su fama trascendió los límites del pueblo y personas de distintas localidades acudían a él en busca de alivio.',
  },
  {
    nombre: 'Luis Laplana',
    resumen: 'Médico español que marcó un antes y un después en la historia sanitaria de Tacarigua. Ejerció entre 1946 y 1948 como primer médico residente ampliamente recordado por la comunidad. Su presencia representó el inicio de la medicina formal en el pueblo: realizaba visitas a domicilio, asistía partos y brindaba atención general con los escasos recursos de la época.',
  },
  {
    nombre: 'Idahís Marcano',
    resumen: 'Investigadora y asesora indispensable en la documentación de la historia sanitaria de Tacarigua. Prestó servicios en el Dispensario durante 33 años consecutivos, convirtiéndose en la memoria institucional viva de ese centro de salud. Gracias a su labor, se rescataron testimonios, registros y datos que hoy forman parte del acervo histórico del pueblo.',
  },
  {
    nombre: 'Jóvito Antonio Moya',
    resumen: 'Masajista y sobador que aprendió su oficio de un anciano indígena en la Hacienda de Isla de Gato. Jóvito Antonio Moya desarrolló una técnica particular con "Mentol Davis" que le ganó reconocimiento regional: personas desde Anaco hasta California, pasando por El Tigre, cruzaban distancias considerables para ser atendidos por sus manos. Fue una de las figuras más entrañables de la medicina popular tacarigüera.',
  },
  {
    nombre: 'Helvecia Marcano',
    resumen: 'Primera enfermera graduada de origen tacarigüero, egresada en 1954 de una institución formadora de salud. Su titulación fue un hito en la historia local: demostró que las mujeres del pueblo podían alcanzar formación profesional en el área de la salud. Ejerció con devoción y fue pionera en inspirar a futuras generaciones de enfermeras de la Parroquia Guevara.',
  },
];

const Sanidad = () => {
  const [tabActiva, setTabActiva] = useState('agua');
  const [aguaModal, setAguaModal] = useState(null);
  const [personajeModal, setPersonajeModal] = useState(null);
  const [dispensariosData, setDispensariosData] = useState(dispensarios);
  const [medicinaTradData, setMedicinaTradData] = useState(medicinaTrad);
  const [personajesData, setPersonajesData] = useState(personajes);

  useEffect(() => {
    fetch('/api/sociedad/medicina-trad')
      .then(res => res.json())
      .then(data => { if (data?.length) setMedicinaTradData(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/sociedad/personajes')
      .then(res => res.json())
      .then(data => { if (data?.length) setPersonajesData(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/sociedad/sanidad')
      .then(res => res.json())
      .then(data => {
        if (data?.length) {
          const apiItems = data.map(d => ({
            nombre: d.nombre,
            tipo: d.tipo || 'Centro de Salud',
            periodo: '',
            imagen: d.imagen,
            descripcion: (
              <>{d.direccion && <><strong>Dirección:</strong> {d.direccion}<br /></>}{d.horarios && <><strong>Horarios:</strong> {d.horarios}<br /></>}{d.servicios && <><strong>Servicios:</strong> {d.servicios}</>}{!d.direccion && !d.horarios && !d.servicios && 'Sin información adicional disponible.'}</>
            ),
            modalContenido: null,
          }));
          setDispensariosData([...dispensarios, ...apiItems]);
        }
      })
      .catch(() => {});
  }, []);

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
            <Heart size={14} style={{ marginRight: '0.35rem', display: 'inline', verticalAlign: 'middle' }} />
            DOCUMENTO SOCIAL · SANIDAD
          </span>
          <h3 style={{ color: 'var(--goldenrod)', fontWeight: 700, margin: 0, fontSize: '1.15rem' }}>
            Módulos de Sanidad para Descargar
          </h3>
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
            Documentos completos sobre la historia sanitaria de Tacarigua
          </p>
        </div>
        <div className={styles.downloadSection}>
          <motion.a
            href="/MODULO-IV-SANIDAD.pdf"
            download="MODULO-IV-SANIDAD.pdf"
            className={styles.downloadBtn}
            title="Descargar PDF del Módulo IV: Sanidad"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} style={{ marginRight: '0.35rem' }} />
            Módulo IV: Sanidad
          </motion.a>
          <motion.a
            href="/MODULO-IV-SANIDAD-Final.pdf"
            download="MODULO-IV-SANIDAD-Final.pdf"
            className={styles.downloadBtn}
            title="Descargar PDF del Módulo IV: Sanidad (Edición Especial)"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} style={{ marginRight: '0.35rem' }} />
            Sanidad (Edición Especial)
          </motion.a>
        </div>
      </motion.div>

      {/* Sub-navegación */}
      <div className={styles.subTabs}>
        <button className={`${styles.subTab} ${tabActiva === 'agua' ? styles.subTabActive : ''}`} onClick={() => setTabActiva('agua')}>
          💧 Historia del Agua
        </button>
        <button className={`${styles.subTab} ${tabActiva === 'dispensarios' ? styles.subTabActive : ''}`} onClick={() => setTabActiva('dispensarios')}>
          🏥 Dispensarios
        </button>
        <button className={`${styles.subTab} ${tabActiva === 'tradicional' ? styles.subTabActive : ''}`} onClick={() => setTabActiva('tradicional')}>
          🌿 Medicina Tradicional
        </button>
        <button className={`${styles.subTab} ${tabActiva === 'personajes' ? styles.subTabActive : ''}`} onClick={() => setTabActiva('personajes')}>
          👤 Personajes
        </button>
      </div>

      {/* Contenido por pestaña */}
      <div className={styles.tabContent}>
        {tabActiva === 'agua' && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Historia del Agua en Tacarigua (1579 – Presente)</h3>
            <p className={styles.sectionIntro}>
              La serranía tacarigüera, desde el Cerro Pelón hasta la Palma Real, pasando por
              El Manantial de Belén, El Tamoco, Chupacachimbo, El Peñón, la Matica Redonda,
              el Portachuelo, El Rincón, Tibio y La Barca, fue denominada por los primeros
              españoles como "la savaneta del Portezuelo de la Banda del Norte".
            </p>

            {/* Tarjetas con imagen — sin texto, abren modal */}
            <div className={styles.timelineCards}>
              {historiaAgua.map((item, i) => (
                <div key={i} className={styles.timelineCard} onClick={() => setAguaModal(item)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setAguaModal(item)}>
                  <div className={styles.tcImageWrap}>
                    <img
                      src={getImageSrc(item.imagen)}
                      alt={getImageAlt(item.imagen)}
                      className={styles.tcImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.tcBody}>
                    <div className={styles.tcIcon}>{item.icono}</div>
                    <span className={styles.tcPeriodo}>{item.periodo}</span>
                    <h4>{item.titulo}</h4>
                    <p className={styles.tcResumen}>{item.resumen}</p>
                    <span className={styles.tcVerMas}>Ver más →</span>
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
            <div className={styles.dispensarioDestacado}>
              {dispensariosData.map((d, i) => (
                <div key={i} className={styles.dispensarioCardLarge}>
                  {d.imagen && (
                    <div className={styles.dispensarioImageWrap}>
                      <img
                        src={getImageSrc(d.imagen)}
                        alt={getImageAlt(d.imagen)}
                        className={styles.dispensarioImage}
                      />
                    </div>
                  )}
                  <div className={styles.dispensarioCardLargeContent}>
                    <div className={styles.dispensarioHeaderInline}>
                      <span className={styles.dispensarioIconInline}>🏥</span>
                      <h4 className={styles.dispensarioTitleInline}>{d.nombre}</h4>
                    </div>
                    <span className={styles.dispensarioTipo}>{d.tipo}</span>
                    <div className={styles.dispensarioTextLarge}>
                      {d.descripcion}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cardGrid}>
              <div className={styles.dispensarioCard}>
                <div className={styles.dispensarioIcon}>👩‍⚕️</div>
                <h4>Enfermeras de Tacarigua</h4>
                <span className={styles.dispensarioTipo}>Personal de Salud</span>
                <p>Mujeres tacarigüeras que se formaron como enfermeras y dieron brillo a la comunidad con su servicio. Muchas de ellas fueron reconocidas a nivel regional y nacional por su dedicación y vocación humanitaria.</p>
              </div>
              <div className={styles.dispensarioCard}>
                <div className={styles.dispensarioIcon}>👨‍⚕️</div>
                <h4>Médicos Residentes</h4>
                <span className={styles.dispensarioTipo}>Atención Profesional</span>
                <p>Doctores que eligieron residir en Tacarigua para atender directamente a la población, complementando la labor de los dispensarios y las campañas de vacunación.</p>
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
              {medicinaTradData.map((m, i) => (
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
              {personajesData.map((p, i) => (
                <button
                  key={i}
                  className={styles.personajeCard}
                  onClick={() => setPersonajeModal(p)}
                >
                  <div className={styles.personajeAvatar}>{p.nombre.charAt(0)}</div>
                  <span className={styles.personajeNombre}>{p.nombre}</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal Historia del Agua */}
      {aguaModal && (
        <div className={styles.overlay} onClick={() => setAguaModal(null)}>
          <div className={styles.aguaModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setAguaModal(null)}>&times;</button>
            <div className={styles.aguaModalImageWrap}>
              <img src={getImageSrc(aguaModal.imagen)} alt={getImageAlt(aguaModal.imagen)} className={styles.aguaModalImage} />
            </div>
            {aguaModal.imagenExtra && (
              <div className={styles.aguaModalImageWrap} style={{ marginTop: '0.8rem' }}>
                <img src={getImageSrc(aguaModal.imagenExtra)} alt={getImageAlt(aguaModal.imagenExtra)} className={styles.aguaModalImage} />
              </div>
            )}
            <div className={styles.aguaModalBody}>
              <span className={styles.aguaModalPeriodo}>{aguaModal.icono} {aguaModal.periodo}</span>
              <h3 className={styles.aguaModalTitle}>{aguaModal.titulo}</h3>
              <div className={styles.aguaModalContent}>{aguaModal.modalContenido}</div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Personaje */}
      {personajeModal && (
        <div className={styles.overlay} onClick={() => setPersonajeModal(null)}>
          <div className={styles.personajeModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setPersonajeModal(null)}>&times;</button>
            <div className={styles.personajeModalAvatar}>
              {personajeModal.nombre.charAt(0)}
            </div>
            <h3 className={styles.personajeModalTitle}>{personajeModal.nombre}</h3>
            <p className={styles.personajeModalDesc}>{personajeModal.resumen}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sanidad;