import { Router } from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
  }

  try {
    const fallbackEmail = process.env.ADMIN_FALLBACK_EMAIL;
    const fallbackPass = process.env.ADMIN_FALLBACK_PASS;

    // Credenciales de emergencia (fallback) - solo para el admin principal mediante ENV
    if (fallbackEmail && fallbackPass && correo === fallbackEmail && password === fallbackPass) {
      const fallbackUser = {
        id: 'demo-admin',
        nombre: 'Carlos Eduardo Ramos González',
        correo,
        rol: 'admin',
      };
      
      const token = jwt.sign(
        { id: fallbackUser.id, rol: fallbackUser.rol },
        process.env.JWT_SECRET || 'fallback_secret_key_change_me',
        { expiresIn: '8h' }
      );

      return res.json({ user: fallbackUser, token });
    }

    // Buscar usuario por correo solamente
    const query = `SELECT id, nombre, correo, rol, password FROM usuarios WHERE correo = $1 LIMIT 1`;
    const result = await pool.query(query, [correo]);

    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas. Revisa tus datos.' });
    }

    const user = result.rows[0];

    // Comparar contraseña: soportar tanto texto plano (legacy) como bcrypt (nuevo)
    let passwordMatch = false;
    
    if (user.password) {
      // Intentar comparar como bcrypt primero
      const isBcryptHash = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
      if (isBcryptHash) {
        passwordMatch = await bcrypt.compare(password, user.password);
      } else {
        // Comparación de texto plano (usuarios creados antes del hashing)
        passwordMatch = user.password === password;
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas. Revisa tus datos.' });
    }

    if (user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso restringido a cuentas con rol admin.' });
    }

    // No devolver la contraseña al cliente
    const { password: _, ...safeUser } = user;

    const token = jwt.sign(
      { id: safeUser.id, rol: safeUser.rol },
      process.env.JWT_SECRET || 'fallback_secret_key_change_me',
      { expiresIn: '8h' }
    );

    return res.json({ user: safeUser, token });
  } catch (error) {
    console.error('Error en POST /api/auth/login:', error);
    return res.status(500).json({ error: 'Error interno de autenticación.' });
  }
});

export default router;
