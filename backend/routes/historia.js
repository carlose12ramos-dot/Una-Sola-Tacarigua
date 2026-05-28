import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET: Obtener todos los hitos históricos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM historia ORDER BY anio ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en GET /api/historia:', error);
    res.status(500).json({ error: 'Error al obtener la línea de tiempo histórica' });
  }
});

// POST: Crear un nuevo hito histórico
router.post('/', async (req, res) => {
  const { anio, titulo, descripcion, imagen, activo } = req.body;
  
  if (!anio || !titulo || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos (anio, titulo, descripcion)' });
  }

  try {
    const query = `
      INSERT INTO historia (anio, titulo, descripcion, imagen, activo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [anio, titulo, descripcion, imagen || null, activo || false];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en POST /api/historia:', error);
    res.status(500).json({ error: 'Error al registrar el hito histórico' });
  }
});

export default router;
