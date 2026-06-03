import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

// Importar rutas
import cultoresRouter from './routes/cultores.js';
import historiaRouter from './routes/historia.js';
import bibliotecaRouter from './routes/biblioteca.js';
import sugerenciasRouter from './routes/sugerencias.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

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
