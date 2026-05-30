import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres:R0kyY0YkljGpjbMK@db.hkzxltgzjydaqcawcxcg.supabase.co:5432/postgres';

const client = new Client({
  connectionString,
});

async function initDb() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL');

    // 1. Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS culture_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS culture_subcategories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category_id UUID REFERENCES culture_categories(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        UNIQUE(category_id, name)
      );

      CREATE TABLE IF NOT EXISTS culture_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title_name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT,
        category_id UUID REFERENCES culture_categories(id) ON DELETE CASCADE,
        subcategory_id UUID REFERENCES culture_subcategories(id) ON DELETE SET NULL,
        extra_info JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tables created successfully.');

    // 2. Insert Categories
    const resCat = await client.query(`
      INSERT INTO culture_categories (name) VALUES 
      ('Cultores'), 
      ('Costumbres y Tradiciones'), 
      ('Gastronomía')
      ON CONFLICT (name) DO NOTHING
      RETURNING id, name;
    `);

    // Fetch categories if they already existed
    const categoriesResult = await client.query('SELECT * FROM culture_categories;');
    const categories = {};
    categoriesResult.rows.forEach(r => categories[r.name] = r.id);

    const cultoresId = categories['Cultores'];

    // 3. Insert Subcategories for Cultores
    const resSub = await client.query(`
      INSERT INTO culture_subcategories (category_id, name) VALUES 
      ($1, 'Cantantes'),
      ($1, 'Músicos'),
      ($1, 'Compositores'),
      ($1, 'Artesanos'),
      ($1, 'Personajes Populares')
      ON CONFLICT (category_id, name) DO NOTHING
      RETURNING id, name;
    `, [cultoresId]);

    const subcatsResult = await client.query('SELECT * FROM culture_subcategories WHERE category_id = $1;', [cultoresId]);
    const subcats = {};
    subcatsResult.rows.forEach(r => subcats[r.name] = r.id);

    // 4. Insert mock data from the frontend mock file
    // Just inserting some basic ones to test
    const cultoresData = [
      {
        nombre: 'Maestro Antonio Salazar',
        disciplina: 'Músicos',
        especialidad: 'Cuatro venezolano y mandolina',
        localidad: 'Tacarigua',
        anios: '40 años de oficio',
        bandera: '🇻🇪',
        imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        descripcion: 'Maestro luthier cuya familia lleva cuatro generaciones fabricando el cuatro venezolano en Tacarigua.'
      },
      {
        nombre: 'Doña Carmen Rodríguez',
        disciplina: 'Artesanos',
        especialidad: 'Cerámica y alfarería tradicional',
        localidad: 'San Sebastián',
        anios: '35 años de oficio',
        bandera: '🇻🇪',
        imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        descripcion: 'Alfarera que preserva la técnica prehispánica de modelado con arcilla del valle de Tacarigua.'
      }
    ];

    for (const c of cultoresData) {
      await client.query(`
        INSERT INTO culture_items (title_name, description, image_url, category_id, subcategory_id, extra_info)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        c.nombre,
        c.descripcion,
        c.imagen,
        cultoresId,
        subcats[c.disciplina] || null,
        JSON.stringify({
          disciplina: c.disciplina,
          especialidad: c.especialidad,
          localidad: c.localidad,
          anios: c.anios,
          bandera: c.bandera
        })
      ]);
    }

    console.log('Mock data inserted successfully.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

initDb();
