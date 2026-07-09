import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { cultoresMock, homeCardsMock, costumbresMock, gastronomiaMock } from '../src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // =============================================
    // 1. historia_hitos (from mockData historiaMock)
    // =============================================
    const historiaData = [
      { anio: '4357 a.C.', titulo: 'Llegada de los Guaiqueríes a Margarita', descripcion: 'Según estudios de Cecilia Ayala Lafée, Pedro Rivas Gómez y Werner Wilbert, las comunidades guaiqueríes accedieron a la región neoespartana hace aproximadamente 4.357 años.', tag: 'Período Prehispánico', imagen: '/images/valle-tacarigua-vista-satelite-nasa.webp', orden: 1, activo: true },
      { anio: '29 Sep. 1579', titulo: 'Encuentro de los Tacaribas con Miguel Maza de Lizana', descripcion: 'El Gobernador de Margarita, Miguel Maza de Lizana, se encontró con los indígenas guaiqueríes conocidos como Tacaribas.', tag: 'Conquista Española', imagen: '/images/paisaje-hero-tacarigua.webp', orden: 2, activo: true },
      { anio: 'Siglo XVI', titulo: 'El Valle de los Olleros y la Banda del Norte', descripcion: 'Indígenas fabricaban cerámica de barro: ánforas, tinajones y platos.', tag: 'Toponimia Colonial', imagen: '/images/iglesia-plaza-tacarigua-aerea.webp', orden: 3, activo: true },
      { anio: '1813–1818', titulo: 'Tacarigua en la Independencia', descripcion: 'Tacarigua aportó héroes como el Teniente José Rafael Guevara, el Capitán José Victorino Guzmán.', tag: 'Independencia', imagen: '/images/plaza-hexagonal-tacarigua.webp', orden: 4, activo: true },
      { anio: '21 Ene. 1817', titulo: 'Nace Diego B. Urbaneja Alayón', descripcion: 'Nació Diego Bautista Urbaneja Alayón, quien sería Presidente de la República en varias ocasiones.', tag: 'Personaje Histórico', imagen: '/images/iglesia-plaza-tacarigua-aerea.webp', orden: 5, activo: true },
      { anio: '12 Jul. 1875', titulo: 'Primera Escuela Federal de Tacarigua', descripcion: 'Antonio Guzmán Blanco decretó la creación de la Escuela Federal N° 860.', tag: 'Educación', imagen: '/images/centro-salud-cpt3-tacarigua.webp', orden: 6, activo: true },
      { anio: '1916', titulo: 'Municipio Guevara', descripcion: 'Tacarigua se inicia como núcleo del Municipio Guevara.', tag: 'Desarrollo Territorial', imagen: '/images/iglesia-plaza-tacarigua-aerea.webp', orden: 7, activo: true },
      { anio: '1964', titulo: 'Acueducto Submarino de Margarita', descripcion: 'Durante la inauguración del acueducto submarino, Emilia Salinas fue coronada Reina del Acueducto.', tag: 'Infraestructura', imagen: '/images/SaveClip.App_655961470_18175421617390832_5517042529558604418_n.jpg', orden: 8, activo: true },
      { anio: 'Feb. 2018', titulo: 'Proyecto Memoria Histórica de Tacarigua', descripcion: 'Un grupo de tacarigüeros crearon un Equipo de Trabajo para reconstruir la memoria histórica.', tag: 'Memoria Colectiva', imagen: '/images/plaza-comunitaria-tacarigua.webp', orden: 9, activo: true },
    ];

    await client.query('TRUNCATE TABLE historia_hitos RESTART IDENTITY CASCADE');
    for (const h of historiaData) {
      await client.query(
        `INSERT INTO historia_hitos (anio, titulo, descripcion, tag, imagen, orden, activo) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [h.anio, h.titulo, h.descripcion, h.tag, h.imagen, h.orden, h.activo]
      );
    }
    console.log(`  ✓ historia_hitos: ${historiaData.length} registros`);

    // =============================================
    // 2. cultores (from mockData cultoresMock - 66 entries)
    // =============================================
    await client.query('TRUNCATE TABLE cultores RESTART IDENTITY CASCADE');

    for (const c of cultoresMock) {
      await client.query(
        `INSERT INTO cultores (nombre, disciplina, especialidad, localidad, anios, bandera, imagen, descripcion, activo, orden) VALUES ($1,$2,$3,$4,$5,'🇻🇪',$6,$7,true,0)`,
        [c.nombre, c.disciplina, c.especialidad, c.localidad, c.anios, c.imagen, JSON.stringify(c.descripcion)]
      );
    }
    console.log(`  ✓ cultores: ${cultoresMock.length} registros`);

    // =============================================
    // 3. cultura_costumbres (from costumbresMock)
    // =============================================
    await client.query('TRUNCATE TABLE cultura_costumbres RESTART IDENTITY CASCADE');
    for (const c of costumbresMock) {
      await client.query(
        `INSERT INTO cultura_costumbres (nombre, categoria, descripcion, imagen, activo, orden) VALUES ($1,$2,$3,$4,true,0)`,
        [c.titulo, c.categoria || 'General', c.descripcion, c.imagen]
      );
    }
    console.log(`  ✓ cultura_costumbres: ${costumbresMock.length} registros`);

    // =============================================
    // 4. cultura_gastronomia (from gastronomiaMock)
    // =============================================
    await client.query('TRUNCATE TABLE cultura_gastronomia RESTART IDENTITY CASCADE');
    for (const g of gastronomiaMock) {
      await client.query(
        `INSERT INTO cultura_gastronomia (nombre, descripcion, imagen, activo, orden) VALUES ($1,$2,$3,true,0)`,
        [g.titulo, g.descripcion, g.imagen]
      );
    }
    console.log(`  ✓ cultura_gastronomia: ${gastronomiaMock.length} registros`);

    // =============================================
    // 5. home_cards (from homeCardsMock)
    // =============================================
    await client.query('TRUNCATE TABLE home_cards RESTART IDENTITY CASCADE');
    for (const c of homeCardsMock) {
      await client.query(
        `INSERT INTO home_cards (tipo, titulo, descripcion, detalle, info, modal_images, imagen, activo, orden) VALUES ($1,$2,$3,$4,$5,$6,$7,true,0)`,
        [c.tipo, c.titulo, c.descripcion, c.detalle, JSON.stringify(c.info || []), JSON.stringify(c.modalImages || []), c.imagen || null]
      );
    }
    console.log(`  ✓ home_cards: ${homeCardsMock.length} registros`);

    // =============================================
    // 6. calendario_efemerides (from calendarData.js)
    // =============================================
    const { calendarData } = await import('../src/data/calendarData.js');
    await client.query('TRUNCATE TABLE calendario_efemerides RESTART IDENTITY CASCADE');
    const tiposValidos = ['historia', 'natalicio', 'religiosa', 'cultural', 'duelo'];
    let calInserted = 0;
    for (const ev of calendarData) {
      if (ev.mes < 1 || ev.mes > 12 || ev.dia < 1 || ev.dia > 31) continue;
      await client.query(
        `INSERT INTO calendario_efemerides (dia, mes, tipo, titulo, descripcion, anio, activo)
         VALUES ($1, $2, $3, $4, $5, $6, true)`,
        [ev.dia, ev.mes, tiposValidos.includes(ev.tipo) ? ev.tipo : 'historia', ev.titulo, ev.descripcion, ev.anio || null]
      );
      calInserted++;
    }
    console.log(`  ✓ calendario_efemerides: ${calInserted} registros`);

    // =============================================
    // 7. biblioteca_items (from librosAuto.json, musicaAuto.json, videosAuto.json, documentosAuto.json)
    // =============================================
    await client.query('TRUNCATE TABLE biblioteca_items RESTART IDENTITY CASCADE');

    const libros = JSON.parse(fs.readFileSync(join(__dirname, '..', 'src', 'data', 'librosAuto.json'), 'utf-8'));
    for (const l of libros) {
      await client.query(
        `INSERT INTO biblioteca_items (titulo, autor, categoria, formato, url, imagen, activo) VALUES ($1,$2,$3,$4,$5,$6,true)`,
        [l.titulo, l.autor || 'Autor local', l.categoria || 'Historia Local', l.formato || 'Libros', l.url, l.imagen]
      );
    }
    console.log(`  ✓ biblioteca_items (libros): ${libros.length} registros`);

    const musica = JSON.parse(fs.readFileSync(join(__dirname, '..', 'src', 'data', 'musicaAuto.json'), 'utf-8'));
    for (const m of musica) {
      await client.query(
        `INSERT INTO biblioteca_items (titulo, autor, categoria, formato, imagen, canciones, activo) VALUES ($1,$2,$3,$4,$5,$6,true)`,
        [m.titulo, m.autor || 'Autor local', m.categoria || 'Álbum Musical', m.formato || 'Música', m.imagen, m.canciones ? JSON.stringify(m.canciones) : null]
      );
    }
    console.log(`  ✓ biblioteca_items (música): ${musica.length} registros`);

    const videos = JSON.parse(fs.readFileSync(join(__dirname, '..', 'src', 'data', 'videosAuto.json'), 'utf-8'));
    for (const v of videos) {
      await client.query(
        `INSERT INTO biblioteca_items (titulo, autor, categoria, formato, url, imagen, activo) VALUES ($1,$2,$3,$4,$5,$6,true)`,
        [v.titulo, v.autor || 'Comunidad de Tacarigua', v.categoria || 'Documental', v.formato || 'Videos', v.url, v.imagen]
      );
    }
    console.log(`  ✓ biblioteca_items (videos): ${videos.length} registros`);

    const docs = JSON.parse(fs.readFileSync(join(__dirname, '..', 'src', 'data', 'documentosAuto.json'), 'utf-8'));
    for (const d of docs) {
      await client.query(
        `INSERT INTO biblioteca_items (titulo, autor, categoria, formato, url, imagen, activo) VALUES ($1,$2,$3,$4,$5,$6,true)`,
        [d.titulo, d.autor || '', d.categoria || '', d.formato || 'Documentos', d.url, d.imagen || '']
      );
    }
    console.log(`  ✓ biblioteca_items (documentos): ${docs.length} registros`);

    // =============================================
    // 8. sociedad_educacion (from Educacion.jsx escuelas array)
    // =============================================
    await client.query('TRUNCATE TABLE sociedad_educacion RESTART IDENTITY CASCADE');
    const escuelas = [
      { nombre: 'U.E. "Napoleón Narváez"', nivel: 'Educación Inicial y Básica', descripcion: 'Fundada en 1946. Lleva el nombre del ilustre historiador neoespartano Napoleón Narváez. Ha formado generaciones de tacarigüeros y cuenta con biblioteca escolar desde 1987. Ubicada en la Calle Principal de Tacarigua.', icono: '🏫', imagen: 'escuelaNapoleonNarvaez' },
      { nombre: 'U.E.E. "Cruz Millán García"', nivel: 'Educación Inicial, Básica y Media General', descripcion: 'La U.E.E. Cruz Millán García (Unidad Educativa Estadal Cruz Millán García) es una institución pública de educación básica y media general. Fue fundada en enero de 1963. Su historia se remonta a 1931 cuando inició como la Escuela Mixta Nº 26. Ubicada en el Valle de San Sebastián, en el Municipio Gómez del Estado Nueva Esparta, Venezuela.', icono: '🏫', imagen: 'escuelaCruzMillanGarcia' },
      { nombre: 'U.E. "Roraima"', nivel: 'Educación Inicial, Básica y Media General', descripcion: 'La Unidad Educativa Roraima es un prestigioso colegio privado bilingüe ubicado en la Calle Principal de Tacarigüita, Municipio Gómez, Estado Nueva Esparta. Ofrece formación integral (Educación Inicial, Primaria y Media General) enfocada en la libertad, el contacto con la naturaleza y la diversión.', icono: '📖', imagen: 'escuelaRoraima' },
      { nombre: 'U.E. "Colegio Divina Pastora"', nivel: 'Educación Inicial, Básica y Media General', descripcion: 'Fundada el 23 de septiembre de 1993 por la Licenciada Yumeli Rivera Núñez. Proyecto educativo privado basado en valores cristianos y humanos, con una pedagogía participativa y progresista. Ubicado en la Vía Principal de Tacarigua.', icono: '✏️', imagen: 'colegioDivinaPastora' },
    ];
    for (let i = 0; i < escuelas.length; i++) {
      const e = escuelas[i];
      await client.query(
        'INSERT INTO sociedad_educacion (nombre, nivel, descripcion, icono, imagen, activo, orden) VALUES ($1,$2,$3,$4,$5,true,$6)',
        [e.nombre, e.nivel, e.descripcion, e.icono, e.imagen, i + 1]
      );
    }
    console.log(`  ✓ sociedad_educacion: ${escuelas.length} registros`);

    // =============================================
    // 9. sociedad_sanidad (from Sanidad.jsx dispensarios)
    // =============================================
    await client.query('TRUNCATE TABLE sociedad_sanidad RESTART IDENTITY CASCADE');
    const sanidad = [
      { nombre: 'Dispensario de Tacarigua', tipo: 'Ambulatorio', direccion: 'Corazón de Jesús, Tacarigua' },
      { nombre: 'Ambulatorio de San Sebastián', tipo: 'Ambulatorio', direccion: 'San Sebastián, Tacarigua' },
    ];
    for (const s of sanidad) {
      await client.query(
        `INSERT INTO sociedad_sanidad (nombre, tipo, direccion, imagen, activo, orden) VALUES ($1,$2,$3,'/images/centro-salud-cpt3-tacarigua.webp',true,0)`,
        [s.nombre, s.tipo, s.direccion]
      );
    }
    console.log(`  ✓ sociedad_sanidad: ${sanidad.length} registros`);

    // =============================================
    // 10. sociedad_deportes (from Deportes.jsx disciplinas)
    // =============================================
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
    console.log(`  ✓ sociedad_deportes: ${deportes.length} registros`);

    // =============================================
    // 11. sociedad_medicina_trad (from Sanidad.jsx)
    // =============================================
    await client.query('TRUNCATE TABLE sociedad_medicina_trad RESTART IDENTITY CASCADE');
    const medicinaTrad = [
      { nombre: 'Parteras Tradicionales', descripcion: 'Las parteras de Tacarigua fueron por generaciones las encargadas de traer al mundo a los hijos del pueblo. Con sabiduría ancestral heredada de los Guaiqueríes, atendían partos en los hogares con técnicas transmitidas de madre a hija.', icono: '🤱' },
      { nombre: 'Sobadores y Curanderos', descripcion: 'Los sobadores y curanderos utilizaban hierbas, arbustos y remedios de la serranía tacarigüera para aliviar males. Esta práctica, originada con los indios Tacaribas, perduró como primera línea de salud antes de la llegada de la medicina formal.', icono: '🌿' },
      { nombre: 'Curanderos Emblemáticos', descripcion: 'Ladislao Romero (curaba tifus, tétano, dolores) y Antonio Romero Mata (sobador de huesos, preparaba colirios) fueron figuras destacadas que combinaban oraciones con remedios de monte.', icono: '✨' },
      { nombre: 'Sobadores Legendarios', descripcion: 'Jóvito Antonio Moya (masajista con "Mentol Davis") y Esteban Rivera atendían personas desde Anaco hasta California, curando torceduras, zafaduras y picaduras de animales ponzoñosos.', icono: '💪' },
    ];
    for (let i = 0; i < medicinaTrad.length; i++) {
      const m = medicinaTrad[i];
      await client.query(
        'INSERT INTO sociedad_medicina_trad (nombre, descripcion, icono, activo, orden) VALUES ($1,$2,$3,true,$4)',
        [m.nombre, m.descripcion, m.icono, i + 1]
      );
    }
    console.log(`  ✓ sociedad_medicina_trad: ${medicinaTrad.length} registros`);

    // =============================================
    // 12. sociedad_educacion_hitos (from Educacion.jsx hitos array)
    // =============================================
    await client.query('TRUNCATE TABLE sociedad_educacion_hitos RESTART IDENTITY CASCADE');
    const hitos = [
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
    for (let i = 0; i < hitos.length; i++) {
      const h = hitos[i];
      await client.query(
        'INSERT INTO sociedad_educacion_hitos (anio, evento, activo, orden) VALUES ($1,$2,true,$3)',
        [h.anio, h.evento, i + 1]
      );
    }
    console.log(`  ✓ sociedad_educacion_hitos: ${hitos.length} registros`);

    // =============================================
    // 13. sociedad_educadores (from Educacion.jsx)
    // =============================================
    await client.query('TRUNCATE TABLE sociedad_educadores RESTART IDENTITY CASCADE');
    const educadores = [
      { nombre: 'Evaristo Alfonzo Guerra', apodo: 'Profesor "Lico"', imagen: 'evaristoAlfonzo', descripcion: 'Primer Profesional Universitario de la Parroquia Guevara, Municipio Gómez, Estado Nueva Esparta. Profesor de Biología y Química graduado en el Instituto Pedagógico de Caracas en julio de 1949. Ejerció en varias instituciones, destacando en el Colegio San Pablo de Caracas, donde fue Director.', detalles_html: '<p>En la Parroquia Guevara, municipio Gómez del estado Nueva Esparta, la Humildad duerme en cada quicio y cada estera; sueña con cosas hermosas y no solo se aferra a la esperanza sino que duerme con ella, lucha por ella y se sacrifica por ella…. amor del bueno. Evaristo Alfonzo Guerra es de los nuestros, con la Humildad con mayúscula, sueños al aire, visión de alguien en la vida y misión de luchar por sus sueños.</p><p>Nació el 27 de octubre de 1922 en nuestra población de Tacarigua - San Sebastián, del vientre de Atanasia Guerra, vecina del lugar, y de la varonilidad de Emilio Alfonzo, agricultor del antiguo Caserío El Río. Sus padrinos fueron Juan Romero y Catalina Moya.</p><h4>Infancia y Formación</h4><p>Su infancia transcurrió en su pueblo natal hasta que, a los 7 años de edad, fue inscrito en la Escuela Estadal N° 43, en Tacarigua San Sebastián bajo la dirección de la Preceptora Magdalena Piñerúa. Esta era una Escuela de Varones Diurna con un presupuesto de Bs. 60 y la asistencia de unos 42 estudiantes. En esa escuela estuvo hasta aprobar el 4to grado, cuando fue trasladado a Santa Ana del Norte en septiembre de 1934, a la Escuela Federal EF-9 bajo la dirección de Víctor Aumaitre Villarroel.</p><p>Luego de obtener su sexto grado, pidió a su madre continuar estudiando y fue inscrito en el Liceo "Francisco Antonio Rísquez", donde estudió hasta 4to año en 1938.</p><h4>Primeros Pasos como Maestro</h4><p>En el año 1939, estando en su población natal, reemplazó a Pablito Romero Millán en la Escuela Estadal de Varones Diurna N° 8, según la Gaceta Oficial N° 532 del 14-09-1939. Una semana más tarde, el 21 de septiembre de 1939, fue nombrado como Maestro de la Escuela Estadal Varones Diurna N° 117 en Carapacho (Municipio Díaz), en reemplazo de Ana Luisa Heredia (Gaceta Oficial N° 567 del 21-09-1939). No obstante, ese cambio no fue de su agrado y renunció al mismo el 2 de octubre, según la Gaceta Oficial N° 569.</p><h4>Estudios en Caracas y Título Universitario</h4><p>En el año 1945, Evaristo decidió continuar su preparación profesional y se trasladó a Caracas, alojándose en la Pensión "Doña Chía" con la familia Quijada. Entre 1945 y 1947 realizó estudios libres, trabajando de día y asistiendo a clases nocturnas. Se graduó de Perito Mercantil en el Liceo "Andrés Bello".</p><p>En septiembre de 1947 ingresó al Instituto Pedagógico de Caracas, donde obtuvo el título de Profesor de Biología y Química en julio de 1949. Ese mismo año ingresó al Colegio "San Pablo" como profesor de Química, Física y Ciencias Biológicas, donde ejerció hasta 1966 y fue también Director.</p><p>Paralelamente, entre 1952 y 1958 cursó la Licenciatura en Química en la Universidad Central de Venezuela (UCV), residenciado en la Pensión de la Sra. Hercilia de Noguera en Sabana Grande.</p><h4>Legado</h4><p>Evaristo Alfonzo Guerra es recordado como el primer profesional universitario de la Parroquia Guevara, un hombre que con esfuerzo y dedicación se abrió camino desde un pequeño caserío hasta las aulas universitarias, inspirando a generaciones de tacarigüeros a perseguir la educación como camino de superación.</p>' },
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
    console.log(`  ✓ sociedad_educadores: ${educadores.length} registros`);

    // =============================================
    // 14. sociedad_personajes (from Sanidad.jsx)
    // =============================================
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
    console.log(`  ✓ sociedad_personajes: ${personajes.length} registros`);

    // =============================================
    // 15. cultura_centros (from CultureModule.jsx)
    // =============================================
    await client.query('TRUNCATE TABLE cultura_centros RESTART IDENTITY CASCADE');
    const centros = [
      {
        titulo: 'Movimiento Cultural Tacarigua Adentro (MOCULTA)',
        subtitulo: 'Fundado el 19 de abril de 1985',
        resumen: 'Salvaguarda de la identidad, cotidianidad, deporte y expresiones folclóricas de San Sebastián de Tacarigua.',
        contenido_html: '<p><strong>Fecha de fundación:</strong> 19 de abril de 1985</p><p><strong>Lugar:</strong> Sector San Sebastián de Tacarigua, Municipio Gómez, Isla de Margarita</p><p><strong>Sede física:</strong> Terrenos donados por la familia de Antonia Quijada de Cova</p><p><strong>Misión:</strong> Salvaguarda de la identidad, cotidianidad, deporte y expresiones folclóricas del gentilicio "sebastino"</p><h4>1. Origen y Contexto de la Fundación</h4><p>El Movimiento Cultural Tacarigua Adentro (MOCULTA) nació formalmente la noche del 19 de abril de 1985. La asamblea constitutiva se llevó a cabo en la residencia del vecino Jesús Linares, ubicada en el sector San Sebastián.</p><p>La organización no surgió de forma aislada, sino como una respuesta comunitaria a una necesidad institucional: el Comité Organizador de las Fiestas de San Sebastián requería de un brazo popular, operativo y vecinal de carácter permanente. Este apéndice civil se diseñó específicamente para coordinar y ejecutar con mayor eficiencia los eventos culturales, recreativos y deportivos de las festividades patronales del pueblo.</p><h4>2. Fundadores y Primera Junta Directiva</h4><p>La iniciativa fue respaldada, firmada y ejecutada por un grupo de 17 cultores y vecinos fundadores de la localidad: Hilario González, Jesús Linares (anfitrión), Erasmo Ramos, Saturnino González, Francisco Ramos, Bartolo Alfonzo, Andrés Rivas, Hernán Malaver, José Alfonzo, Modesto Rivas, Luis Quijada, José Gregorio Alfonzo, Yuraima Da Silva, Diomira Campos, Victoria Rojas, Carmen González, Gregoria Montaño.</p><p>Para la operatividad inicial del movimiento, se estructuró la primera junta de coordinadores: <strong>Director General:</strong> Bartolo Alfonzo Moya; <strong>Director de Investigaciones:</strong> Hernán José Malaver; <strong>Director de Promoción:</strong> José Antonio Lista.</p><h4>3. Evolución y Consolidación Institucional</h4><p>Rápidamente, MOCULTA rebasó sus objetivos iniciales de trabajar únicamente durante el mes de enero (época de las fiestas patronales). La comunidad respondió con tal entusiasmo a las convocatorias que la organización se volvió permanente y amplió su alcance a festivales de galerón, velorios de Cruz y otras expresiones de la cultura tradicional venezolana.</p><p>Uno de los aciertos fundamentales fue la integración de las nuevas generaciones. MOCULTA logró involucrar a los jóvenes en la preservación de las tradiciones, garantizando la transmisión del conocimiento ancestral a través de talleres prácticos de música, danza y artesanía local.</p><h4>4. Aportes Culturales Destacados</h4><p><strong>Festival de Galerón:</strong> Espacio para la preservación de la música tradicional margariteña, con participación de cultores de toda la isla.</p><p><strong>Velorios de Cruz:</strong> Celebraciones religiosas y culturales que mantienen viva la devoción popular y el canto tradicional.</p><p><strong>Festividades de San Sebastián:</strong> Organización y coordinación de las fiestas patronales del sector, incluyendo procesiones, actos culturales y deportivos.</p><p><strong>Escuelas de Formación:</strong> Talleres de cuatro, galerón, danza tradicional y artesanía para niños y jóvenes.</p>',
        imagen: '/images/Moculta.png',
        imagen_logo: '/images/logomoculta.png',
      },
      {
        titulo: 'Casa de la Cultura "Poeta Pedro Rivero Navarro"',
        subtitulo: 'Centro Artístico de Tacarigua',
        resumen: 'Complejo cultural dotado de concha acústica y sede oficial del Comité de Desarrollo Cultural.',
        contenido_html: '<p><strong>Ubicación:</strong> Tacarigua, Municipio Gómez, Isla de Margarita, Estado Nueva Esparta, Venezuela</p><p><strong>Institución Gestora:</strong> Comité de Desarrollo Cultural de Tacarigua (C.D.C.)</p><p><strong>Eje Central:</strong> Preservación del patrimonio, las artes plásticas, el galerón y las letras neoespartanas</p><h4>1. Origen y Contexto (Década de 1960 y 1970)</h4><p>La creación de la Casa de la Cultura "Poeta Pedro Rivero Navarro" está ligada a la fundación del Comité de Desarrollo Cultural de Tacarigua (C.D.C.) en agosto de 1968. El C.D.C. nació como un movimiento vecinal para canalizar la profunda vocación artística, literaria y musical de la población tacarigüera.</p><p>Hacia principios de la década de 1970, la dirección del C.D.C. y el liderazgo del Ingeniero Pedro Rivero Núñez impulsaron el diseño y edificación de un complejo físico permanente que sirviera como epicentro para el desarrollo de las artes en la región. Fue así como se inauguró la sede oficial, equipada no solo con salones de reuniones, sino también con una concha acústica y una cancha deportiva para uso comunitario.</p><h4>2. Epónimo: ¿Quién fue Pedro Rivero Navarro?</h4><p>La institución fue bautizada en honor al célebre poeta, periodista y diplomático margariteño Pedro Rivero Navarro, nacido en Porlamar en 1893 y fallecido trágicamente en Madrid, España, el 7 de enero de 1959.</p><p>Rivero Navarro fue una de las plumas más refinadas del oriente venezolano, fundador del periódico Génesis (1909) y autor de obras fundamentales de la poesía marina como El Mar de las Perlas y El Pescador de Ánforas. Su vinculación espiritual con Tacarigua y su legado intelectual hicieron que el pueblo adoptara su nombre como símbolo de su faro cultural.</p><h4>3. Cronología de Directores Históricos</h4><p>A lo largo de sus más de 50 años de trayectoria institucional, la Casa de la Cultura ha mantenido sus puertas abiertas bajo la guía de destacados defensores del folclore insular. Cada director ha aportado su visión y esfuerzo para mantener vivo el legado cultural de la comunidad. La institución continúa siendo el principal escenario para festivales de galerón, presentaciones de danza, teatro y exposiciones de arte plástico en la parroquia Guevara.</p>',
        imagen: '/images/CDCPPRN.jpeg',
        imagen_logo: '/images/cdct.jpg',
      },
      {
        titulo: 'Comité de Desarrollo Cultural de Tacarigua (C.D.C.)',
        subtitulo: 'Fundado el 15 de agosto de 1968',
        resumen: 'Institución civil madre de la infraestructura y el movimiento sociocultural del pueblo.',
        contenido_html: '<p><strong>Fecha de fundación:</strong> 15 de agosto de 1968</p><p><strong>Lugar:</strong> Tacarigua, Municipio Gómez, Isla de Margarita, Estado Nueva Esparta, Venezuela</p><p><strong>Estatus:</strong> Institución civil madre de la infraestructura y el movimiento sociocultural del pueblo de Tacarigua</p><h4>1. Origen y Contexto de la Fundación</h4><p>A finales de la década de 1960, el pueblo de Tacarigua experimentaba una efervescencia intelectual, artística y deportiva que requería de una estructura formal para canalizarla. Bajo esta premisa, la noche del 15 de agosto de 1968, un grupo de destacados líderes vecinales, intelectuales y jóvenes se reunió con el objetivo de constituir un organismo que impulsara el progreso integral de la comunidad.</p><p>Así nació el Comité de Desarrollo Cultural de Tacarigua (C.D.C.), concebido no solo como un promotor de eventos, sino como un motor de desarrollo de infraestructura pública y resguardo del patrimonio tangible e intangible de la zona.</p><h4>2. Miembros Fundadores y Primera Junta Directiva</h4><p>La asamblea fundacional estuvo integrada por personalidades de gran relevancia para la historia neoespartana. La primera junta directiva que asumió las riendas de la institución estuvo conformada por: <strong>Presidente:</strong> Ing. Pedro Rivero Núñez; <strong>Vicepresidente:</strong> José Joaquín Salazar Franco ("Cheguaco"); <strong>Secretario de Actas:</strong> Ángel Félix Gómez; <strong>Tesorero:</strong> Juan José Alfonzo; <strong>Vocales:</strong> Domingo Carrasquero, Francisco Lárez y Luis Beltrán Alfonzo.</p><h4>3. El Gran Logro: Gestión de la Sede Física (Década de 1970)</h4><p>El mayor hito histórico del C.D.C. fue dotar a Tacarigua de un espacio digno para las manifestaciones colectivas. Aprovechando que el presidente fundador, el Ingeniero Pedro Rivero Núñez, ejercía funciones como Director de Obras Públicas del Estado Nueva Esparta a inicios de los años 70, la junta directiva gestionó e impulsó la construcción de la Casa de la Cultura "Poeta Pedro Rivero Navarro", un complejo que incluye concha acústica, cancha deportiva y salones de usos múltiples. Esta infraestructura se convirtió en el epicentro de la vida cultural de Tacarigua y un modelo de gestión comunitaria en el estado.</p><h4>4. Programas y Eventos Emblemáticos</h4><p><strong>Feria de la Cachapa:</strong> Evento gastronómico y cultural que celebra el maíz, base de la alimentación tradicional margariteña.</p><p><strong>Baile de la Burra:</strong> Tradición folclórica que combina humor, música y danza, una de las expresiones más auténticas del pueblo tacarigüero.</p><p><strong>Escuelas de Galerón y Cuatro:</strong> Programas permanentes de formación musical que garantizan la transmisión de estos géneros tradicionales a las nuevas generaciones.</p><p><strong>Cantos Tradicionales:</strong> Talleres y presentaciones de agrupaciones de cantos de trabajo, fulía y música de velorio.</p><p><strong>Fiestas Patronales:</strong> Organización de las festividades en honor a San Sebastián y otras celebraciones religiosas y cívicas del pueblo.</p>',
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
    console.log(`  ✓ cultura_centros: ${centros.length} registros`);

    // =============================================
    // 16. nosotros_mision_vision (from NosotrosModule.jsx)
    // =============================================
    await client.query('TRUNCATE TABLE nosotros_mision_vision RESTART IDENTITY CASCADE');
    const misionVision = [
      { tipo: 'mision', titulo: 'Nuestra Misión', contenido: 'Digitalizar y preservar la memoria histórica de Tacarigua de Margarita, haciendo accesible su rico patrimonio cultural, educativo y social a través de una plataforma interactiva y colaborativa.' },
      { tipo: 'vision', titulo: 'Nuestra Visión', contenido: 'Convertirnos en el referente digital más completo sobre la historia y cultura de Tacarigua, conectando a las generaciones actuales y futuras con sus raíces a través de la tecnología y la innovación.' },
    ];
    for (const m of misionVision) {
      await client.query(
        `INSERT INTO nosotros_mision_vision (tipo, titulo, contenido, activo) VALUES ($1,$2,$3,true)`,
        [m.tipo, m.titulo, m.contenido]
      );
    }
    console.log(`  ✓ nosotros_mision_vision: ${misionVision.length} registros`);

    // =============================================
    // 17. home_hero_slides (5 slides from HeroBanner.jsx)
    // =============================================
    await client.query('TRUNCATE TABLE home_hero_slides RESTART IDENTITY CASCADE');
    const heroSlides = [
      { image_key: 'plazaHexagonal', title: '¡Bienvenidos a la Parroquia Guevara!', subtitle: 'La Tacarigua de Margarita: memoria histórica, cultura y tradición en el corazón de Nueva Esparta' },
      { image_key: 'mapaTacarigua', title: 'Mapa de Tacarigua', subtitle: 'Descubre el valle, los cerros y el paso del Portachuelo que unen a toda la comunidad.' },
      { image_key: 'p6100004', title: 'Corazones unidos en una misma fe', subtitle: 'Nuestras Iglesias y capillas, testigos de devoción, fe y tradición.' },
      { image_key: 'paisajeHero', title: 'Memoria Histórica Viva', subtitle: '438 años de cultura, desde los indios Tacaribas hasta la comunidad de hoy' },
      { image_key: 'iglesiaPlazaAerea', title: 'Patrimonio Cultural', subtitle: 'Fiestas patronales, música folklórica, costumbres, tradiciones y gastronomía que enriquecen nuestra identidad' },
    ];
    for (let i = 0; i < heroSlides.length; i++) {
      const s = heroSlides[i];
      await client.query(
        'INSERT INTO home_hero_slides (image_key, title, subtitle, activo, orden) VALUES ($1,$2,$3,true,$4)',
        [s.image_key, s.title, s.subtitle, i + 1]
      );
    }
    console.log(`  ✓ home_hero_slides: ${heroSlides.length} registros`);

    // =============================================
    // 18. geografia_sectores (5 from geografiaData.js)
    // =============================================
    await client.query('TRUNCATE TABLE geografia_sectores RESTART IDENTITY CASCADE');
    const geoSectores = [
      { icono: '📍', title: 'Ubicación', content: 'Tacarigua se encuentra en la parte centro-norte de la isla de Margarita, en un semivalle de clima benigno a unos 81 metros sobre el nivel del mar, entre la capital del estado La Asunción al este y Santa Ana del Norte al oeste. Dista aproximadamente 7,7 km de Juan Griego y 12,3 km de Porlamar.' },
      { icono: '⛰️', title: 'Relieve', content: 'El poblado está rodeado de un sistema de cerros que lo delimitan y abastecen de agua. Los más destacados son El Tamoco, La Palma Real, El Mureche, Cerro Pelón y El Portachuelo — conocido históricamente como El Portezuelo de la Banda del Norte —, este último el paso natural estratégico que comunica esa Banda del Norte con el resto de la isla y que fue escenario de múltiples combates entre 1813 y 1902.' },
      { icono: '💧', title: 'Hidrología', content: 'Tacarigua constituye una de las zonas de mayor riqueza hídrica de la isla. Un estudio de la Universidad Central de Venezuela de 1971 la describió como "la zona hídrica más importante del Oriente del País". Sus cerros alimentan varias quebradas y pozas de agua cristalina que desde tiempos prehispánicos atrajeron asentamientos humanos, entre ellos el manantial de Belén y la quebrada del Orinoco.' },
      { icono: '🗺️', title: 'Organización territorial', content: 'Tacarigua se presenta como una sola comunidad territorial y cultural. Sectores como Tacarigua Afuera, Tacarigua Adentro, Tacarigüita, Corazón de Jesús, San Sebastián, Toporo y El Conchal forman un mismo valle compartido por su gente y su historia.' },
      { icono: '👥', title: 'Población y vivienda', content: 'Según el I Censo Popular de Tacarigua realizado en noviembre de 2002 —que abarcó solo el sector Tacarigua Arriba— la población era de 1.944 habitantes, de los cuales el 52,5 % eran mujeres. Entre 1950 y 1981 la población creció un 60 % y el número de viviendas un 89 %. Del total censado en 2002, el 20,4 % eran profesionales universitarios y el 13,9 % técnicos superiores o bachilleres cursando educación superior. Solo 84 personas eran analfabetas, el 97 % de ellas mayores de 60 años. El pueblo cuenta con cuatro centros de educación primaria —dos nacionales y dos privados— y un liceo de educación media general.' },
    ];
    for (let i = 0; i < geoSectores.length; i++) {
      const s = geoSectores[i];
      await client.query(
        'INSERT INTO geografia_sectores (icono, title, content, activo, orden) VALUES ($1,$2,$3,true,$4)',
        [s.icono, s.title, s.content, i + 1]
      );
    }
    console.log(`  ✓ geografia_sectores: ${geoSectores.length} registros`);

    // =============================================
    // 19. geografia_censos (6 from geografiaData.js)
    // =============================================
    await client.query('TRUNCATE TABLE geografia_censos RESTART IDENTITY CASCADE');
    const geoCensos = [
      { year: '1881', housing: '871', population: '-' },
      { year: '1950', housing: '243', population: '1.170' },
      { year: '1961', housing: '340', population: '1.192' },
      { year: '1971', housing: '362', population: '1.384' },
      { year: '1981', housing: '460', population: '1.871' },
      { year: '2002', housing: '459', population: '1.944' },
    ];
    for (let i = 0; i < geoCensos.length; i++) {
      const c = geoCensos[i];
      await client.query(
        'INSERT INTO geografia_censos (year, housing, population, activo, orden) VALUES ($1,$2,$3,true,$4)',
        [c.year, c.housing, c.population, i + 1]
      );
    }
    console.log(`  ✓ geografia_censos: ${geoCensos.length} registros`);

    // =============================================
    // 20. geografia_highlights (3 from geografiaData.js)
    // =============================================
    await client.query('TRUNCATE TABLE geografia_highlights RESTART IDENTITY CASCADE');
    const geoHighlights = [
      { icono: '📍', title: 'Centro-norte de Margarita', description: 'Tacarigua está a 81 metros sobre el mar, entre La Asunción y Santa Ana del Norte.' },
      { icono: '💧', title: 'Riqueza hídrica', description: 'El área es una de las zonas hídricas más importantes del oriente venezolano.' },
      { icono: '🏘️', title: 'Un solo territorio', description: 'Tacarigua se presenta como una sola comunidad integrada por sectores como Corazón de Jesús, San Sebastián y Tacarigüita.' },
    ];
    for (let i = 0; i < geoHighlights.length; i++) {
      const h = geoHighlights[i];
      await client.query(
        'INSERT INTO geografia_highlights (icono, title, description, activo, orden) VALUES ($1,$2,$3,true,$4)',
        [h.icono, h.title, h.description, i + 1]
      );
    }
    console.log(`  ✓ geografia_highlights: ${geoHighlights.length} registros`);

    // =============================================
    // 21. mapa_lugares (38 from geoData.js)
    // =============================================
    await client.query('TRUNCATE TABLE mapa_lugares RESTART IDENTITY CASCADE');
    const mapaLugares = [
      { name: 'Iglesia Corazón de Jesús', lat: 11.0518470, lng: -63.9008640, category: 'Religioso', vicinity: 'Casco central, Sector Corazón de Jesús', editorial_summary: 'Templo principal e histórico de Tacarigua, epicentro de las celebraciones patronales de la comunidad desde el siglo XIX.' },
      { name: 'Iglesia de San Sebastián Mártir', lat: 11.0462956, lng: -63.9078221, category: 'Religioso', vicinity: 'Sector San Sebastián', editorial_summary: 'Templo dedicado al mártir San Sebastián, patrono del sector sur del valle de Tacarigua.' },
      { name: 'Capilla Dulce Corazón de María', lat: 11.049579, lng: -63.890239, category: 'Religioso', vicinity: 'Sector Tacarigüita / El Manantial', editorial_summary: 'Pequeña capilla de devoción mariana ubicada en el sector oriental de la parroquia, corazón espiritual de la comunidad de Tacarigüita.' },
      { name: 'Campo Santo Sagrado Corazón de Jesús', lat: 11.0545, lng: -63.9071389, category: 'Religioso', vicinity: 'Sector Corazón de Jesús', editorial_summary: 'Cementerio histórico de la comunidad central de Tacarigua, testimonio vivo de generaciones de familias tacarigüeras.' },
      { name: 'Campo Santo de San Sebastián', lat: 11.043277, lng: -63.910345, category: 'Religioso', vicinity: 'Sector San Sebastián', editorial_summary: 'Cementerio del sector sur, ligado a la historia y tradición religiosa del barrio de San Sebastián.' },
      { name: 'UEE Cruz Millán García', lat: 11.0479291, lng: -63.9062991, category: 'Educativo', vicinity: 'Sector San Sebastián / Los Andes', editorial_summary: 'Unidad Educativa Especial que forma parte del tejido educativo de la parroquia Guevara.' },
      { name: 'U.E.N.B Napoleón Narváez', lat: 11.0523385, lng: -63.9052847, category: 'Educativo', vicinity: 'Casco central de Tacarigua', editorial_summary: 'Escuela bolivariana que lleva el nombre de uno de los próceres de la parroquia, formando a generaciones de tacarigüeros.' },
      { name: 'Colegio Divina Pastora', lat: 11.0540321, lng: -63.905962, category: 'Educativo', vicinity: 'Sector Los Andes / Centro', editorial_summary: 'Institución educativa de tradición religiosa que ha servido a la comunidad de Tacarigua por décadas.' },
      { name: 'Unidad Educativa Roraima como el Tepuy', lat: 11.0498007, lng: -63.8913234, category: 'Educativo', vicinity: 'Sector El Manantial / Tacarigüita Este', editorial_summary: 'Escuela que lleva por nombre una metáfora de la fortaleza y la altura, ubicada en la zona oriental de la parroquia.' },
      { name: 'Primera Escuela Oficial de Tacarigua (fundada en 1875)', lat: 11.053336, lng: -63.904668, category: 'Educativo', vicinity: 'Casco central', editorial_summary: 'Hito histórico de la educación local. La primera escuela oficial de Tacarigua fue fundada en 1875, pionera de la formación académica en el municipio Gómez.' },
      { name: 'Casa de la Cultura Poeta Pedro Rivero Navarro', lat: 11.0524931, lng: -63.9025346, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Espacio dedicado a la preservación del folklore, las letras y la historia de Tacarigua. Lleva el nombre del poeta local Pedro Rivero Navarro.' },
      { name: 'Biblioteca Pública José Joaquín Salazar Franco "Cheguaco"', lat: 11.0523099, lng: -63.9025318, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Biblioteca pública que honra la memoria de "Cheguaco", cronista e historiador insigne de Tacarigua y de toda la Isla de Margarita.' },
      { name: 'Movimiento Cultural Tacarigua Adentro (MOCULTA)', lat: 11.0455618, lng: -63.9074583, category: 'Cultural', vicinity: 'Sector San Sebastián', editorial_summary: 'Organización cultural comunitaria que promueve el arte, las tradiciones y la identidad del pueblo desde el sector Tacarigua Adentro.' },
      { name: 'Escenario Artístico Hernán Malaver', lat: 11.0460824, lng: -63.9075989, category: 'Cultural', vicinity: 'Sector San Sebastián', editorial_summary: 'Espacio al aire libre dedicado a presentaciones artísticas y culturales de la comunidad, homenaje al artista local Hernán Malaver.' },
      { name: 'Concha Acústica "Eligio González"', lat: 11.0516505, lng: -63.9018004, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Concha acústica dedicada al músico y compositor Eligio González, escenario de fiestas patronales, festivales y eventos culturales del pueblo.' },
      { name: 'Casa de Yenko', lat: 11.0516907, lng: -63.9018136, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Espacio cultural emblemático de la memoria popular tacarigüera, referencia de encuentro y tradición comunitaria.' },
      { name: 'Casa Natal de Diego Bautista Alayón', lat: 11.050602, lng: -63.902635, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Casa natal de Diego Bautista Alayón, figura histórica de Tacarigua y del estado Nueva Esparta.' },
      { name: 'Prefectura de la Parroquia Guevara', lat: 11.0533421, lng: -63.9048656, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Sede de la Prefectura Civil de la Parroquia Guevara, institución administrativa histórica del municipio Gómez.' },
      { name: 'La Alcantarilla', lat: 11.0523145, lng: -63.9012121, category: 'Cultural', vicinity: 'Casco central, Ruta 1', editorial_summary: 'Paso y punto de referencia histórico sobre la Ruta 1 en el casco de Tacarigua, hito geográfico y cultural del pueblo.' },
      { name: 'Campo de Béisbol y Atletismo', lat: 11.0470201, lng: -63.9056993, category: 'Cultural', vicinity: 'Sector San Sebastián / Los Andes', editorial_summary: 'Instalación deportiva donde se forjaron atletas tacarigüeros, entre ellos los campeones de atletismo que dieron gloria a Margarita.' },
      { name: 'Plaza Corazón de Jesús', lat: 11.0519000, lng: -63.9009000, category: 'Cultural', vicinity: 'Casco central, junto a la Iglesia Corazón de Jesús', editorial_summary: 'Plaza cívica y cultural del centro de Tacarigua, espacio histórico de reunión y celebración para las festividades patronales del pueblo.' },
      { name: 'Plaza de San Sebastián', lat: 11.0461500, lng: -63.9078000, category: 'Cultural', vicinity: 'Sector San Sebastián, junto a la Iglesia', editorial_summary: 'Plaza principal del sector sur de Tacarigua, centro de encuentro comunitario y escenario de las tradiciones en honor al mártir San Sebastián.' },
      { name: 'Típica El Molino', lat: 11.0527946, lng: -63.9033478, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Taller y venta de artesanías tradicionales. Destaca por la tejeduría artesanal, hamaquismo y productos autóctonos que preservan el patrimonio cultural de Tacarigua.' },
      { name: 'El Trapiche', lat: 11.0526475, lng: -63.9010371, category: 'Cultural', vicinity: 'Casco central, Ruta 1', editorial_summary: 'Centro de producción y venta de artesanías y estería local. Toma su nombre del antiguo trapiche de caña y es un pilar de la tradición creadora del pueblo.' },
      { name: 'El Burrito', lat: 11.0515524, lng: -63.9014217, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Reconocido espacio artesanal enfocado en el trenzado, sombrerería y tejeduría típica margariteña, manteniendo viva la herencia ancestral de Tacarigua.' },
      { name: 'Típica Carmencita', lat: 11.0506806, lng: -63.8981308, category: 'Cultural', vicinity: 'Sector El Manantial / Tacarigüita', editorial_summary: 'Referencia en la venta de artesanías y creaciones típicas elaboradas a mano. Un rincón donde se exhibe el talento y la tejeduría propia del hogar tacarigüero.' },
      { name: 'LA BUENA CACHAPA', lat: 11.0515135, lng: -63.8996989, category: 'Gastronómico', vicinity: 'Ruta 1, entre Casco Central y El Manantial', editorial_summary: 'Local emblemático que sirve las afamadas cachapas de maíz tierno de Tacarigua, uno de los sabores más representativos del pueblo.' },
      { name: 'Cachapera Mi Viejo Fogón', lat: 11.0517208, lng: -63.9002421, category: 'Gastronómico', vicinity: 'Sector El Manantial', editorial_summary: 'Tradicional puesto de cachapas al fogón de leña, orgullo gastronómico del sector El Manantial.' },
      { name: 'Cachapas de Pedro', lat: 11.0491673, lng: -63.8945161, category: 'Gastronómico', vicinity: 'Sector Tacarigüita Este', editorial_summary: 'Punto gastronómico popular entre locales y visitantes para disfrutar de las auténticas cachapas del valle.' },
      { name: 'Cachapera De Peter', lat: 11.0470537, lng: -63.8922846, category: 'Gastronómico', vicinity: 'Vía Portachuelo, sector oriental', editorial_summary: 'Establecimiento gastronómico en la vía al Portachuelo, especializado en cachapas y comida criolla para locales y turistas.' },
      { name: 'Jardín Café', lat: 11.0523461, lng: -63.8976612, category: 'Gastronómico', vicinity: 'Ruta 1, Sector El Manantial', editorial_summary: 'Café y restaurante rodeado de vegetación exuberante, punto de descanso y gastronomía local para quienes transitan la Ruta 1.' },
      { name: 'Productos La Grea C.A.', lat: 11.0545188, lng: -63.8991609, category: 'Gastronómico', vicinity: 'Norte del casco', editorial_summary: 'Sitio campestre y restaurante familiar atendido por la familia Rivera Núñez. Funciona como un centro turístico que combina la gastronomía tradicional margariteña, la producción artesanal y el contacto directo con la naturaleza.' },
      { name: 'Mirador El Portachuelo', lat: 11.0493924, lng: -63.8872891, category: 'Natural', vicinity: 'Paso de montaña al este, vía La Asunción', editorial_summary: 'Famoso mirador y paso histórico de montaña que conecta la Banda del Norte con el sur de la isla. Desde aquí se aprecian vistas panorámicas del valle de Tacarigua y el mar Caribe.' },
      { name: 'La Poza de Cayito', lat: 11.0548985, lng: -63.8983126, category: 'Natural', vicinity: 'Fuente de agua, norte del valle', editorial_summary: 'Poza de agua natural y espacio de recreación comunitaria, uno de los manantiales históricos que abastecen al pueblo de Tacarigua.' },
      { name: 'Hacienda Campestre Nido de Águilas', lat: 11.057658, lng: -63.893917, category: 'Natural', vicinity: 'Sector norte, vías hacia la montaña', editorial_summary: 'Hacienda y posada campestre enmarcada por la serranía, punto de partida para rutas de senderismo y naturaleza en los cerros de Tacarigua.' },
      { name: 'La Palma Real', lat: 11.0219444, lng: -63.8994444, category: 'Natural', vicinity: 'Sector sur, vía al Portachuelo Sur', editorial_summary: 'Área natural con predominio de palmas reales, emblema del paisaje tacarigüero y símbolo de la vegetación tropical del sur del valle.' },
      { name: 'La Huerta de Elicio', lat: 11.035944, lng: -63.911029, category: 'Natural', vicinity: 'Extremo suroeste, límite de la parroquia', editorial_summary: 'Huerta agroecológica que marca el límite suroeste de la frontera de Tacarigua, espacio de cultivo tradicional y biodiversidad local.' },
      { name: 'Consultorio Popular CPT', lat: 11.0535715, lng: -63.9046648, category: 'Salud', vicinity: 'Casco central', editorial_summary: 'Centro de atención médica comunitaria de la Parroquia Guevara, pilar del sistema de salud pública de Tacarigua.' },
    ];
    for (let i = 0; i < mapaLugares.length; i++) {
      const l = mapaLugares[i];
      await client.query(
        'INSERT INTO mapa_lugares (name, lat, lng, category, vicinity, editorial_summary, activo, orden) VALUES ($1,$2,$3,$4,$5,$6,true,$7)',
        [l.name, l.lat, l.lng, l.category, l.vicinity, l.editorial_summary, i + 1]
      );
    }
    console.log(`  ✓ mapa_lugares: ${mapaLugares.length} registros`);

    // =============================================
    // 22. sociedad_sanidad_hitos (3 from Sanidad.jsx historiaAgua)
    // =============================================
    await client.query('TRUNCATE TABLE sociedad_sanidad_hitos RESTART IDENTITY CASCADE');
    const hitosAgua = [
      {
        periodo: '1579 – 1927',
        titulo: 'Época de los Manantiales',
        icono: '💧',
        resumen: 'Durante casi 350 años los tacarigüeros dependieron de ríos, pozas y manantiales de la serranía.',
        contenido_html: '<p>Durante casi 350 años, los tacarigüeros dependieron de los ríos, riachuelos, pozos, pozas, tanquillas y aljibes naturales de la serranía. Los indios Tacaribas, presentes desde hace unos 1.500 años, se asentaron en el Valle de los Olleros atraídos por la abundancia de agua y la fertilidad de la tierra.</p><h4>La Poza "La Barca"</h4><p>En el sitio conocido como el Copeicillo, ubicado en la montaña Palma Real en el pueblo de San Sebastián, se encuentra una famosa poza en medio del riachuelo que baja de su montaña, la cual pertenece al Parque Nacional "Jovito Villalba" de la serranía del Copey.</p><p>El riachuelo baja serpenteante entre las piedras limosas, regando a su paso antiguas y nuevas matas de mamey, níspero, aguacate, mango, cocotero, hicacos y otras. En su recorrido cae sobre una enorme piedra cavada por el agua a través de muchos años, formando una poza en forma de "Barca".</p><p>Esta formación rocosa abarca una extensión grande y la poza queda en el centro de la misma, con un nivel de llenado que llega a la cintura. Para el lejano año de <strong>1890</strong> se construyó una represa conocida como Alberca, en la parte de arriba de la poza, para almacenar el agua y llevarla por tuberías hasta la Caja Vieja o depósito de agua —la primera obra civil construida en el pueblo.</p><p>La antigua poza lleva el nombre de "Barca" por su parecido a la misma. También se oye decir entre los más viejos del pueblo que su nombre viene de la palabra <em>Alberca</em>, que encierra o represa el agua, y que luego comenzaron a llamarle Albercón, después Abarcón y con el tiempo simplemente "Barca", como se le conoce hoy.</p>',
        imagen: 'manantial',
      },
      {
        periodo: '1889 – 1939',
        titulo: 'Galerías, Cajas y Molinos',
        icono: '⚙️',
        resumen: 'Galerías filtrantes excavadas en 1934–1935, molinos de viento y la primera caja de agua del pueblo.',
        contenido_html: '<h4>Las Galerías Filtrantes</h4><p>En la montaña Palma Real se encuentran dos galerías filtrantes, excavadas en el año 1934 y finalizadas en 1935. Aún se pueden observar. Las entradas de ambas están hechas con concreto armado hasta dos metros, luego sigue la galería excavada al natural. Estas forman parte del patrimonio del pueblo de San Sebastián.</p><h4>La Vieja Caja de Agua</h4><p>Antigua y legendaria estructura hecha de ladrillos, piedras y cemento. Ubicada en medio de dos cerros, muy cerca del riachuelo "Copeicillo" y no muy lejos del sitio denominado "La Barca".</p><p>Su construcción se hizo en terrenos de Don Felipe Morao y data del año <strong>1889</strong>, en el gobierno del General Juan Pablo Rojas Paúl. En ese mismo año se da inicio a los trabajos del Acueducto Tacarigua-Juangriego, siendo ésta la primera obra civil hecha en el pueblo, junto a la instalación de las tuberías que bajaban del sitio conocido como "El Carapo", en la montaña "Palma Real". Se empleó el sistema de gravedad para llevar el agua fresca y cristalina hasta la Caja o depósito de agua, y de allí a pueblos como Juangriego, Los Millanes, La Vecindad, Santa Ana, Tacarigua y San Sebastián por espacio de 8 años.</p><h4>Los Molinos de Viento de Tacarigua</h4><p>En la población de Tacarigua, el término se asocia a la memoria histórica de sus viejos molinos de viento. Estos molinos se utilizaban para bombear agua salobre desde los pozos subterráneos hacia tanques de almacenamiento.</p><p><strong>El Molino de Aleja</strong>, situado en el sector Tacarigua-Corazón de Jesús (Calle Principal), es uno de los más icónicos y emblemáticos de la zona, conservándose en su lugar como un símbolo de la identidad local. También existió el Molino de Las Delicias.</p>',
        imagen: 'galeria',
      },
      {
        periodo: '1960 – Presente',
        titulo: 'Acueducto Submarino',
        icono: '🚰',
        resumen: 'El acueducto submarino transformó el acceso al agua en la isla, conectando a Margarita con el continente y permitiendo el desarrollo de la red local de Tacarigua (1962–1964).',
        contenido_html: '<p>El acueducto submarino de la Isla de Margarita es la red de tuberías que transporta agua dulce desde el estado Sucre (Venezuela) hasta la isla. Su relación directa con Tacarigua radica en que allí se construyó un acueducto terrestre (1962–1964) que sirvió de complemento y distribuidor del sistema insular.</p><h4>El Acueducto Submarino</h4><p><strong>Primer acueducto:</strong> Inaugurado en <strong>1960</strong> por el presidente Rómulo Betancourt, atravesó el mar desde la población de Cariaco y el río Carinicuao (Clavellinos), trayendo por primera vez agua continental a la isla de forma permanente.</p><p><strong>Segundo acueducto «Luisa Cáceres de Arismendi»:</strong> Inaugurado en <strong>1988</strong> por el presidente Jaime Lusinchi, trajo agua desde el embalse de Turimiquire, reforzando significativamente el sistema y ampliando la capacidad de suministro para toda Margarita y Coche.</p><p><strong>Impacto regional:</strong> Permitió conectar a Margarita y Coche con el continente, reemplazando definitivamente el suministro de emergencia que anteriormente se hacía mediante barcos cisterna (gabarras), lo que representó un salto histórico en la calidad de vida de los isleños.</p><h4>Relación con Tacarigua</h4><p><strong>El sistema distribuidor:</strong> Entre <strong>1962 y 1964</strong> se construyó la red local de Tacarigua, pensada como parte de la infraestructura necesaria para gestionar y canalizar el agua proveniente del continente hacia esta zona del municipio Gómez.</p><p><strong>Memoria histórica:</strong> Esta conexión fue vital para la región. A nivel local se recuerda con especial cariño a figuras como <strong>Emilia José Salinas Ordaz</strong>, apodada la <em>"Reina del Acueducto Submarino de Margarita"</em>, por su histórica labor comunitaria y su incansable abogacía por el derecho al agua en esta localidad.</p>',
        imagen: 'asim',
      },
    ];
    for (let i = 0; i < hitosAgua.length; i++) {
      const h = hitosAgua[i];
      await client.query(
        'INSERT INTO sociedad_sanidad_hitos (periodo, titulo, icono, resumen, contenido_html, imagen, activo, orden) VALUES ($1,$2,$3,$4,$5,$6,true,$7)',
        [h.periodo, h.titulo, h.icono, h.resumen, h.contenido_html, h.imagen, i + 1]
      );
    }
    console.log(`  ✓ sociedad_sanidad_hitos: ${hitosAgua.length} registros`);

    // =============================================
    // 23-31. Restored tables (verificar que seed_fix.sql se ejecutó)
    // =============================================
    const verifyTables = [
      'nosotros_features', 'nosotros_valores', 'nosotros_stats',
      'historia_secciones', 'historia_videos', 'historia_documentos',
      'historia_features', 'historia_datos_rapidos', 'home_featured'
    ];
    for (const table of verifyTables) {
      const count = await client.query(`SELECT count(*)::int as cnt FROM ${table}`);
      if (count.rows[0].cnt === 0) {
        console.log(`  ⚠ ${table}: VACÍA — debe ejecutar backend/seed_fix.sql`);
      } else {
        console.log(`  ✓ ${table}: ${count.rows[0].cnt} registros`);
      }
    }

    await client.query('COMMIT');
    console.log('\n✅ Seed completado exitosamente.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('\n❌ Error durante el seed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
