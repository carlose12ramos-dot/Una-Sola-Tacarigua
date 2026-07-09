import pool from './db.js';

async function checkTables() {
  try {
    const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Tablas existentes:");
    res.rows.forEach(row => console.log(`- ${row.table_name}`));
    process.exit(0);
  } catch (error) {
    console.error("Error consultando tablas:", error);
    process.exit(1);
  }
}

checkTables();
