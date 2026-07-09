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

  // Fix historia_features (use id to avoid encoding issues in WHERE)
  await client.query(`UPDATE historia_features SET descripcion = $1 WHERE id = 1`, [
    'Tacarigua es un semivalle fértil entre cerros como El Tamoco y El Portachuelo. El agua y la alfarería le dieron identidad desde tiempos indígenas.'
  ]);
  await client.query(`UPDATE historia_features SET titulo = $1, descripcion = $2 WHERE id = 2`, [
    'Agua estratégica',
    'En 1971 la UCV describió la zona como la hidrósfera más importante del oriente de Venezuela por sus manantiales, quebradas y lagunas.'
  ]);
  await client.query(`UPDATE historia_features SET descripcion = $1 WHERE id = 3`, [
    'El topónimo Tacarigua tiene origen guaiquerí y se propagó desde Miranda hasta Nueva Esparta junto a las rutas indígenas.'
  ]);

  // Fix historia_secciones
  await client.query(`UPDATE historia_secciones SET titulo = $1, contenido = $2 WHERE id = 1`, [
    'Origen del nombre Tacarigua',
    'El nombre Tacarigua proviene del pueblo indígena Guaiquerí y está vinculado al árbol balsa. La primera referencia documental aparece en la Información de Testigos de 1580.'
  ]);

  // Fix nosotros_features
  await client.query(`UPDATE nosotros_features SET descripcion = $1 WHERE id = 5`, [
    'Cronología desde los primeros asentamientos indígenas hasta la actualidad, con documentos originales y fuentes verificadas.'
  ]);
  await client.query(`UPDATE nosotros_features SET descripcion = $1 WHERE id = 6`, [
    'Tradiciones, festividades, gastronomía típica y expresiones artísticas que definen la identidad tacarigüera.'
  ]);
  await client.query(`UPDATE nosotros_features SET titulo = $1, descripcion = $2 WHERE id = 7`, [
    'Geografía',
    'Mapa interactivo, topografía, recursos naturales y puntos de interés del valle de Tacarigua.'
  ]);
  await client.query(`UPDATE nosotros_features SET descripcion = $1 WHERE id = 9`, [
    'Repositorio digital de libros, documentos, música y fotografías históricas de libre acceso.'
  ]);
  await client.query(`UPDATE nosotros_features SET descripcion = $1 WHERE id = 10`, [
    'Efemérides históricas, religiosas, culturales y fechas conmemorativas del municipio Gómez y Tacarigua.'
  ]);

  // Fix nosotros_valores
  await client.query(`UPDATE nosotros_valores SET descripcion = $1 WHERE id = 5`, [
    'Información verificada y documentada con fuentes confiables'
  ]);
  await client.query(`UPDATE nosotros_valores SET titulo = $1, descripcion = $2 WHERE id = 7`, [
    'Innovación',
    'Uso de tecnología moderna para preservar la historia'
  ]);
  await client.query(`UPDATE nosotros_valores SET titulo = $1, descripcion = $2 WHERE id = 9`, [
    'Pasión',
    'Amor profundo por nuestra tierra y su historia'
  ]);
  await client.query(`UPDATE nosotros_valores SET titulo = $1, descripcion = $2 WHERE id = 10`, [
    'Educación',
    'Compromiso con el aprendizaje y la difusión cultural'
  ]);

  // Fix nosotros_stats
  await client.query(`UPDATE nosotros_stats SET label = $1 WHERE id = 8`, ['Módulos del Portal']);

  // Fix home_featured image paths
  await client.query(`UPDATE home_featured SET imagen_src = $1, imagen_fallback = $2 WHERE id = 5`, [
    '/images/culturainicio.jpg', '/images/culturainicio.jpg'
  ]);
  await client.query(`UPDATE home_featured SET imagen_src = $1, imagen_fallback = $2 WHERE id = 6`, [
    '/images/mapainicio.jpg', '/images/mapainicio.jpg'
  ]);
  await client.query(`UPDATE home_featured SET imagen_src = $1, imagen_fallback = $2 WHERE id = 7`, [
    '/images/scj.jpg', '/images/scj.jpg'
  ]);
  await client.query(`UPDATE home_featured SET imagen_src = $1, imagen_fallback = $2 WHERE id = 8`, [
    '/images/historiat.jpg', '/images/historiat.jpg'
  ]);

  await client.query('COMMIT');
  console.log('✅ Encoding e imágenes corregidos correctamente');
} catch (e) {
  await client.query('ROLLBACK');
  console.error('❌ Error:', e.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}
