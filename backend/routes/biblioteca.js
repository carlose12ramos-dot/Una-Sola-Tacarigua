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

  let table = 'biblioteca_documentos';
  try {
    await pool.query('SELECT 1 FROM biblioteca_documentos LIMIT 1');
  } catch (e) {
    table = 'biblioteca';
  }

  try {
    let query;
    let values;
    if (table === 'biblioteca_documentos') {
      query = `
        INSERT INTO biblioteca_documentos (titulo, autor, categoria, formato, url_archivo, imagen_portada)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      values = [titulo, autor, categoria, formato, url_archivo || null, imagen_portada || imagen || null];
    } else {
      query = `
        INSERT INTO biblioteca (titulo, autor, categoria, formato, url_archivo, imagen_portada)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      values = [titulo, autor, categoria, formato, url_archivo || null, imagen_portada || imagen || null];
    }
    const result = await pool.query(query, values);
    
    // Normalize return object
    const created = result.rows[0];
    res.status(201).json({
      id: created.id,
      titulo: created.titulo,
      autor: created.autor,
      categoria: created.categoria,
      formato: created.formato,
      url_archivo: created.url_archivo || null,
      imagen_portada: created.imagen_portada || created.imagen || null,
      creado_en: created.creado_en
    });
  } catch (error) {
    console.error('Error en POST /api/biblioteca:', error);
    res.status(500).json({ error: 'Error al registrar el elemento en la biblioteca' });
  }
});

export default router;
