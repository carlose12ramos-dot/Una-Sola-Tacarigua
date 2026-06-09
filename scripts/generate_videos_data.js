import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const VIDEOS_DIR = path.join(ROOT_DIR, 'public', 'images', 'videos');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'data', 'videosAuto.json');

const videosArray = [];
let idCounter = 3000;

const videoTitleMap = {
  "Calles de San Sebastian.mp4": "Amanecer del Nuevo Año: Recorrido por Tacarigua",
  "Bicentenario de Fe.mp4": "Bicentenario de Fe: 200 Años de Devoción a San Sebastián",
  "Historia Tacarigua.mp4": "Raíces de Nuestra Tierra: Historia de Tacarigua",
  "San Sebastián.mp4": "Patrono y Protector: El Legado de San Sebastián",
  "Tacarigua Gentil.mp4": "Tacarigua Gentil: Un Vistazo a Nuestro Pueblo",
  "Tacarigua.mp4": "Esencia Margariteña: La Magia de Tacarigua",
  "Caminos de 400 Anos.mp4": "Caminos de 400 Años: Un Viaje a Tacarigua",
  "ssstik.io_1781023978114.mp4": "Memorias de Tacarigua: Fragmento I",
  "ssstik.io_1781024371778.mp4": "Memorias de Tacarigua: Fragmento II",
  "videoss.mp4": "Retratos de Nuestra Gente"
};

function formatTitle(str) {
  // Use mapping if available
  if (videoTitleMap[str]) {
    return videoTitleMap[str];
  }
  // Remove extension, remove weird chars, replace underscores/dashes with space
  let title = str.replace(/\.(mp4|avi|mov|mkv)$/i, '');
  title = title.replace(/_/g, ' ');
  return title.trim();
}

if (fs.existsSync(VIDEOS_DIR)) {
  const items = fs.readdirSync(VIDEOS_DIR);
  
  items.forEach(item => {
    const fullPath = path.join(VIDEOS_DIR, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && item.toLowerCase().match(/\.(mp4|avi|mov|mkv)$/)) {
      const relativePath = path.relative(path.join(ROOT_DIR, 'public'), fullPath).replace(/\\/g, '/');
      const title = formatTitle(item);
      
      videosArray.push({
        id: `video_${idCounter++}`,
        titulo: title,
        autor: 'Comunidad de Tacarigua',
        categoria: 'Documental',
        formato: 'Videos',
        url: `/${relativePath}`,
        imagen: null, // No poster for now
        extra: 'Archivo MP4'
      });
    }
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(videosArray, null, 2), 'utf-8');
  console.log(`Generated ${videosArray.length} video records in ${OUTPUT_FILE}`);
} else {
  console.error("No se encontró el directorio de videos:", VIDEOS_DIR);
}
