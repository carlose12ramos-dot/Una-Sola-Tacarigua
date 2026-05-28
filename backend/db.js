import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Inicializamos el Pool de conexión usando la variable DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Conexión establecida con la base de datos PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de clientes PostgreSQL:', err);
});

export default pool;
