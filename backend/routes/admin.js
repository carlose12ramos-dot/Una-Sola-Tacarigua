import { Router } from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Función auxiliar para obtener el conteo evitando crashear si la tabla no existe
async function getTableCount(tableName) {
  try {
    const res = await pool.query(`SELECT COUNT(*) FROM ${tableName}`);
    return parseInt(res.rows[0].count, 10);
  } catch (error) {
    console.warn(`[Admin Metrics] Tabla '${tableName}' no encontrada o con error. Se asume 0.`);
    return 0;
  }
}

// GET /api/admin/metrics
router.get('/metrics', async (req, res) => {
  try {
    const [
      usuariosActivos, cultoresValidados, elementosBiblioteca, registrosHistoria,
      costumbres, gastronomia, centrosCulturales,
      instituciones, centrosSalud, disciplinasDeporte,
      efemerides, homeCards
    ] = await Promise.all([
      getTableCount('admin_usuarios'),
      getTableCount('cultores'),
      getTableCount('biblioteca_items'),
      getTableCount('historia_hitos'),
      getTableCount('cultura_costumbres'),
      getTableCount('cultura_gastronomia'),
      getTableCount('cultura_centros'),
      getTableCount('sociedad_educacion'),
      getTableCount('sociedad_sanidad'),
      getTableCount('sociedad_deportes'),
      getTableCount('calendario_efemerides'),
      getTableCount('home_cards'),
    ]);

    const metrics = {
      usuariosActivos,
      cultoresValidados,
      elementosBiblioteca,
      registrosHistoria,
      costumbres,
      gastronomia,
      centrosCulturales,
      instituciones,
      centrosSalud,
      disciplinasDeporte,
      efemerides,
      homeCards
    };

    res.json(metrics);
  } catch (error) {
    console.error('Error catastrófico en GET /api/admin/metrics:', error);
    res.status(500).json({ error: 'Error al obtener métricas del administrador' });
  }
});

// PUT /api/admin/profile
router.put('/profile', verifyToken, async (req, res) => {
  const { id, nombre, correo, telefono, biografia } = req.body;

  // Fallback user (no DB record)
  if (id === 'demo-admin') {
    return res.json({ success: true, message: 'Perfil actualizado' });
  }

  try {
    const query = `
      UPDATE usuarios
      SET nombre = COALESCE($1, nombre),
          correo = COALESCE($2, correo),
          telefono = COALESCE($3, telefono),
          biografia = COALESCE($4, biografia)
      WHERE id = $5
      RETURNING id, nombre, correo, rol, telefono, biografia
    `;
    const result = await pool.query(query, [nombre, correo, telefono, biografia, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const { password: _, ...safeUser } = result.rows[0];
    res.json({ success: true, user: safeUser });
  } catch (error) {
    console.error('Error en PUT /api/admin/profile:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

export default router;
