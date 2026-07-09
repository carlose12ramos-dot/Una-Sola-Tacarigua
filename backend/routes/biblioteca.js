import { Router } from 'express';
import pool from '../db.js';
import { getBibliotecaItems } from '../utils/dbHelper.js';

const router = Router();

// GET: Obtener todos los ítems de la biblioteca
router.get('/', async (req, res) => {
  try {
    const items = await getBibliotecaItems();
    res.json(items);
  } catch (error) {
    console.error('Error en GET /api/biblioteca:', error);
    res.status(500).json({ error: 'Error al obtener la biblioteca cultural' });
  }
});

// POST: Crear un nuevo ítem en la biblioteca
router.post('/', async (req, res) => {
  const { titulo, autor, categoria, formato, imagen, url_archivo, imagen_portada } = req.body;
  
  if (!titulo || !autor || !categoria || !formato) {
    return res.status(400).json({ error: 'Faltan campos requeridos (titulo, autor, categoria, formato)' });
  }

  try {
    const query = `
      INSERT INTO biblioteca_items (titulo, autor, categoria, formato, url, imagen)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [titulo, autor, categoria, formato, url_archivo || null, imagen_portada || imagen || null];
    const result = await pool.query(query, values);
    
    const created = result.rows[0];
    res.status(201).json({
      id: created.id,
      titulo: created.titulo,
      autor: created.autor,
      categoria: created.categoria,
      formato: created.formato,
      url_archivo: created.url || null,
      imagen_portada: created.imagen || null,
      creado_en: created.creado_en
    });
  } catch (error) {
    console.error('Error en POST /api/biblioteca:', error);
    res.status(500).json({ error: 'Error al registrar el elemento en la biblioteca' });
  }
});

// PUT: Editar un elemento de la biblioteca
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, categoria, formato, imagen, url_archivo, imagen_portada } = req.body;

  try {
    const query = `
      UPDATE biblioteca_items
      SET titulo = COALESCE($1, titulo),
          autor = COALESCE($2, autor),
          categoria = COALESCE($3, categoria),
          formato = COALESCE($4, formato),
          url = COALESCE($5, url),
          imagen = COALESCE($6, imagen)
      WHERE id = $7
      RETURNING *
    `;
    const values = [titulo, autor, categoria, formato, url_archivo, imagen_portada || imagen, id];
    const result = await pool.query(query, values);
    
    if (result.rowCount === 0) return res.status(404).json({ error: 'Elemento no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en PUT /api/biblioteca:', error);
    res.status(500).json({ error: 'Error al actualizar el elemento' });
  }
});

// DELETE: Eliminar un elemento de la biblioteca
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`DELETE FROM biblioteca_items WHERE id = $1 RETURNING id`, [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Elemento no encontrado' });
    res.json({ success: true, message: 'Elemento eliminado' });
  } catch (error) {
    console.error('Error en DELETE /api/biblioteca:', error);
    res.status(500).json({ error: 'Error al eliminar el elemento' });
  }
});

export default router;
