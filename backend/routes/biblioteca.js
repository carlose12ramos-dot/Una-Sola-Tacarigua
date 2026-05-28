import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET: Obtener todos los ítems de la biblioteca
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM biblioteca ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en GET /api/biblioteca:', error);
    res.status(500).json({ error: 'Error al obtener la biblioteca cultural' });
  }
});

// POST: Crear un nuevo ítem en la biblioteca
router.post('/', async (req, res) => {
  const { titulo, autor, categoria, formato, imagen } = req.body;
  
  if (!titulo || !autor || !categoria || !formato) {
    return res.status(400).json({ error: 'Faltan campos requeridos (titulo, autor, categoria, formato)' });
  }

  try {
    const query = `
      INSERT INTO biblioteca (titulo, autor, categoria, formato, imagen)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [titulo, autor, categoria, formato, imagen || null];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en POST /api/biblioteca:', error);
    res.status(500).json({ error: 'Error al registrar el elemento en la biblioteca' });
  }
});

export default router;
