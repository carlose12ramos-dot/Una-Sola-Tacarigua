import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();

let total = 0;

try {
  await client.query('BEGIN');

  // =============================================
  // ACTUALIZAR SOCIEDAD_EDUCACION (4 escuelas del frontend original)
  // =============================================
  console.log('📋 Actualizando sociedad_educacion...');
  await client.query('TRUNCATE TABLE sociedad_educacion RESTART IDENTITY CASCADE');
  const escuelas = [
    { nombre: 'U.E. "Napoleón Narváez"', nivel: 'Educación Inicial y Básica', descripcion: 'Fundada en 1946. Lleva el nombre del ilustre historiador neoespartano Napoleón Narváez. Ha formado generaciones de tacarigüeros y cuenta con biblioteca escolar desde 1987. Ubicada en la Calle Principal de Tacarigua.', icono: '🏫', imagen: 'escuelaNapoleonNarvaez' },
    { nombre: 'U.E.E. "Cruz Millán García"', nivel: 'Educación Inicial, Básica y Media General', descripcion: 'La U.E.E. Cruz Millán García (Unidad Educativa Estadal Cruz Millán García) es una institución pública de educación básica y media general. Fue fundada en enero de 1963. Su historia se remonta a 1931 cuando inició como la Escuela Mixta Nº 26. Ubicada en el Valle de San Sebastián, en el Municipio Gómez del Estado Nueva Esparta, Venezuela.', icono: '🏫', imagen: 'escuelaCruzMillanGarcia' },
    { nombre: 'U.E. "Roraima"', nivel: 'Educación Inicial, Básica y Media General', descripcion: 'La Unidad Educativa Roraima es un prestigioso colegio privado bilingüe ubicado en la Calle Principal de Tacariguita, Municipio Gómez, Estado Nueva Esparta. Ofrece formación integral (Educación Inicial, Primaria y Media General) enfocada en la libertad, el contacto con la naturaleza y la diversión.', icono: '📖', imagen: 'escuelaRoraima' },
    { nombre: 'U.E. "Colegio Divina Pastora"', nivel: 'Educación Inicial, Básica y Media General', descripcion: 'Fundada el 23 de septiembre de 1993 por la Licenciada Yumeli Rivera Núñez. Proyecto educativo privado basado en valores cristianos y humanos, con una pedagogía participativa y progresista. Ubicado en la Vía Principal de Tacarigua.', icono: '✏️', imagen: 'colegioDivinaPastora' },
  ];
  for (let i = 0; i < escuelas.length; i++) {
    const e = escuelas[i];
    await client.query(
      'INSERT INTO sociedad_educacion (nombre, nivel, descripcion, icono, imagen, activo, orden) VALUES ($1,$2,$3,$4,$5,true,$6)',
      [e.nombre, e.nivel, e.descripcion, e.icono, e.imagen, i + 1]
    );
  }
  console.log(`  ✓ ${escuelas.length} escuelas`);
  total += escuelas.length;

  // =============================================
  // ACTUALIZAR SOCIEDAD_EDUCADORES (7 del frontend original con HTML)
  // =============================================
  console.log('📋 Actualizando sociedad_educadores...');
  await client.query('TRUNCATE TABLE sociedad_educadores RESTART IDENTITY CASCADE');
  const educadores = [
    {
      nombre: 'Evaristo Alfonzo Guerra',
      apodo: 'Profesor "Lico"',
      imagen: 'evaristoAlfonzo',
      descripcion: 'Primer Profesional Universitario de la Parroquia Guevara, Municipio Gómez, Estado Nueva Esparta. Profesor de Biología y Química graduado en el Instituto Pedagógico de Caracas en julio de 1949. Ejerció en varias instituciones, destacando en el Colegio San Pablo de Caracas, donde fue Director.',
      detalles_html: '<p>En la Parroquia Guevara, municipio Gómez del estado Nueva Esparta, la Humildad duerme en cada quicio y cada estera; sueña con cosas hermosas y no solo se aferra a la esperanza sino que duerme con ella, lucha por ella y se sacrifica por ella…. amor del bueno. Evaristo Alfonzo Guerra es de los nuestros, con la Humildad con mayúscula, sueños al aire, visión de alguien en la vida y misión de luchar por sus sueños.</p><p>Nació el 27 de octubre de 1922 en nuestra población de Tacarigua - San Sebastián, del vientre de Atanasia Guerra, vecina del lugar, y de la varonilidad de Emilio Alfonzo, agricultor del antiguo Caserío El Río. Sus padrinos fueron Juan Romero y Catalina Moya.</p><h4>Infancia y Formación</h4><p>Su infancia transcurrió en su pueblo natal hasta que, a los 7 años de edad, fue inscrito en la Escuela Estadal N° 43, en Tacarigua San Sebastián bajo la dirección de la Preceptora Magdalena Piñerúa. Esta era una Escuela de Varones Diurna con un presupuesto de Bs. 60 y la asistencia de unos 42 estudiantes. En esa escuela estuvo hasta aprobar el 4to grado, cuando fue trasladado a Santa Ana del Norte en septiembre de 1934, a la Escuela Federal EF-9 bajo la dirección de Víctor Aumaitre Villarroel.</p><p>Luego de obtener su sexto grado, pidió a su madre continuar estudiando y fue inscrito en el Liceo "Francisco Antonio Rísquez", donde estudió hasta 4to año en 1938.</p><h4>Primeros Pasos como Maestro</h4><p>En el año 1939, estando en su población natal, reemplazó a Pablito Romero Millán en la Escuela Estadal de Varones Diurna N° 8, según la Gaceta Oficial N° 532 del 14-09-1939. Una semana más tarde, el 21 de septiembre de 1939, fue nombrado como Maestro de la Escuela Estadal Varones Diurna N° 117 en Carapacho (Municipio Díaz), en reemplazo de Ana Luisa Heredia (Gaceta Oficial N° 567 del 21-09-1939). No obstante, ese cambio no fue de su agrado y renunció al mismo el 2 de octubre, según la Gaceta Oficial N° 569.</p><h4>Estudios en Caracas y Título Universitario</h4><p>Posteriormente, se trasladó a Puerto Cabello, donde estaba su padre, y luego a Caracas, donde cursó estudios en el Colegio La Salle. En ese instituto se graduó de Bachiller en Ciencias Biológicas en el lapso 1943-1944.</p><p>El 24 de septiembre de 1945 se inscribió en el Instituto Pedagógico de Caracas, identificado con la cédula de identidad N° V-89.751. Tras culminar su carrera, se graduó como <strong>Profesor en Biología y Química en julio de 1949</strong>, logro que lo cataloga históricamente como el <strong>primer Profesional Universitario de la Parroquia Guevara</strong>.</p><h4>Carrera Profesional y Legado</h4><p>El Profesor "Lico" inició su carrera como Educador en varias instituciones educativas de la capital, entre las cuales destaca principalmente el Colegio San Pablo, donde tuvo una ejemplar trayectoria hasta llegar a ser Director de la institución.</p><p>El Profesor Evaristo falleció en Caracas el 15 de marzo de 1992, sin dejar descendencia pero con el corazón henchido de satisfacciones al comprobar que su obra educativa y su ejemplo fueron de una dimensión extraordinaria. ¡Gloria al Profesor Evaristo Alfonzo!</p>'
    },
    { nombre: 'Ignacio Jiménez', apodo: null, imagen: null, descripcion: 'Primer preceptor oficial de la Escuela Federal N° 860 (1875–1883). El "Apóstol de la Educación Tacarigüera" falleció joven a los 29 años, dejando el legado que hizo de Tacarigua "La Atenas Neoespartana".', detalles_html: null },
    { nombre: 'Napoleón Narváez', apodo: null, imagen: null, descripcion: 'Historiador neoespartano epónimo de la escuela fundada en 1946. Documentó la historia de Margarita y Tacarigua, incluyendo la participación de José Jesús Guevara en el Congreso de Angostura.', detalles_html: null },
    { nombre: 'Toñito Millán', apodo: null, imagen: null, descripcion: 'Primer Maestro Normalista tacarigüero (1951). Su espíritu libertario lo llevó a combatir a Pérez Jiménez y posteriormente ejercer en El Tigre y Valencia. Homenajeado como Ciudadano Ejemplar.', detalles_html: null },
    { nombre: 'Juana María Gil Ordaz', apodo: null, imagen: null, descripcion: 'Maestra Normalista graduada (1961) que ejerció como Directora en la Escuela "Napoleón Narváez". Condecorada con la "Orden Víctor Aumaitre Villarroel" por sus 36 años de servicio educativo.', detalles_html: null },
    { nombre: 'Agustín Landaeta', apodo: null, imagen: null, descripcion: 'Maestro Normalista (1963) y Licenciado en Educación (1990). Director de escuelas en San Sebastián y lideró el Grupo Escolar "Nuestra Señora de La Asunción". Fue SubDirector desde 1994.', detalles_html: null },
    { nombre: 'Florentino Larez', apodo: null, imagen: null, descripcion: 'Maestro Normalista (1961) que ejerció en San Antonio de Irapa y luego en Porlamar y Santa Ana. Fundador del periódico "Los Ángeles" y pionero en agrupaciones musicales. Jubilado en 1986.', detalles_html: null },
  ];
  for (let i = 0; i < educadores.length; i++) {
    const e = educadores[i];
    await client.query(
      'INSERT INTO sociedad_educadores (nombre, apodo, imagen, descripcion, detalles_html, activo, orden) VALUES ($1,$2,$3,$4,$5,true,$6)',
      [e.nombre, e.apodo, e.imagen, e.descripcion, e.detalles_html, i + 1]
    );
  }
  console.log(`  ✓ ${educadores.length} educadores`);
  total += educadores.length;

  // =============================================
  // ACTUALIZAR SOCIEDAD_MEDICINA_TRAD (4 con emojis originales)
  // =============================================
  console.log('📋 Actualizando sociedad_medicina_trad...');
  await client.query('TRUNCATE TABLE sociedad_medicina_trad RESTART IDENTITY CASCADE');
  const medTrad = [
    { nombre: 'Parteras Tradicionales', descripcion: 'Las parteras de Tacarigua fueron por generaciones las encargadas de traer al mundo a los hijos del pueblo. Con sabiduría ancestral heredada de los Guaiqueríes, atendían partos en los hogares con técnicas transmitidas de madre a hija.', icono: '🤱' },
    { nombre: 'Sobadores y Curanderos', descripcion: 'Los sobadores y curanderos utilizaban hierbas, arbustos y remedios de la serranía tacarigüera para aliviar males. Esta práctica, originada con los indios Tacaribas, perduró como primera línea de salud antes de la llegada de la medicina formal.', icono: '🌿' },
    { nombre: 'Curanderos Emblemáticos', descripcion: 'Ladislao Romero (curaba tifus, tétano, dolores) y Antonio Romero Mata (sobador de huesos, preparaba colirios) fueron figuras destacadas que combinaban oraciones con remedios de monte.', icono: '✨' },
    { nombre: 'Sobadores Legendarios', descripcion: 'Jóvito Antonio Moya (masajista con "Mentol Davis") y Esteban Rivera atendían personas desde Anaco hasta California, curando torceduras, zafaduras y picaduras de animales ponzoñosos.', icono: '💪' },
  ];
  for (let i = 0; i < medTrad.length; i++) {
    const m = medTrad[i];
    await client.query(
      'INSERT INTO sociedad_medicina_trad (nombre, descripcion, icono, activo, orden) VALUES ($1,$2,$3,true,$4)',
      [m.nombre, m.descripcion, m.icono, i + 1]
    );
  }
  console.log(`  ✓ ${medTrad.length} medicina tradicional`);
  total += medTrad.length;

  // =============================================
  // ACTUALIZAR SOCIEDAD_PERSONAJES (6 del frontend original)
  // =============================================
  console.log('📋 Actualizando sociedad_personajes...');
  await client.query('TRUNCATE TABLE sociedad_personajes RESTART IDENTITY CASCADE');
  const personajes = [
    { nombre: 'Evaristo Rivera', resumen: 'Evaristo Rivera fue una figura emblemática de la salud comunitaria en Tacarigua. Reconocido por su vocación de servicio, apoyó activamente las labores de prevención y atención primaria en el pueblo, convirtiéndose en un referente de la memoria sanitaria del Valle de Tacarigua.' },
    { nombre: 'Esteban Rivera', resumen: 'Sobador y curandero destacado, Esteban Rivera fue heredero directo de las tradiciones medicinales guaiqueríes. Con técnicas aprendidas de los antiguos pobladores de la isla, atendía torceduras, zafaduras y picaduras de animales ponzoñosos. Su fama trascendió los límites del pueblo y personas de distintas localidades acudían a él en busca de alivio.' },
    { nombre: 'Luis Laplana', resumen: 'Médico español que marcó un antes y un después en la historia sanitaria de Tacarigua. Ejerció entre 1946 y 1948 como primer médico residente ampliamente recordado por la comunidad. Su presencia representó el inicio de la medicina formal en el pueblo: realizaba visitas a domicilio, asistía partos y brindaba atención general con los escasos recursos de la época.' },
    { nombre: 'Idahís Marcano', resumen: 'Investigadora y asesora indispensable en la documentación de la historia sanitaria de Tacarigua. Prestó servicios en el Dispensario durante 33 años consecutivos, convirtiéndose en la memoria institucional viva de ese centro de salud. Gracias a su labor, se rescataron testimonios, registros y datos que hoy forman parte del acervo histórico del pueblo.' },
    { nombre: 'Jóvito Antonio Moya', resumen: 'Masajista y sobador que aprendió su oficio de un anciano indígena en la Hacienda de Isla de Gato. Jóvito Antonio Moya desarrolló una técnica particular con "Mentol Davis" que le ganó reconocimiento regional: personas desde Anaco hasta California, pasando por El Tigre, cruzaban distancias considerables para ser atendidos por sus manos. Fue una de las figuras más entrañables de la medicina popular tacarigüera.' },
    { nombre: 'Helvecia Marcano', resumen: 'Primera enfermera graduada de origen tacarigüero, egresada en 1954 de una institución formadora de salud. Su titulación fue un hito en la historia local: demostró que las mujeres del pueblo podían alcanzar formación profesional en el área de la salud. Ejerció con devoción y fue pionera en inspirar a futuras generaciones de enfermeras de la Parroquia Guevara.' },
  ];
  for (let i = 0; i < personajes.length; i++) {
    const p = personajes[i];
    await client.query(
      'INSERT INTO sociedad_personajes (nombre, resumen, activo, orden) VALUES ($1,$2,true,$3)',
      [p.nombre, p.resumen, i + 1]
    );
  }
  console.log(`  ✓ ${personajes.length} personajes`);
  total += personajes.length;

  // =============================================
  // ACTUALIZAR SOCIEDAD_DEPORTES (6 con emojis + hitos originales)
  // =============================================
  console.log('📋 Actualizando sociedad_deportes...');
  await client.query('TRUNCATE TABLE sociedad_deportes RESTART IDENTITY CASCADE');
  const deportes = [
    { disciplina: 'Béisbol', icono: '⚾', color_hex: '#d4183d', descripcion: 'En la Isla de Margarita el Béisbol inició oficialmente el 26 de agosto de 1907 en Porlamar, con la fundación del Club "Mariño" por Jesús Carrasquero Ortega y Eduardo Hernández. En Tacarigua, los equipos Los Sapos I y Los Sapos II escribieron capítulos memorables del béisbol aficionado, con no-hit-no-run propinados por Dalmiro Malaver y Félix José Guerra en torneos nacionales.', hitos_destacados: JSON.stringify(['Club "Mariño" fundado en 1907 en Porlamar', 'Equipos emblemáticos: Los Sapos I y Los Sapos II', 'No-hit-no-run de Dalmiro Malaver y Félix José Guerra', 'Luis Barboza Ortega tradujo las reglas del béisbol al español']) },
    { disciplina: 'Atletismo Olímpico Especial', icono: '🏅', color_hex: '#bc6c25', descripcion: 'La hazaña más importante de Tacarigua en el deporte: Nicomedes "Nico" Maza González obtuvo dos Medallas Olímpicas en los Juegos Especiales de Minnesota en 1991. Un logro que llenó de orgullo a toda la comunidad tacarigüera y al estado Nueva Esparta.', hitos_destacados: JSON.stringify(['Nicomedes "Nico" Maza González', '2 Medallas Olímpicas en Juegos Especiales', 'Minnesota, Estados Unidos, 1991', 'Mayor logro deportivo individual de Tacarigua']) },
    { disciplina: 'Ciclismo', icono: '🚴', color_hex: '#2b9348', descripcion: 'Los "caballitos de hierro" del ciclismo tacarigüero han ganado numerosas carreras en varios sitios del país. El ciclismo se convirtió en una tradición que unía a las familias del pueblo en torno a las competencias locales y regionales.', hitos_destacados: JSON.stringify(['Conocidos como los "caballitos de hierro"', 'Múltiples carreras ganadas a nivel nacional', 'Tradición ciclística arraigada en la comunidad']) },
    { disciplina: 'Maratón', icono: '🏃', color_hex: '#0077b6', descripcion: 'Los maratonistas tacarigüeros han proporcionado innumerables medallas en todo el Estado Nueva Esparta y en el Oriente de Venezuela. La resistencia y el coraje de estos atletas han sido insignia de la comunidad.', hitos_destacados: JSON.stringify(['Múltiples medallas a nivel estadal y regional', 'Participación en competencias del Oriente venezolano', 'Tradición de resistencia y coraje']) },
    { disciplina: 'Softball', icono: '🥎', color_hex: '#e9c46a', descripcion: 'El softball llegó como alternativa al béisbol y encontró en Tacarigua tierra fértil para su práctica. Ligas locales organizadas por la comunidad mantuvieron vivo este deporte durante décadas.', hitos_destacados: JSON.stringify(['Ligas locales comunitarias', 'Práctica extendida entre jóvenes y adultos']) },
    { disciplina: 'Otros Deportes', icono: '🏐', color_hex: '#6f42c1', descripcion: 'Tacarigua también ha brillado en Bowling, Boxeo, Baloncesto, Volleyball y Taekwondo. Cada disciplina ha aportado atletas destacados que han representado dignamente a la comunidad.', hitos_destacados: JSON.stringify(['Bowling · Boxeo · Baloncesto', 'Volleyball · Taekwondo', 'Diversidad deportiva que enorgullece al pueblo']) },
  ];
  for (let i = 0; i < deportes.length; i++) {
    const d = deportes[i];
    await client.query(
      'INSERT INTO sociedad_deportes (disciplina, icono, color_hex, descripcion, hitos_destacados, activo, orden) VALUES ($1,$2,$3,$4,$5,true,$6)',
      [d.disciplina, d.icono, d.color_hex, d.descripcion, d.hitos_destacados, i + 1]
    );
  }
  console.log(`  ✓ ${deportes.length} disciplinas`);
  total += deportes.length;

  // =============================================
  // ACTUALIZAR SOCIEDAD_EDUCACION_HITOS (13 del frontend original)
  // =============================================
  console.log('📋 Actualizando sociedad_educacion_hitos...');
  await client.query('TRUNCATE TABLE sociedad_educacion_hitos RESTART IDENTITY CASCADE');
  const hitosEdu = [
    { anio: '1870', evento: 'Firma del Decreto de Instrucción Pública Gratuita y Obligatoria por el presidente Antonio Guzmán Blanco el 27 de junio de 1870, sentando la base legal para las escuelas oficiales.' },
    { anio: '1875', evento: 'El 12 de julio de 1875 se inaugura la Escuela Federal Diurna de Varones N° 860 en Tacarigua (Resolución N° 20). Su primer preceptor/maestro fue Ignacio Jiménez, con 42 alumnos.' },
    { anio: '1897', evento: 'Reapertura de la Escuela Federal de Varones N° 860, renombrada como Escuela Federal N° 1550 de Hembras Diurna, abriendo el acceso formal para las mujeres del pueblo bajo la dirección de Anastasia Rivero.' },
    { anio: '1934', evento: 'El 20 de octubre de 1934 se nombra a Cándido Sánchez como maestro de la Escuela Nocturna N° 8 de Tacarigua.' },
    { anio: '1939', evento: 'El 14 de septiembre de 1939 (según Gaceta Oficial N° 532) se nombra a nuevos educadores, incluyendo a Evaristo Alfonzo Guerra en la Escuela Nocturna N° 8 (o de Varones Diurna N° 8) en Corazón de Jesús, Tacarigua.' },
    { anio: '1946', evento: 'El 16 de septiembre de 1946 se funda el Grupo Escolar / Escuela Napoleón Narváez mediante la fusión de la Escuela Federal N° 651 de Varones, la Escuela Federal N° 1354 de Hembras y la Escuela Estadal N° 18 Nocturna de Adultos, con el impulso de Luis Beltrán Rivero Millán y Pablo Romero Millán.' },
    { anio: '1949', evento: 'Evaristo Alfonzo Guerra «Lico» se gradúa como Licenciado en Química en la Universidad Central de Venezuela (UCV), convirtiéndose en el primer universitario graduado originario de Tacarigua.' },
    { anio: '1951', evento: 'En julio de 1951, Antonio «Toñito» Millán Guerra se gradúa como el primer Maestro Normalista nacido en Tacarigua, obteniendo su título en la Escuela Normal "El Mácaro" de Maracay a los 17 años.' },
    { anio: '1954', evento: 'En julio de 1954, Helvecia Marcano González se gradúa como la primera enfermera profesional originaria de Tacarigua, en la Escuela de Enfermeras "Domingo Badaracco Bermúdez" de Cumaná.' },
    { anio: '1961', evento: 'Florentino Lárez (egresado de la Escuela Normal "Miguel Suniaga") y Juana María Gil Ordaz (quien obtuvo su título tras equivalencias en el Liceo "Francisco Antonio Rísquez") se gradúan como Maestros Normalistas.' },
    { anio: '1963', evento: 'Se inaugura el edificio de la Escuela San Sebastián en el sector Tacarigua (posteriormente renombrada "Cruz Millán García" en honor a su célebre educador).' },
    { anio: '1990', evento: 'Agustín Landaeta obtiene su Licenciatura en Educación, completando su formación docente y continuando su trayectoria como subdirector desde 1994.' },
    { anio: '1993', evento: 'El 23 de septiembre de 1993, la Licenciada Yumeli Rivera Núñez funda el Colegio Divina Pastora, enfocado en valores cristianos y pedagogía participativa.' },
  ];
  for (let i = 0; i < hitosEdu.length; i++) {
    const h = hitosEdu[i];
    await client.query(
      'INSERT INTO sociedad_educacion_hitos (anio, evento, activo, orden) VALUES ($1,$2,true,$3)',
      [h.anio, h.evento, i + 1]
    );
  }
  console.log(`  ✓ ${hitosEdu.length} hitos educativos`);
  total += hitosEdu.length;

  // =============================================
  // ACTUALIZAR CULTURA_CENTROS (3 con HTML del frontend original)
  // =============================================
  console.log('📋 Actualizando cultura_centros...');
  await client.query('TRUNCATE TABLE cultura_centros RESTART IDENTITY CASCADE');
  const centros = [
    {
      titulo: 'Movimiento Cultural Tacarigua Adentro (MOCULTA)',
      subtitulo: 'Fundado el 19 de abril de 1985',
      resumen: 'Salvaguarda de la identidad, cotidianidad, deporte y expresiones folclóricas de San Sebastián de Tacarigua.',
      contenido_html: '<p><strong>Fecha de fundación:</strong> 19 de abril de 1985</p><p><strong>Lugar:</strong> Sector San Sebastián de Tacarigua, Municipio Gómez, Isla de Margarita</p><p><strong>Sede física:</strong> Terrenos donados por la familia de Antonia Quijada de Cova</p><p><strong>Misión:</strong> Salvaguarda de la identidad, cotidianidad, deporte y expresiones folclóricas del gentilicio "sebastino"</p><h4>1. Origen y Contexto de la Fundación</h4><p>El Movimiento Cultural Tacarigua Adentro (MOCULTA) nació formalmente la noche del 19 de abril de 1985. La asamblea constitutiva se llevó a cabo en la residencia del vecino Jesús Linares, ubicada en el sector San Sebastián.</p><p>La organización no surgió de forma aislada, sino como una respuesta comunitaria a una necesidad institucional: el Comité Organizador de las Fiestas de San Sebastián requería de un brazo popular, operativo y vecinal de carácter permanente. Este apéndice civil se diseñó específicamente para coordinar y ejecutar con mayor eficiencia los eventos culturales, recreativos y deportivos de las festividades patronales del pueblo.</p><h4>2. Fundadores y Primera Junta Directiva</h4><p>La iniciativa fue respaldada, firmada y ejecutada por un grupo de 17 cultores y vecinos fundadores de la localidad: Hilario González, Jesús Linares (anfitrión), Erasmo Ramos, Saturnino González, Francisco Ramos, Bartolo Alfonzo, Andrés Rivas, Hernán Malaver, José Alfonzo, Modesto Rivas, Luis Quijada, José Gregorio Alfonzo, Yuraima Da Silva, Diomira Campos, Victoria Rojas, Carmen González, Gregoria Montaño.</p><p>Para la operatividad inicial del movimiento, se estructuró la primera junta de coordinadores: <strong>Director General:</strong> Bartolo Alfonzo Moya; <strong>Director de Investigaciones:</strong> Hernán José Malaver; <strong>Director de Promoción:</strong> José Antonio Lista.</p><h4>3. Evolución y Consolidación Institucional</h4><p>Rápidamente, MOCULTA rebasó sus objetivos iniciales de trabajar únicamente durante las fiestas de San Sebastián. Se transformó en un movimiento autónomo activo durante todo el año, dedicado a frenar la pérdida de identidad local frente a corrientes culturales foráneas.</p><p>A lo largo de las décadas, la conducción histórica del movimiento ha recaído sobre directores de comprobada trayectoria comunitaria, entre quienes destacan: Mario Gabriel Alfonzo, Bubo Malaver, Petra González Malaver, Juan González.</p><h4>4. Hitos y Proyección Artística Regional</h4><p>MOCULTA diversificó sus esfuerzos para involucrar activamente a la juventud del municipio, logrando dos grandes proyectos que marcaron la historia cultural de la Isla de Margarita:</p><ul><li><strong>El Grupo de Teatro "Guaitoroco":</strong> Fundado el 15 de abril de 1986 bajo la dirección artística de Hernán Malaver y Mario Alfonzo. Esta agrupación se convirtió en un pilar tradicional de la región al escenificar en vivo la Pasión y Muerte de Jesús durante la Semana Santa. El proyecto llegó a movilizar elencos masivos de hasta 100 jóvenes locales y se mantuvo en escena de forma ininterrumpida por una década.</li><li><strong>Escuela Tradicional de Cantos "Hernán Malaver":</strong> Espacio creado para preservar y enseñar las estructuras musicales tradicionales margariteñas, tales como el galerón, las parrandas y los cantos de faena tradicionales, garantizando el relevo generacional de los cultores locales.</li></ul><h4>5. Reconocimiento y Legado Actual</h4><p>El impacto social de MOCULTA ha sido validado formalmente por los poderes públicos del estado Nueva Esparta. Al cumplir sus aniversarios más destacados, la Cámara Municipal del Municipio Gómez ha trasladado sus funciones para realizar sesiones especiales solemnes dentro de la sede propia de la institución para condecorar a sus miembros.</p><p>Hoy en día, el movimiento trabaja en estrecha alianza con centros de investigación de la memoria regional, tales como la Fundación Cheguaco y el equipo del Proyecto Tacarigua Histórica, manteniéndose como un modelo de gestión cultural comunitaria autogestionada en el oriente venezolano.</p>',
      imagen: '/images/Moculta.png',
      imagen_logo: '/images/logomoculta.png',
    },
    {
      titulo: 'Casa de la Cultura "Poeta Pedro Rivero Navarro"',
      subtitulo: 'Centro Artístico de Tacarigua',
      resumen: 'Complejo cultural dotado de concha acústica y sede oficial del Comité de Desarrollo Cultural.',
      contenido_html: '<p><strong>Ubicación:</strong> Tacarigua, Municipio Gómez, Isla de Margarita, Estado Nueva Esparta, Venezuela</p><p><strong>Institución Gestora:</strong> Comité de Desarrollo Cultural de Tacarigua (C.D.C.)</p><p><strong>Eje Central:</strong> Preservación del patrimonio, las artes plásticas, el galerón y las letras neoespartanas</p><h4>1. Origen y Contexto (Década de 1960 y 1970)</h4><p>La creación de la Casa de la Cultura "Poeta Pedro Rivero Navarro" está ligada a la fundación del Comité de Desarrollo Cultural de Tacarigua (C.D.C.) en agosto de 1968. El C.D.C. nació como un movimiento vecinal para canalizar la profunda vocación artística, literaria y musical de la población tacarigüera.</p><p>Hacia principios de la década de 1970, la dirección del C.D.C. y el liderazgo del Ingeniero Pedro Rivero Núñez impulsaron el diseño y edificación de un complejo físico permanente que sirviera como epicentro para el desarrollo de las artes en la región. Fue así como se inauguró la sede oficial, equipada no solo con salones de reuniones, sino también con una concha acústica y una cancha deportiva para uso comunitario.</p><h4>2. Epónimo: ¿Quién fue Pedro Rivero Navarro?</h4><p>La institución fue bautizada en honor al célebre poeta, periodista y diplomático margariteño Pedro Rivero Navarro, nacido en Porlamar en 1893 y fallecido trágicamente en Madrid, España, el 7 de enero de 1959.</p><p>Rivero Navarro fue una de las plumas más refinadas del oriente venezolano, fundador del periódico Génesis (1909) y autor de obras fundamentales de la poesía marina como El Mar de las Perlas y El Pescador de Ánforas. Su vinculación espiritual con Tacarigua y su legado intelectual hicieron que el pueblo adoptara su nombre como símbolo de su faro cultural.</p><h4>3. Cronología de Directores Históricos</h4><p>A lo largo de sus más de 50 años de trayectoria institucional, la Casa de la Cultura ha mantenido sus puertas abiertas bajo la guía de destacados defensores del folclore insular: José Rosa Acosta (1973–1974), Juan Morales Pérez (1974–1979), <strong>Pablo Romero Millán (1979–1993)</strong>, Eligio González (1993–1996), Ambrosio Cabrera (1996–2002), Luzminia Fuentes (2003–2018), Félix Gil Gil (2018–presente).</p><h4>4. Impacto Social y Programas Permanentes</h4><p>La Casa de la Cultura no es solo un monumento histórico, sino un espacio vivo en constante articulación con organismos como el Instituto Autónomo de Cultura del Estado Nueva Esparta (Iacene). Entre sus principales aportes destacan: <strong>Escuela de Cantos Tradicionales:</strong> Dirigida por maestros locales (como el profesor Eliut González), se encarga de instruir de manera gratuita a niños y jóvenes en la ejecución del galerón y los cantos tradicionales de faena. <strong>Planes Vacacionales y Educativos:</strong> Desde hace décadas coordina actividades junto a la comunidad ("Descubre las Maravillas de Nuestra Isla") para fomentar la lectura y el arraigo territorial en las infancias. <strong>Sede de Encuentros Regionales:</strong> Funciona de forma permanente como el punto de encuentro de las redes culturales de Gómez, agrupando a entes como la Fundación Cheguaco y agrupaciones aliadas como MOCULTA.</p>',
      imagen: '/images/CDCPPRN.jpeg',
      imagen_logo: '/images/cdct.jpg',
    },
    {
      titulo: 'Comité de Desarrollo Cultural de Tacarigua (C.D.C.)',
      subtitulo: 'Fundado el 15 de agosto de 1968',
      resumen: 'Institución civil madre de la infraestructura y el movimiento sociocultural del pueblo.',
      contenido_html: '<p><strong>Fecha de fundación:</strong> 15 de agosto de 1968</p><p><strong>Lugar:</strong> Tacarigua, Municipio Gómez, Isla de Margarita, Estado Nueva Esparta, Venezuela</p><p><strong>Estatus:</strong> Institución civil madre de la infraestructura y el movimiento sociocultural del pueblo de Tacarigua</p><h4>1. Origen y Contexto de la Fundación</h4><p>A finales de la década de 1960, el pueblo de Tacarigua experimentaba una efervescencia intelectual, artística y deportiva que requería de una estructura formal para canalizarla. Bajo esta premisa, la noche del 15 de agosto de 1968, un grupo de destacados líderes vecinales, intelectuales y jóvenes se reunió con el objetivo de constituir un organismo que impulsara el progreso integral de la comunidad.</p><p>Así nació el Comité de Desarrollo Cultural de Tacarigua (C.D.C.), concebido no solo como un promotor de eventos, sino como un motor de desarrollo de infraestructura pública y resguardo del patrimonio tangible e intangible de la zona.</p><h4>2. Miembros Fundadores y Primera Junta Directiva</h4><p>La asamblea fundacional estuvo integrada por personalidades de gran relevancia para la historia neoespartana. La primera junta directiva que asumió las riendas de la institución estuvo conformada por: <strong>Presidente:</strong> Ing. Pedro Rivero Núñez; <strong>Vicepresidente:</strong> José Joaquín Salazar Franco ("Cheguaco"); <strong>Secretario de Actas:</strong> Ángel Félix Gómez; <strong>Tesorero:</strong> Juan José Alfonzo; <strong>Vocales:</strong> Domingo Carrasquero, Francisco Lárez y Luis Beltrán Alfonzo.</p><h4>3. El Gran Logro: Gestión de la Sede Física (Década de 1970)</h4><p>El mayor hito histórico del C.D.C. fue dotar a Tacarigua de un espacio digno para las manifestaciones colectivas. Aprovechando que el presidente fundador, el Ingeniero Pedro Rivero Núñez, ejercía funciones como Director de Obras Públicas del Estado Nueva Esparta a inicios de los años 70, la junta directiva gestionó e impulsó la construcción de un moderno complejo cultural.</p><p>El proyecto se consolidó en el centro de Tacarigua e integró en un solo terreno la edificación central de la Casa de la Cultura (inaugurada formalmente a mediados de 1973), una Concha Acústica para festivales masivos y espectáculos musicales, y una Cancha Deportiva que sirvió como punto de encuentro.</p><h4>4. Proyección Intelectual: El Periódico C.D.C.</h4><p>El C.D.C. entendió la cultura como un ejercicio de comunicación y registro del pensamiento local. Para ello, fundaron y mantuvieron de forma permanente el periódico impreso C.D.C., un órgano informativo comunitario que circuló en la Isla de Margarita durante las décadas de 1970 y 1980.</p><p>A través de sus páginas, intelectuales de la talla de "Cheguaco" Salazar Franco, Ángel Félix Gómez y José Rosa Acosta publicaban crónicas populares, poesía local, demandas sociales para el municipio Gómez e investigaciones sobre el folklore del oriente venezolano.</p><h4>5. Evolución, Alianzas y Legado Actual</h4><p>Con el paso de los años, las actividades diarias de la infraestructura construida por el C.D.C. pasaron a ser coordinadas por directores de la Casa de la Cultura (adscritos formalmente al Ejecutivo Regional e Iacene), mientras que el espíritu comunitario del C.D.C. sirvió de inspiración directa para el surgimiento de nuevos movimientos vecinales en los años 80, tales como el Movimiento Cultural Tacarigua Adentro (MOCULTA) en el sector San Sebastián.</p><p>Hoy en día, el C.D.C. de Tacarigua es recordado como la organización pionera y vanguardista que transformó un pequeño pueblo agrícola y artesanal en el epicentro de las letras y la identidad folclórica del Municipio Gómez.</p>',
      imagen: '/images/cdcta.jpeg',
      imagen_logo: '/images/cdcta.jpeg',
    },
  ];
  for (let i = 0; i < centros.length; i++) {
    const c = centros[i];
    await client.query(
      'INSERT INTO cultura_centros (titulo, subtitulo, resumen, contenido_html, imagen, imagen_logo, activo, orden) VALUES ($1,$2,$3,$4,$5,$6,true,$7)',
      [c.titulo, c.subtitulo, c.resumen, c.contenido_html, c.imagen, c.imagen_logo, i + 1]
    );
  }
  console.log(`  ✓ ${centros.length} centros culturales`);
  total += centros.length;

  await client.query('COMMIT');
  console.log(`\n✅ Migración tablas existentes completada. Total: ${total} registros actualizados.`);
} catch (e) {
  await client.query('ROLLBACK');
  console.error('❌ Error:', e.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}
