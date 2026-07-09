import pool from '../backend/db.js';

async function alterTable() {
  try {
    console.log('Alterando tabla sugerencias...');
    await pool.query('ALTER TABLE sugerencias ADD COLUMN IF NOT EXISTS adjuntos JSONB;');
    console.log('Columna adjuntos agregada exitosamente.');
  } catch (error) {
    console.error('Error al alterar la tabla:', error);
  } finally {
    await pool.end();
  }
}

alterTable();
