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
  const { nombre, disciplina, localidad, bandera, imagen } = req.body;
  
  if (!nombre || !disciplina || !localidad) {
    return res.status(400).json({ error: 'Faltan campos requeridos (nombre, disciplina, localidad)' });
  }

  try {
    const query = `
      INSERT INTO cultores (nombre, disciplina, localidad, bandera, imagen)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [nombre, disciplina, localidad, bandera || '🇻🇪', imagen || null];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en POST /api/cultores:', error);
    res.status(500).json({ error: 'Error al registrar el cultor' });
  }
});

export default router;
