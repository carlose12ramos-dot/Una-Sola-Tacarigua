import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import { stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importar rutas
import cultoresRouter from './routes/cultores.js';
import historiaRouter from './routes/historia.js';
import bibliotecaRouter from './routes/biblioteca.js';
import sugerenciasRouter from './routes/sugerencias.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import usuariosRouter from './routes/usuarios.js';
import uploadRouter from './routes/upload.js';
import { getBibliotecaItems } from './utils/dbHelper.js';
import { createCrudRouter } from './routes/crudFactory.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta Libros
app.get('/api/libros/:filename', async (req, res) => {
  try {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = join(__dirname, '..', 'Libros', filename);
    
    const stats = await stat(filePath);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(filename)}"`);
    
    const readStream = createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error('Error sirviendo archivo de libros:', error);
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

app.get('/api/portadas/:filename', async (req, res) => {
  try {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = join(__dirname, '..', 'Libros', 'Portada libros', filename);
    
    const stats = await stat(filePath);
    
    const ext = filename.split('.').pop()?.toLowerCase();
    const mimeTypes = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp'
    };
    const mimeType = ext ? (mimeTypes[ext] || 'image/jpeg') : 'image/jpeg';
    
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    const readStream = createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error('Error sirviendo portada:', error);
    res.status(404).json({ error: 'Portada no encontrada' });
  }
});

app.get('/api/biblioteca/libros', async (req, res) => {
  try {
    const libros = await getBibliotecaItems('Libros');
    res.json(libros);
  } catch (error) {
    console.error('Error en GET /api/biblioteca/libros:', error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

// Endpoints base de validación
app.get('/api/status', async (req, res) => {
  try {
    const dbCheck = await pool.query('SELECT NOW()');
    res.json({
      status: 'online',
      message: 'Backend de Una Sola Tacarigua activo',
      db_time: dbCheck.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      status: 'degraded',
      message: 'El servidor está activo pero no puede conectar a la base de datos',
      error: error.message
    });
  }
});

// Vincular Rutas del API
app.use('/api/auth', authRouter);
app.use('/api/cultores', cultoresRouter);
app.use('/api/historia', historiaRouter);
app.use('/api/biblioteca', bibliotecaRouter);
app.use('/api/sugerencias', sugerenciasRouter);
app.use('/api/admin', adminRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/upload', uploadRouter);

// Rutas dinámicas CRUD
app.use('/api/cultura/costumbres', createCrudRouter('cultura_costumbres', ['nombre', 'categoria', 'descripcion', 'imagen', 'fuente', 'activo', 'orden']));
app.use('/api/cultura/gastronomia', createCrudRouter('cultura_gastronomia', ['nombre', 'descripcion', 'ingredientes', 'imagen', 'activo', 'orden']));
app.use('/api/cultura/centros', createCrudRouter('cultura_centros', ['titulo', 'subtitulo', 'resumen', 'contenido_html', 'imagen', 'imagen_logo', 'activo', 'orden']));
app.use('/api/sociedad/educacion', createCrudRouter('sociedad_educacion', ['nombre', 'nivel', 'descripcion', 'icono', 'imagen', 'activo', 'orden']));
app.use('/api/sociedad/sanidad', createCrudRouter('sociedad_sanidad', ['nombre', 'tipo', 'direccion', 'horarios', 'servicios', 'telefono', 'imagen', 'activo', 'orden']));
app.use('/api/sociedad/deportes', createCrudRouter('sociedad_deportes', ['disciplina', 'icono', 'color_hex', 'descripcion', 'hitos_destacados', 'activo', 'orden']));
app.use('/api/home_cards', createCrudRouter('home_cards', ['tipo', 'titulo', 'descripcion', 'detalle', 'info', 'imagen', 'modal_images', 'activo', 'orden']));
app.use('/api/calendario', createCrudRouter('calendario_efemerides', ['dia', 'mes', 'tipo', 'titulo', 'descripcion', 'anio', 'activo']));

// Rutas CRUD nuevas tablas
app.use('/api/home/hero-slides', createCrudRouter('home_hero_slides', ['image_key', 'title', 'subtitle', 'activo', 'orden']));
app.use('/api/geografia/sectores', createCrudRouter('geografia_sectores', ['icono', 'title', 'content', 'activo', 'orden']));
app.use('/api/geografia/censos', createCrudRouter('geografia_censos', ['year', 'housing', 'population', 'activo', 'orden']));
app.use('/api/geografia/highlights', createCrudRouter('geografia_highlights', ['icono', 'title', 'description', 'activo', 'orden']));
app.use('/api/mapa/lugares', createCrudRouter('mapa_lugares', ['name', 'lat', 'lng', 'category', 'vicinity', 'editorial_summary', 'activo', 'orden']));
app.use('/api/sociedad/sanidad/hitos', createCrudRouter('sociedad_sanidad_hitos', ['periodo', 'titulo', 'icono', 'resumen', 'contenido_html', 'imagen', 'activo', 'orden']));

// Fase 2: Nuevas rutas CRUD
app.use('/api/sociedad/medicina-trad', createCrudRouter('sociedad_medicina_trad', ['nombre', 'descripcion', 'icono', 'activo', 'orden']));
app.use('/api/sociedad/educacion/hitos', createCrudRouter('sociedad_educacion_hitos', ['anio', 'evento', 'activo', 'orden']));
app.use('/api/sociedad/educadores', createCrudRouter('sociedad_educadores', ['nombre', 'apodo', 'imagen', 'descripcion', 'detalles_html', 'activo', 'orden']));
app.use('/api/sociedad/personajes', createCrudRouter('sociedad_personajes', ['nombre', 'resumen', 'activo', 'orden']));
app.use('/api/nosotros/features', createCrudRouter('nosotros_features', ['icono', 'titulo', 'descripcion', 'activo', 'orden']));
app.use('/api/nosotros/valores', createCrudRouter('nosotros_valores', ['icono', 'titulo', 'descripcion', 'activo', 'orden']));
app.use('/api/nosotros/stats', createCrudRouter('nosotros_stats', ['icono', 'label', 'valor', 'activo', 'orden']));
app.use('/api/nosotros/mision-vision', createCrudRouter('nosotros_mision_vision', ['tipo', 'titulo', 'contenido', 'activo']));
app.use('/api/historia/secciones', createCrudRouter('historia_secciones', ['titulo', 'contenido', 'activo', 'orden']));
app.use('/api/historia/videos', createCrudRouter('historia_videos', ['src', 'titulo', 'caption', 'activo', 'orden']));
app.use('/api/historia/documentos', createCrudRouter('historia_documentos', ['src', 'full_src', 'alt', 'titulo', 'descripcion', 'activo', 'orden']));
app.use('/api/historia/features', createCrudRouter('historia_features', ['icono_nombre', 'titulo', 'descripcion', 'activo', 'orden']));
app.use('/api/historia/datos-rapidos', createCrudRouter('historia_datos_rapidos', ['icono_nombre', 'label', 'texto', 'activo', 'orden']));
app.use('/api/home/featured', createCrudRouter('home_featured', ['path', 'titulo', 'descripcion', 'icono_nombre', 'imagen_src', 'imagen_fallback', 'imagen_alt', 'activo', 'orden']));

// Fase 3: Nuevas rutas CRUD (datos migrados del frontend original)
app.use('/api/home/hero-slides', createCrudRouter('home_hero_slides', ['image_key', 'title', 'subtitle', 'activo', 'orden']));
app.use('/api/geografia/sectores', createCrudRouter('geografia_sectores', ['icono', 'title', 'content', 'activo', 'orden']));
app.use('/api/geografia/censos', createCrudRouter('geografia_censos', ['year', 'housing', 'population', 'activo', 'orden']));
app.use('/api/geografia/highlights', createCrudRouter('geografia_highlights', ['icono', 'title', 'description', 'activo', 'orden']));
app.use('/api/mapa/lugares', createCrudRouter('mapa_lugares', ['name', 'lat', 'lng', 'category', 'vicinity', 'editorial_summary', 'activo', 'orden']));
app.use('/api/sociedad/sanidad/hitos', createCrudRouter('sociedad_sanidad_hitos', ['periodo', 'titulo', 'icono', 'resumen', 'contenido_html', 'imagen', 'activo', 'orden']));

// Exportar la app para Vercel Serverless
export default app;

// Iniciar servidor solo en desarrollo local
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
    console.log(`💡 Para probar el estado visita: http://localhost:${PORT}/api/status`);
  });
}
