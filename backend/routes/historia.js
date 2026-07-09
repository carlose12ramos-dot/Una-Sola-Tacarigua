import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET: Obtener todos los hitos históricos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM historia_hitos ORDER BY orden ASC, id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en GET /api/historia:', error);
    res.status(500).json({ error: 'Error al obtener la línea de tiempo histórica' });
  }
});

// POST: Crear un nuevo hito histórico
router.post('/', async (req, res) => {
  const { anio, titulo, descripcion, tag, imagen, activo, orden } = req.body;
  
  if (!anio || !titulo || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos (anio, titulo, descripcion)' });
  }

  try {
    const query = `
      INSERT INTO historia_hitos (anio, titulo, descripcion, tag, imagen, activo, orden)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [anio, titulo, descripcion, tag || null, imagen || null, activo !== undefined ? activo : true, orden || 0];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en POST /api/historia:', error);
    res.status(500).json({ error: 'Error al registrar el hito histórico' });
  }
});

// PUT: Editar un hito histórico
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { anio, titulo, descripcion, tag, imagen, activo, orden } = req.body;

  try {
    const query = `
      UPDATE historia_hitos
      SET anio = COALESCE($1, anio),
          titulo = COALESCE($2, titulo),
          descripcion = COALESCE($3, descripcion),
          tag = COALESCE($4, tag),
          imagen = COALESCE($5, imagen),
          activo = COALESCE($6, activo),
          orden = COALESCE($7, orden)
      WHERE id = $8
      RETURNING *
    `;
    const values = [anio, titulo, descripcion, tag, imagen, activo, orden, id];
    const result = await pool.query(query, values);
    
    if (result.rowCount === 0) return res.status(404).json({ error: 'Hito no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en PUT /api/historia:', error);
    res.status(500).json({ error: 'Error al actualizar el hito histórico' });
  }
});

// DELETE: Eliminar un hito histórico
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM historia_hitos WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Hito no encontrado' });
    res.json({ success: true, message: 'Hito eliminado' });
  } catch (error) {
    console.error('Error en DELETE /api/historia:', error);
    res.status(500).json({ error: 'Error al eliminar el hito histórico' });
  }
});

export default router;
