import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET: Obtener todos los cultores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cultores ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en GET /api/cultores:', error);
    res.status(500).json({ error: 'Error al obtener los cultores de la base de datos' });
  }
});

// POST: Crear un nuevo cultor
router.post('/', async (req, res) => {
  const { nombre, disciplina, especialidad, localidad, anios, bandera, imagen, descripcion, activo } = req.body;
  
  if (!nombre || !disciplina || !localidad) {
    return res.status(400).json({ error: 'Faltan campos requeridos (nombre, disciplina, localidad)' });
  }

  try {
    const query = `
      INSERT INTO cultores (nombre, disciplina, especialidad, localidad, anios, bandera, imagen, descripcion, activo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      nombre, 
      disciplina, 
      especialidad || null,
      localidad, 
      anios || null,
      bandera || '🇻🇪', 
      imagen || null, 
      descripcion ? JSON.stringify(descripcion) : '[]',
      activo !== undefined ? activo : true
    ];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en POST /api/cultores:', error);
    res.status(500).json({ error: 'Error al registrar el cultor' });
  }
});

// PUT: Editar un cultor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, disciplina, especialidad, localidad, anios, bandera, imagen, descripcion, activo } = req.body;

  try {
    const query = `
      UPDATE cultores
      SET nombre = COALESCE($1, nombre),
          disciplina = COALESCE($2, disciplina),
          especialidad = COALESCE($3, especialidad),
          localidad = COALESCE($4, localidad),
          anios = COALESCE($5, anios),
          bandera = COALESCE($6, bandera),
          imagen = COALESCE($7, imagen),
          descripcion = COALESCE($8, descripcion),
          activo = COALESCE($9, activo)
      WHERE id = $10
      RETURNING *
    `;
    const values = [
      nombre, 
      disciplina, 
      especialidad,
      localidad, 
      anios,
      bandera, 
      imagen, 
      descripcion ? JSON.stringify(descripcion) : null,
      activo,
      id
    ];
    const result = await pool.query(query, values);
    
    if (result.rowCount === 0) return res.status(404).json({ error: 'Cultor no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en PUT /api/cultores:', error);
    res.status(500).json({ error: 'Error al actualizar el cultor' });
  }
});

// DELETE: Eliminar un cultor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM cultores WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Cultor no encontrado' });
    res.json({ success: true, message: 'Cultor eliminado' });
  } catch (error) {
    console.error('Error en DELETE /api/cultores:', error);
    res.status(500).json({ error: 'Error al eliminar el cultor' });
  }
});

export default router;
