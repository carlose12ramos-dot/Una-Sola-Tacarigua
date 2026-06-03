import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const { Pool } = pg;

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
