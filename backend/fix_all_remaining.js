import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const client = await pool.connect();

try {
  await client.query('BEGIN');

  // =============================================
  // FASE 1: CORREGIR ENCODING EN HISTORIA
  // =============================================
  console.log('📋 Fase 1: Corrigiendo encoding en historia...');

  // historia_secciones (4 registros)
  await client.query(`UPDATE historia_secciones SET titulo = $1, contenido = $2 WHERE id = 1`, [
    'Origen del nombre Tacarigua',
    'El nombre Tacarigua proviene del pueblo indígena Guaiquerí y está vinculado al árbol balsa. La primera referencia documental aparece en la Información de Testigos de 1580.'
  ]);
  await client.query(`UPDATE historia_secciones SET titulo = $1, contenido = $2 WHERE id = 2`, [
    'Cinco oleadas indígenas',
    'Los estudios reconocen cinco ocupaciones indígenas: desde Punta Gorda y El Agua hasta Playa Guacuco. En el valle se desarrolló la cerámica, el cultivo del maíz y la crianza de algodón.'
  ]);
  await client.query(`UPDATE historia_secciones SET titulo = $1, contenido = $2 WHERE id = 3`, [
    'Valle, agua y alfarería',
    'El valle de Tacarigua fue conocido como El Valle de los Olleros o Valle de Arimacoa por su cerámica. Sus habitantes cultivaban maíz, yuca y algodón.'
  ]);
  await client.query(`UPDATE historia_secciones SET titulo = $1, contenido = $2 WHERE id = 4`, [
    'Independencia y República',
    'Durante la guerra de independencia Tacarigua sirvió como hospital de campaña y base patriota. En 1881 fue Distrito Tacarigua y en 1916 se integró como parroquia Guevara.'
  ]);
  console.log('  ✓ historia_secciones (4)');

  // historia_videos (1 registro)
  await client.query(`UPDATE historia_videos SET caption = $1 WHERE id = 1`, [
    'Recorrido audiovisual por los hitos históricos de Tacarigua, documentado por el Equipo de Trabajo (2018–2022).'
  ]);
  console.log('  ✓ historia_videos (1)');

  // historia_documentos (2 registros)
  await client.query(`UPDATE historia_documentos SET descripcion = $1 WHERE id = 1`, [
    'Documento histórico que registra la organización y demarcación territorial del valle de Tacarigua.'
  ]);
  await client.query(`UPDATE historia_documentos SET
    src = '/images/documentolegalfundación.png',
    full_src = '/images/documentolegalfundación.png',
    alt = 'Acta de Fundación',
    titulo = 'Acta de Fundación',
    descripcion = 'Documento original de fundación de Tacarigua, testimonio histórico del establecimiento de la parroquia.'
  WHERE id = 2`);
  console.log('  ✓ historia_documentos (2)');

  // historia_datos_rapidos (3 registros)
  await client.query(`UPDATE historia_datos_rapidos SET texto = $1 WHERE id = 1`, [
    'La fecha más probable del contacto entre los indios Tacaribas y los españoles es el 29 de septiembre de 1579, día de San Miguel Arcángel.'
  ]);
  await client.query(`UPDATE historia_datos_rapidos SET texto = $1 WHERE id = 2`, [
    'El nombre Tacarigua existe en más de 15 poblaciones de Venezuela y en una localidad de Trinidad y Tobago.'
  ]);
  await client.query(`UPDATE historia_datos_rapidos SET label = $1, texto = $2 WHERE id = 3`, [
    'Cerámica',
    'La alfarería indígena del valle de Tacarigua produjo ánforas, tinajones y platos que se intercambiaban con comunidades vecinas.'
  ]);
  console.log('  ✓ historia_datos_rapidos (3)');

  // =============================================
  // FASE 2: CORREGIR HOME_FEATURED
  // =============================================
  console.log('📋 Fase 2: Corrigiendo home_featured...');
  await client.query(`UPDATE home_featured SET
    titulo = 'Geografía',
    descripcion = 'El Valle de los Olleros, la Banda del Norte, el Portachuelo del Norte y la serranía que abastece de agua a la parroquia',
    imagen_alt = 'Geografía Tacarigua'
  WHERE id = 6`);
  console.log('  ✓ home_featured (1)');

  // =============================================
  // FASE 3: RE-INSERTAR EMOJIS EN NOSOTROS
  // =============================================
  console.log('📋 Fase 3: Re-insertando emojis en nosotros...');

  // nosotros_features (6 registros con emojis + texto corregido)
  const features = [
    { id: 5,  icono: '📜', titulo: 'Historia',   descripcion: 'Cronología desde los primeros asentamientos indígenas hasta la actualidad, con documentos originales y fuentes verificadas.' },
    { id: 6,  icono: '🎭', titulo: 'Cultura',    descripcion: 'Tradiciones, festividades, gastronomía típica y expresiones artísticas que definen la identidad tacarigüera.' },
    { id: 7,  icono: '🗺️', titulo: 'Geografía',  descripcion: 'Mapa interactivo, topografía, recursos naturales y puntos de interés del valle de Tacarigua.' },
    { id: 8,  icono: '🏘️', titulo: 'Sociedad',   descripcion: 'Organizaciones comunitarias, personajes ilustres y la estructura social que ha dado forma a la parroquia.' },
    { id: 9,  icono: '📚', titulo: 'Biblioteca', descripcion: 'Repositorio digital de libros, documentos, música y fotografías históricas de libre acceso.' },
    { id: 10, icono: '📅', titulo: 'Calendario', descripcion: 'Efemérides históricas, religiosas, culturales y fechas conmemorativas del municipio Gómez y Tacarigua.' },
  ];
  for (const f of features) {
    await client.query(`UPDATE nosotros_features SET icono = $1, titulo = $2, descripcion = $3 WHERE id = $4`,
      [f.icono, f.titulo, f.descripcion, f.id]);
  }
  console.log('  ✓ nosotros_features (6 iconos + textos)');

  // nosotros_valores (6 registros con emojis)
  const valores = [
    { id: 5,  icono: '🔍', titulo: 'Veracidad',     descripcion: 'Información verificada y documentada con fuentes confiables' },
    { id: 6,  icono: '🤝', titulo: 'Comunidad',      descripcion: 'Trabajo colaborativo con los habitantes de Tacarigua de Margarita' },
    { id: 7,  icono: '💡', titulo: 'Innovación',     descripcion: 'Uso de tecnología moderna para preservar la historia' },
    { id: 8,  icono: '🌍', titulo: 'Accesibilidad',  descripcion: 'Conocimiento disponible para todos, sin barreras' },
    { id: 9,  icono: '❤️', titulo: 'Pasión',         descripcion: 'Amor profundo por nuestra tierra y su historia' },
    { id: 10, icono: '🎓', titulo: 'Educación',      descripcion: 'Compromiso con el aprendizaje y la difusión cultural' },
  ];
  for (const v of valores) {
    await client.query(`UPDATE nosotros_valores SET icono = $1, titulo = $2, descripcion = $3 WHERE id = $4`,
      [v.icono, v.titulo, v.descripcion, v.id]);
  }
  console.log('  ✓ nosotros_valores (6 iconos + textos)');

  // nosotros_stats (4 registros con emojis)
  const stats = [
    { id: 5, icono: '📚', label: 'Libros Publicados',           valor: '50+' },
    { id: 6, icono: '🎓', label: 'Profesionales Universitarios', valor: '28.3%' },
    { id: 7, icono: '📜', label: 'Años de Historia',            valor: '445+' },
    { id: 8, icono: '🗂️', label: 'Módulos del Portal',          valor: '7' },
  ];
  for (const s of stats) {
    await client.query(`UPDATE nosotros_stats SET icono = $1, label = $2, valor = $3 WHERE id = $4`,
      [s.icono, s.label, s.valor, s.id]);
  }
  console.log('  ✓ nosotros_stats (4 iconos + textos)');

  // =============================================
  // FASE 4: CORREGIR CULTURA_CENTROS (poblar DB)
  // =============================================
  console.log('📋 Fase 4: Poblando cultura_centros...');
  await client.query('TRUNCATE TABLE cultura_centros RESTART IDENTITY CASCADE');
  const centros = [
    {
      titulo: 'Movimiento Cultural Tacarigua Adentro (MOCULTA)',
      subtitulo: 'Fundado el 19 de abril de 1985',
      resumen: 'Salvaguarda de la identidad cultural de Tacarigua. Promueve festivales de galerón, velorios de Cruz, festividades de San Sebastián y la formación de nuevas generaciones en las tradiciones margariteñas.',
      imagen: '/images/Moculta.png',
      imagen_logo: '/images/logomoculta.png',
    },
    {
      titulo: 'Casa de la Cultura "Poeta Pedro Rivero Navarro"',
      subtitulo: 'Centro Artístico de Tacarigua',
      resumen: 'Complejo cultural dotado de concha acústica, sede de eventos artísticos, talleres de música, danza y teatro. Lleva el nombre del insigne poeta tacarigüero Pedro Rivero Navarro.',
      imagen: '/images/CDCPPRN.jpeg',
      imagen_logo: '/images/cdct.jpg',
    },
    {
      titulo: 'Comité de Desarrollo Cultural de Tacarigua (C.D.C.)',
      subtitulo: 'Fundado el 15 de agosto de 1968',
      resumen: 'Institución civil madre de la infraestructura cultural de Tacarigua. Organiza la Feria de la Cachapa, el Baile de Burra, y mantiene escuelas de galerón, cantos tradicionales y cuatro.',
      imagen: '/images/cdcta.jpeg',
      imagen_logo: '/images/cdcta.jpeg',
    },
  ];
  for (const c of centros) {
    await client.query(
      `INSERT INTO cultura_centros (titulo, subtitulo, resumen, imagen, imagen_logo, activo, orden) VALUES ($1,$2,$3,$4,$5,true,0)`,
      [c.titulo, c.subtitulo, c.resumen, c.imagen, c.imagen_logo]
    );
  }
  console.log('  ✓ cultura_centros (3)');

  await client.query('COMMIT');
  console.log('\n✅ Todas las correcciones de encoding, emojis y centros aplicadas.');
} catch (e) {
  await client.query('ROLLBACK');
  console.error('❌ Error:', e.message);
  process.exit(1);
} finally {
  client.release();
}

