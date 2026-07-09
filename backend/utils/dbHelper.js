import pool from '../db.js';

export async function getBibliotecaItems(formatoFilter = null) {
  let query = `SELECT * FROM biblioteca_items`;
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
    url_archivo: row.url || null,
    imagen_portada: row.imagen || null,
    creado_en: row.creado_en
  }));
}
