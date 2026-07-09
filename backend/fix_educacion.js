import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();

try {
  await client.query('BEGIN');

  // Clear existing sociedad_educacion
  await client.query('TRUNCATE TABLE sociedad_educacion RESTART IDENTITY CASCADE');
  console.log('  ✓ Tabla limpiada');

  // Insert the 4 current educational institutions with their imagen keys
  const escuelas = [
    {
      nombre: 'U.E. "Napoleón Narváez"',
      nivel: 'Educación Inicial y Básica',
      descripcion: 'Fundada en 1946. Lleva el nombre del ilustre historiador neoespartano Napoleón Narváez. Ha formado generaciones de tacarigüeros y cuenta con biblioteca escolar desde 1987. Ubicada en la Calle Principal de Tacarigua.',
      icono: '🏫',
      imagen: 'escuelaNapoleonNarvaez',
      activo: true,
      orden: 0,
    },
    {
      nombre: 'U.E.E. "Cruz Millán García"',
      nivel: 'Educación Inicial, Básica y Media General',
      descripcion: 'La U.E.E. Cruz Millán García (Unidad Educativa Estadal Cruz Millán García) es una institución pública de educación básica y media general. Fue fundada en enero de 1963. Su historia se remonta a 1931 cuando inició como la Escuela Mixta Nº 26. Ubicada en el Valle de San Sebastián, en el Municipio Gómez del Estado Nueva Esparta, Venezuela.',
      icono: '🏫',
      imagen: 'escuelaCruzMillanGarcia',
      activo: true,
      orden: 1,
    },
    {
      nombre: 'U.E. "Roraima"',
      nivel: 'Educación Inicial, Básica y Media General',
      descripcion: 'La Unidad Educativa Roraima es un prestigioso colegio privado bilingüe ubicado en la Calle Principal de Tacariguita, Municipio Gómez, Estado Nueva Esparta. Ofrece formación integral (Educación Inicial, Primaria y Media General) enfocada en la libertad, el contacto con la naturaleza y la diversión.',
      icono: '📖',
      imagen: 'escuelaRoraima',
      activo: true,
      orden: 2,
    },
    {
      nombre: 'U.E. "Colegio Divina Pastora"',
      nivel: 'Educación Inicial, Básica y Media General',
      descripcion: 'Fundada el 23 de septiembre de 1993 por la Licenciada Yumeli Rivera Núñez. Proyecto educativo privado basado en valores cristianos y humanos, con una pedagogía participativa y progresista. Ubicado en la Vía Principal de Tacarigua.',
      icono: '✏️',
      imagen: 'colegioDivinaPastora',
      activo: true,
      orden: 3,
    },
  ];

  for (const e of escuelas) {
    await client.query(
      `INSERT INTO sociedad_educacion (nombre, nivel, descripcion, icono, imagen, activo, orden)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [e.nombre, e.nivel, e.descripcion, e.icono, e.imagen, e.activo, e.orden]
    );
  }
  console.log(`  ✓ ${escuelas.length} instituciones educativas insertadas con sus imágenes`);

  // Also fix sociedad_educacion_hitos column name mapping (anio is correct in DB)
  // Check if sociedad_educacion_hitos needs data
  const hitosCount = await client.query('SELECT COUNT(*) FROM sociedad_educacion_hitos');
  if (parseInt(hitosCount.rows[0].count) === 0) {
    const hitos = [
      { anio: '1870', evento: 'Firma del Decreto de Instrucción Pública Gratuita y Obligatoria por el presidente Antonio Guzmán Blanco el 27 de junio de 1870.' },
      { anio: '1875', evento: 'El 12 de julio de 1875 se inaugura la Escuela Federal Diurna de Varones N° 860 en Tacarigua. Primer preceptor: Ignacio Jiménez, con 42 alumnos.' },
      { anio: '1897', evento: 'Reapertura de la Escuela Federal de Varones N° 860 como Escuela Federal N° 1550 de Hembras Diurna.' },
      { anio: '1934', evento: 'Nombramiento de Cándido Sánchez como maestro de la Escuela Nocturna N° 8 de Tacarigua.' },
      { anio: '1946', evento: 'Fundación del Grupo Escolar Napoleón Narváez, fusionando escuelas federales y estadales.' },
      { anio: '1949', evento: 'Evaristo Alfonzo Guerra se gradúa como primer universitario originario de Tacarigua.' },
      { anio: '1963', evento: 'Inauguración del edificio de la Escuela San Sebastián (hoy Cruz Millán García).' },
      { anio: '1993', evento: 'Fundación del Colegio Divina Pastora por la Lic. Yumeli Rivera Núñez.' },
    ];
    for (const h of hitos) {
      await client.query(
        `INSERT INTO sociedad_educacion_hitos (anio, evento, activo, orden) VALUES ($1, $2, true, 0)`,
        [h.anio, h.evento]
      );
    }
    console.log(`  ✓ ${hitos.length} hitos educativos insertados`);
  } else {
    console.log(`  - ${hitosCount.rows[0].count} hitos ya existen, saltando`);
  }

  await client.query('COMMIT');
  console.log('\n✅ Sociedad Educación restaurada con imágenes correctas');
} catch (e) {
  await client.query('ROLLBACK');
  console.error('❌ Error:', e.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}
