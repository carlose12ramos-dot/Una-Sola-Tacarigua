import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const MUSIC_DIR = path.join(ROOT_DIR, 'public', 'Musica Tacariguera');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'data', 'musicaAuto.json');

const musicaArray = [];
let idCounter = 1000;

function formatTitle(str) {
  return str.replace(/\.mp3$/i, '').replace(/^\d+\s*-?\s*/, '').trim();
}

function scanDir(currentPath, folderName) {
  if (!fs.existsSync(currentPath)) {
    console.error(`Directory not found: ${currentPath}`);
    return;
  }
  const items = fs.readdirSync(currentPath);
  
  const canciones = [];
  
  items.forEach(item => {
    const fullPath = path.join(currentPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDir(fullPath, item);
    } else if (stat.isFile() && item.toLowerCase().endsWith('.mp3')) {
      const relativePath = path.relative(path.join(ROOT_DIR, 'public'), fullPath).replace(/\\/g, '/');
      const title = formatTitle(item);
      canciones.push({
        titulo: title,
        url: `/${relativePath}`
      });
    }
  });

  if (canciones.length > 0) {
    const zipName = folderName.replace(/[^a-zA-Z0-9_-]/g, '_') + '.zip';

    musicaArray.push({
      id: `album_${idCounter++}`,
      titulo: folderName || 'Varios Artistas',
      autor: folderName || 'Varios Artistas',
      categoria: 'Álbum Musical',
      formato: 'Música',
      canciones: canciones,
      imagen: null,
      extra: `${canciones.length} pista(s)`,
      downloadUrl: `/descargas/musica/${zipName}`
    });
  }
}

// Start scanning from the music directory
if (fs.existsSync(MUSIC_DIR)) {
  const rootItems = fs.readdirSync(MUSIC_DIR);
  rootItems.forEach(item => {
    const fullPath = path.join(MUSIC_DIR, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, item);
    }
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(musicaArray, null, 2), 'utf-8');
  console.log(`Generated ${musicaArray.length} albums records in ${OUTPUT_FILE}`);
} else {
  console.error("No se encontró el directorio de música");
}
