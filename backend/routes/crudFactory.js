import express from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/authMiddleware.js';

export const createCrudRouter = (tableName, allowedColumns) => {
  const router = express.Router();

  // GET all
  router.get('/', async (req, res) => {
    try {
      const orderCol = allowedColumns.includes('orden') ? 'orden ASC, id ASC' : 'id ASC';
      const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY ${orderCol}`);
      res.json(result.rows);
    } catch (error) {
      console.error(`Error en GET /api/${tableName}:`, error);
      res.status(500).json({ error: 'Error al obtener registros' });
    }
  });

  // POST create
  router.post('/', verifyToken, async (req, res) => {
    try {
      const keys = [];
      const values = [];
      const placeholders = [];
      
      let i = 1;
      for (const col of allowedColumns) {
        if (req.body[col] !== undefined) {
          keys.push(col);
          // Stringify objects/arrays for JSONB columns
          values.push(typeof req.body[col] === 'object' && req.body[col] !== null ? JSON.stringify(req.body[col]) : req.body[col]);
          placeholders.push(`$${i}`);
          i++;
        }
      }

      if (keys.length === 0) return res.status(400).json({ error: 'No valid fields provided' });

      const query = `
        INSERT INTO ${tableName} (${keys.join(', ')})
        VALUES (${placeholders.join(', ')})
        RETURNING *
      `;
      
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(`Error en POST /api/${tableName}:`, error);
      res.status(500).json({ error: 'Error al crear registro' });
    }
  });

  // PUT update
  router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
      const keys = [];
      const values = [];
      
      let i = 1;
      for (const col of allowedColumns) {
        if (req.body[col] !== undefined) {
          keys.push(`${col} = $${i}`);
          values.push(typeof req.body[col] === 'object' && req.body[col] !== null ? JSON.stringify(req.body[col]) : req.body[col]);
          i++;
        }
      }

      if (keys.length === 0) return res.status(400).json({ error: 'No valid fields provided' });

      values.push(id);
      const query = `
        UPDATE ${tableName}
        SET ${keys.join(', ')}
        WHERE id = $${i}
        RETURNING *
      `;
      
      const result = await pool.query(query, values);
      if (result.rowCount === 0) return res.status(404).json({ error: 'Registro no encontrado' });
      res.json(result.rows[0]);
    } catch (error) {
      console.error(`Error en PUT /api/${tableName}:`, error);
      res.status(500).json({ error: 'Error al actualizar registro' });
    }
  });

  // DELETE
  router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(`DELETE FROM ${tableName} WHERE id = $1 RETURNING id`, [id]);
      if (result.rowCount === 0) return res.status(404).json({ error: 'Registro no encontrado' });
      res.json({ success: true, message: 'Registro eliminado' });
    } catch (error) {
      console.error(`Error en DELETE /api/${tableName}:`, error);
      res.status(500).json({ error: 'Error al eliminar registro' });
    }
  });

  return router;
};
