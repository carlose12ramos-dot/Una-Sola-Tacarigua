import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import pool from '../backend/db.js';

const librosDir = join(process.cwd(), 'Libros');
const portadasDir = join(librosDir, 'Portada libros');

function normalizarNombre(nombre) {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()
    .replace(/^-|-$/g, '');
}

function extraerBase(nombre) {
  const sinExt = nombre.replace(/\.(pdf|png|jpg|jpeg|gif|webp)$/i, '');
  return normalizarNombre(sinExt);
}

function extraerBaseOriginal(nombre) {
  return nombre.replace(/\.(pdf|png|jpg|jpeg|gif|webp)$/i, '');
}

async function migrar() {
  try {
    const [librosRaw, portadasRaw] = await Promise.all([
      readdir(librosDir),
      readdir(portadasDir)
    ]);

    const pdfs = librosRaw
      .filter(f => f.toLowerCase().endsWith('.pdf'))
      .sort((a, b) => a.localeCompare(b));

    const portadas = portadasRaw
      .filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b));

    const portadasPorBase = new Map();
    for (const p of portadas) {
      const base = extraerBase(p);
      if (!portadasPorBase.has(base)) {
        portadasPorBase.set(base, p);
      }
    }

    const portadaEspecial = portadas.find(p => extraerBase(p) === 'portada') || null;
    if (portadaEspecial) {
      console.log(`⛔ Portada ignorada: ${portadaEspecial} (genérica, no mapeada)`);
    }

    const resultados = [];
    for (const pdf of pdfs) {
      const baseNorm = extraerBase(pdf);
      const portadaMatch = portadasPorBase.get(baseNorm);
      
      if (portadaMatch) {
        resultados.push({ pdf, portada: portadaMatch });
      } else {
        resultados.push({ pdf, portada: null });
        console.log(`⚠️  Sin portada para: ${pdf}`);
      }
    }

    console.log(`\n📚 PDFs procesados: ${resultados.length}`);
    console.log(`✅ Con portada: ${resultados.filter(r => r.portada).length}`);
    console.log(`❌ Sin portada: ${resultados.filter(r => !r.portada).length}`);

    const portadasUsadas = new Set(resultados.filter(r => r.portada).map(r => r.portada));
    const portadasSobrantes = portadas.filter(p => extraerBase(p) !== 'portada' && !portadasUsadas.has(p));
    if (portadasSobrantes.length > 0) {
      console.log(`\n🖼️  Portadas sin PDF correspondiente (${portadasSobrantes.length}):`);
      portadasSobrantes.forEach(p => console.log(`   - ${p}`));
    }

    // 1. Generar archivo JSON local de respaldo con metadatos de los libros
    const localBooksMetadata = resultados.map((item, index) => {
      const baseOriginal = extraerBaseOriginal(item.pdf);
      const urlPortada = item.portada
        ? `/Libros/Portada libros/${encodeURIComponent(item.portada)}`
        : null;
      return {
        id: `auto-book-${index + 1}`,
        titulo: baseOriginal,
        autor: 'Autor local',
        categoria: 'Historia Local',
        formato: 'Libros',
        url: `/Libros/${encodeURIComponent(item.pdf)}`,
        imagen: urlPortada || '/images/plaza-comunitaria-tacarigua.webp',
        extra: 'Libro PDF'
      };
    });

    const outputPath = join(process.cwd(), 'src', 'data', 'librosAuto.json');
    await writeFile(outputPath, JSON.stringify(localBooksMetadata, null, 2), 'utf-8');
    console.log(`\n💾 Generado archivo de metadatos local: src/data/librosAuto.json (${localBooksMetadata.length} libros)`);

    // 2. Ejecutar la migración a PostgreSQL
    try {
      console.log('\n📝 Iniciando migración a base de datos...\n');

      let table = 'biblioteca_documentos';
      try {
        await pool.query('SELECT 1 FROM biblioteca_documentos LIMIT 1');
      } catch (e) {
        table = 'biblioteca';
      }
      console.log(`📌 Usando la tabla: "${table}"`);

      // Comprobar y asegurar columnas en tabla local
      try {
        const colCheck = await pool.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_schema = 'public' AND table_name = $1
        `, [table]);
        const columns = colCheck.rows.map(r => r.column_name);

        if (table === 'biblioteca') {
          if (!columns.includes('url_archivo')) {
            console.log(`🔧 Agregando columna "url_archivo" a la tabla "biblioteca"...`);
            await pool.query('ALTER TABLE biblioteca ADD COLUMN url_archivo VARCHAR(255)');
          }
          if (!columns.includes('imagen_portada')) {
            console.log(`🔧 Agregando columna "imagen_portada" a la tabla "biblioteca"...`);
            await pool.query('ALTER TABLE biblioteca ADD COLUMN imagen_portada VARCHAR(255)');
          }
        }
      } catch (err) {
        console.warn('⚠️ Advertencia al comprobar/modificar el esquema:', err.message);
      }

      const checkExistente = await pool.query(
        `SELECT COUNT(*) as total FROM ${table} WHERE formato = $1`,
        ['Libros']
      );
      console.log(`📊 Libros existentes en DB: ${checkExistente.rows[0].total}`);

      let insertados = 0;
      let omitidos = 0;
      let errores = 0;

      for (const { pdf, portada } of resultados) {
        const baseOriginal = extraerBaseOriginal(pdf);
        
        const existe = await pool.query(
          `SELECT id FROM ${table} WHERE titulo = $1 AND formato = $2`,
          [baseOriginal, 'Libros']
        );

        if (existe.rows.length > 0) {
          omitidos++;
          continue;
        }

        try {
          const urlPortada = portada
            ? `/api/portadas/${encodeURIComponent(portada)}`
            : null;

          const query = `
            INSERT INTO ${table} (titulo, autor, categoria, formato, url_archivo, imagen_portada)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
          `;
          const values = [
            baseOriginal,
            'Autor local',
            'Historia Local',
            'Libros',
            `/api/libros/${encodeURIComponent(pdf)}`,
            urlPortada
          ];

          const result = await pool.query(query, values);
          insertados++;
          console.log(`✅ [${result.rows[0].id}] ${baseOriginal}`);
        } catch (error) {
          errores++;
          console.error(`❌ Error al insertar "${baseOriginal}":`, error.message);
        }
      }

      const countFinal = await pool.query(
        `SELECT COUNT(*) as total FROM ${table} WHERE formato = $1`,
        ['Libros']
      );

      console.log('\n' + '='.repeat(60));
      console.log('📋 RESUMEN DE MIGRACIÓN');
      console.log('='.repeat(60));
      console.log(`   ✅ Insertados:    ${insertados}`);
      console.log(`   ⏭️  Omitidos (ya existían): ${omitidos}`);
      console.log(`   ❌ Errores:       ${errores}`);
      console.log(`   📚 Total en DB:   ${countFinal.rows[0].total}`);
      console.log('='.repeat(60));

    } catch (dbError) {
      console.error('\n⚠️ No se pudo completar la migración de base de datos:', dbError.message);
      console.log('💡 Los metadatos de los libros se guardaron localmente en src/data/librosAuto.json para el fallback.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error general en proceso de migración:', error);
    process.exit(1);
  }
}

migrar();
