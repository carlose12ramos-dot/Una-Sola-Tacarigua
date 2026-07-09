import { Router } from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// GET: Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, correo, creado_en FROM admin_usuarios ORDER BY id ASC');
    // Map to include a default rol
    const users = result.rows.map(u => ({ ...u, rol: 'admin' }));
    res.json(users);
  } catch (error) {
    console.error('Error en GET /api/usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// POST: Crear usuario
router.post('/', verifyToken, async (req, res) => {
  const { nombre, correo, password } = req.body;
  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos (nombre, correo, password)' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO admin_usuarios (nombre, correo, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, nombre, correo, creado_en
    `;
    const result = await pool.query(query, [nombre, correo, hashedPassword]);
    const user = { ...result.rows[0], rol: 'admin' };
    res.status(201).json(user);
  } catch (error) {
    console.error('Error en POST /api/usuarios:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// PUT: Editar usuario
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;

  try {
    const query = `
      UPDATE admin_usuarios
      SET nombre = COALESCE($1, nombre),
          correo = COALESCE($2, correo)
      WHERE id = $3
      RETURNING id, nombre, correo, creado_en
    `;
    const result = await pool.query(query, [nombre, correo, id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    const user = { ...result.rows[0], rol: 'admin' };
    res.json(user);
  } catch (error) {
    console.error('Error en PUT /api/usuarios:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// DELETE: Eliminar usuario
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM admin_usuarios WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ success: true, message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error en DELETE /api/usuarios:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

export default router;
