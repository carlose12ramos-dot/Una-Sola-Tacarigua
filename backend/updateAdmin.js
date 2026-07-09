import pool from './db.js';

async function main() {
  await pool.query('DELETE FROM admin_usuarios WHERE id = 1');
  await pool.query("UPDATE admin_usuarios SET nombre = 'Carlos Eduardo Ramos González' WHERE id = 4");
  console.log('Database updated.');
  process.exit(0);
}

main();
