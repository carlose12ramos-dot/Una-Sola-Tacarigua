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
import { getBibliotecaItems } from './utils/dbHelper.js';

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

// Exportar la app para Vercel Serverless
export default app;

// Iniciar servidor solo en desarrollo local
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
    console.log(`💡 Para probar el estado visita: http://localhost:${PORT}/api/status`);
  });
}
