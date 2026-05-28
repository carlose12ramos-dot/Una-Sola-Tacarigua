import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET: Obtener todas las sugerencias de la bandeja de moderación
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sugerencias ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en GET /api/sugerencias:', error);
    res.status(500).json({ error: 'Error al obtener la bandeja de moderación' });
  }
});

// POST: Crear/enviar una sugerencia ciudadana
router.post('/', async (req, res) => {
  const { usuario_nombre, tipo_aporte, detalles, imagen } = req.body;
  
  if (!usuario_nombre || !tipo_aporte || !detalles) {
    return res.status(400).json({ error: 'Faltan campos requeridos (usuario_nombre, tipo_aporte, detalles)' });
  }

  try {
    const query = `
      INSERT INTO sugerencias (usuario_nombre, tipo_aporte, detalles, estado, imagen)
      VALUES ($1, $2, $3, 'pendiente', $4)
      RETURNING *
    `;
    const values = [usuario_nombre, tipo_aporte, detalles, imagen || null];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en POST /api/sugerencias:', error);
    res.status(500).json({ error: 'Error al enviar la sugerencia' });
  }
});

// PUT: Modificar el estado de moderación (Aprobar/Rechazar)
router.put('/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; // 'aprobado' o 'rechazado'

  if (!estado || !['pendiente', 'aprobado', 'rechazado'].includes(estado)) {
    return res.status(400).json({ error: 'Estado de moderación inválido' });
  }

  try {
    const query = `
      UPDATE sugerencias
      SET estado = $1
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [estado, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Sugerencia no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en PUT /api/sugerencias/:id/estado:', error);
    res.status(500).json({ error: 'Error al actualizar el estado de moderación' });
  }
});

export default router;
