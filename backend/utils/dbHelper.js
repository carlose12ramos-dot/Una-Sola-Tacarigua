import pool from '../db.js';

export async function getBibliotecaItems(formatoFilter = null) {
  let table = 'biblioteca_documentos';
  try {
    // Check if biblioteca_documentos exists
    await pool.query('SELECT 1 FROM biblioteca_documentos LIMIT 1');
  } catch (e) {
    table = 'biblioteca';
  }

  try {
    // Check what columns exist in the resolved table
    const colCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = $1
    `, [table]);
    const columns = colCheck.rows.map(r => r.column_name);

    // If table is 'biblioteca' and lacks columns, add them
    if (table === 'biblioteca') {
      if (!columns.includes('url_archivo')) {
        try {
          await pool.query('ALTER TABLE biblioteca ADD COLUMN url_archivo VARCHAR(255)');
        } catch (err) {
          console.error('Error adding url_archivo to biblioteca:', err.message);
        }
      }
      if (!columns.includes('imagen_portada')) {
        try {
          await pool.query('ALTER TABLE biblioteca ADD COLUMN imagen_portada VARCHAR(255)');
        } catch (err) {
          console.error('Error adding imagen_portada to biblioteca:', err.message);
        }
      }
    }
  } catch (err) {
    console.error('Error checking/altering table schema:', err.message);
  }

  let query = `SELECT * FROM ${table}`;
  const values = [];
  if (formatoFilter) {
    query += ` WHERE formato = $1`;
    values.push(formatoFilter);
  }
  query += ` ORDER BY id ASC`;

  const result = await pool.query(query, values);

  // Normalize rows for the frontend
  return result.rows.map(row => ({
    id: row.id,
    titulo: row.titulo,
    autor: row.autor,
    categoria: row.categoria,
    formato: row.formato,
    url_archivo: row.url_archivo || null,
    imagen_portada: row.imagen_portada || row.imagen || null,
    creado_en: row.creado_en
  }));
}
