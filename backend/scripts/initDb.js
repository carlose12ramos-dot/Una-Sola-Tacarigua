import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde backend/.env
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const initSqlPath = path.resolve(__dirname, '..', 'init.sql');

(async () => {
  // Primero: conectar a la base 'postgres' para crear la BD del proyecto
  const { Pool } = pg;
  const adminPool = new Pool({
    connectionString: process.env.DATABASE_URL.replace(/\/[^/]+$/, '/postgres'),
  });

  try {
    // Verificar si la BD 'tacarigua_digital' ya existe
    const checkDb = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'tacarigua_digital'"
    );

    if (checkDb.rowCount === 0) {
      console.log('📦 Creando base de datos "tacarigua_digital"...');
      await adminPool.query('CREATE DATABASE tacarigua_digital');
      console.log('✅ Base de datos creada exitosamente.');
    } else {
      console.log('ℹ️  La base de datos "tacarigua_digital" ya existe.');
    }
  } catch (err) {
    console.error('❌ Error al crear la base de datos:', err.message);
    process.exit(1);
  } finally {
    await adminPool.end();
  }

  // Segundo: conectar a 'tacarigua_digital' para ejecutar init.sql
  const appPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const sql = fs.readFileSync(initSqlPath, 'utf-8');
    console.log('🔧 Ejecutando init.sql en la base de datos...');

    // Ejecutar el script completo como una sola transacción
    await appPool.query(sql);

    console.log('✅ Tablas creadas y datos semilla insertados correctamente.');
  } catch (err) {
    console.error('❌ Error al ejecutar init.sql:', err.message);
    process.exit(1);
  } finally {
    await appPool.end();
  }

  console.log('\n🚀 ¡Listo! La base de datos está configurada.');
  console.log('   Ejecuta "npm run dev" en /backend para iniciar el servidor.');
})();
