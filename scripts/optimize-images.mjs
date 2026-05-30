/**
 * Convierte imágenes locales a WebP con nombres descriptivos.
 * Ejecutar: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdir, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const ASSETS = [
  {
    src: 'pueblo-panoramica.jpg',
    dest: 'iglesia-plaza-tacarigua-aerea.webp',
    width: 1600,
    quality: 82,
  },
  {
    src: 'iglesia-tacarigua.jpg',
    dest: 'plaza-hexagonal-tacarigua.webp',
    width: 1600,
    quality: 82,
  },
  {
    src: 'La_Isla_de_Margarita_y_el_valle_de_Tacarigua_vistos_desde_el_espacio_-_FOTO_NASA.jpg',
    dest: 'valle-tacarigua-vista-satelite-nasa.webp',
    width: 1400,
    quality: 80,
  },
  {
    src: 'IMG_20180408_112127.jpg',
    dest: 'valle-tacarigua-panoramica-serrania.webp',
    width: 1600,
    quality: 82,
  },
  {
    src: 'SaveClip.App_649857402_17940416358159625_3299975488844600819_n.jpg',
    dest: 'centro-salud-cpt3-tacarigua.webp',
    width: 1400,
    quality: 82,
  },
  {
    src: 'SaveClip.App_657382685_18112887895661065_8105978155612511792_n.jpg',
    dest: 'consultorio-popular-tacarigua.webp',
    width: 1400,
    quality: 82,
  },
  {
    src: '36ad661eaf454a1e899ec4bf199e1842-23.jpg',
    dest: 'carretera-araguaneyes-tacarigua.webp',
    width: 1400,
    quality: 82,
  },
  {
    src: 'SaveClip.App_703316412_18057111989721582_7187174371693960315_n.jpg',
    dest: 'mural-diego-urbaneja-tacarigua.webp',
    width: 1400,
    quality: 82,
  },
  {
    src: 'SaveClip.App_662875133_18062828102682253_8167536444018973170_n.jpg',
    dest: 'calle-colonial-tacarigua.webp',
    width: 1400,
    quality: 82,
  },
  {
    src: 'SaveClip.App_660490120_18062828078682253_4774751316988805799_n.jpg',
    dest: 'plaza-comunitaria-tacarigua.webp',
    width: 1400,
    quality: 82,
  },
  {
    src: 'SaveClip.App_657382685_18112887895661065_8105978155612511792_n.jpg',
    dest: 'hero-bg.webp',
    destAlt: 'hero-bg.webp',
    width: 1920,
    quality: 80,
  },
  {
    src: 'hero-bg.jpg',
    dest: 'paisaje-hero-tacarigua.webp',
    width: 1920,
    quality: 80,
  },
  {
    src: 'phoca_thumb_l_satelite10-400x284.jpg',
    dest: 'portachuelo-vista-satelite.webp',
    width: 800,
    quality: 78,
  },
  {
    src: 'SaveClip.App_475906724_18350852341179168_4160617441825350742_n.jpg',
    dest: 'iglesia-san-jeronimo-aerea.webp',
    width: 1400,
    quality: 82,
  },
];

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertAsset({ src, dest, width, quality }) {
  const input = path.join(imagesDir, src);
  const output = path.join(imagesDir, dest);

  if (!(await fileExists(input))) {
    console.warn(`⚠ Omitido (no existe): ${src}`);
    return;
  }

  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(output);

  console.log(`✓ ${dest}`);
}

await mkdir(imagesDir, { recursive: true });

for (const asset of ASSETS) {
  await convertAsset(asset);
}

console.log('\nOptimización completada.');
