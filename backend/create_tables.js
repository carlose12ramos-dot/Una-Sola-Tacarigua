import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const sql = fs.readFileSync(join(__dirname, 'schema_new_tables.sql'), 'utf8');
const queries = sql.split(';').filter(q => q.trim().length > 0);
for (const q of queries) {
  await pool.query(q);
}
console.log('✓ 6 nuevas tablas creadas');
await pool.end();