// =============================================
// FASE 5: CREAR IMÁGENES FALTANTES
// =============================================
console.log('\n📋 Fase 5: Creando imágenes faltantes...');

const publicImages = join(__dirname, '..', 'public', 'images');

// Mapa de imágenes webp faltantes -> fuente jpg existente
const imagesToCreate = [
  { target: 'plaza-comunitaria-tacarigua.webp', source: 'iglesia-tacarigua.jpg' },
  { target: 'plaza-hexagonal-tacarigua.webp',   source: 'iglesia-tacarigua.jpg' },
  { target: 'paisaje-hero-tacarigua.webp',      source: 'hero-bg.jpg' },
  { target: 'iglesiasansebastian.webp',         source: 'iglesiasansebastian.jpg' },
  { target: 'TACARIGUA.webp',                   source: 'TACARIGUA.jpg' },
];

// Also copy specific images referenced in DB
const imagesToCopy = [
  { target: 'mural-diego-urbaneja-tacarigua.webp', source: 'dbu.jpg' },
  { target: 'valle-tacarigua-vista-satelite-nasa.webp', source: 'La_Isla_de_Margarita_y_el_valle_de_Tacarigua_vistos_desde_el_espacio_-_FOTO_NASA1.jpg' },
  { target: 'valle-tacarigua-panoramica-serrania.webp', source: 'geonasa.jpg' },
];

let imgCreated = 0;
for (const img of [...imagesToCreate, ...imagesToCopy]) {
  const targetPath = join(publicImages, img.target);
  const sourcePath = join(publicImages, img.source);

  if (!fs.existsSync(targetPath) && fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    imgCreated++;
    console.log(`  ✓ ${img.target} (copiado desde ${img.source})`);
  } else if (fs.existsSync(targetPath)) {
    console.log(`  - ${img.target} (ya existe)`);
  } else {
    console.log(`  ⚠ ${img.target} (fuente ${img.source} no encontrada)`);
  }
}
console.log(`  Total: ${imgCreated} imágenes creadas`);

await pool.end();
console.log('\n✅ ¡Corrección completa!');
