/**
 * Catálogo central de imágenes locales — Una Sola Tacarigua.
 * Rutas relativas a /public/images (servidas como /images/...).
 * Preferir variantes WebP; fallback JPG cuando aún no exista la conversión.
 */

const base = '/images';

/** @param {string} webp @param {string} fallback */
function img(webp, fallback) {
  return { webp: `${base}/${webp}`, fallback: `${base}/${fallback}`, src: `${base}/${webp}` };
}

export const IMAGES = {
  /* ── Identidad y hero ── */
  iglesiaPlazaAerea: {
    ...img('iglesia-plaza-tacarigua-aerea.webp', 'pueblo-panoramica.jpg'),
    alt: 'Vista aérea de la iglesia y la plaza hexagonal de Tacarigua, con la serranía al fondo',
  },
  plazaHexagonal: {
    ...img('plaza-hexagonal-tacarigua.webp', 'iglesia-tacarigua.jpg'),
    alt: 'Plaza de Tacarigua con pavimento hexagonal multicolor y la iglesia San Jerónimo',
  },
  valleSateliteNasa: {
    ...img('valle-tacarigua-vista-satelite-nasa.webp', 'La_Isla_de_Margarita_y_el_valle_de_Tacarigua_vistos_desde_el_espacio_-_FOTO_NASA1.jpg'),
    alt: 'Vista satelital del valle de Tacarigua en la Isla de Margarita — imagen NASA',
  },
  vallePanoramica: {
    ...img('valle-tacarigua-panoramica-serrania.webp', 'IMG_20180408_112127.jpg'),
    alt: 'Panorámica del valle de Tacarigua rodeado de serranía verde bajo cielo azul',
  },
  paisajeHero: {
    ...img('paisaje-hero-tacarigua.webp', 'hero-bg.jpg'),
    alt: 'Paisaje del valle tacarigüero con montañas y vegetación',
  },
  mapaTacarigua: {
    ...img('Mapa Tacarigua.png', 'Mapa Tacarigua.png'),
    alt: 'Mapa de Tacarigua que muestra la ubicación del valle y la Parroquia Guevara en Margarita',
  },
  culturaInicio: {
    ...img('culturainicio.jpg', 'culturainicio.jpg'),
    alt: 'Imagen de inicio que representa la cultura de Una Sola Tacarigua',
  },
  mapaInicio: {
    ...img('mapainicio.jpg', 'mapainicio.jpg'),
    alt: 'Imagen de inicio para la sección de geografía de Una Sola Tacarigua',
  },
  historiaT: {
    ...img('historiat.jpg', 'historiat.jpg'),
    alt: 'Imagen de inicio para la sección de historia de Una Sola Tacarigua',
  },
  p6100004: {
    ...img('iglesiasansebastian.webp', 'iglesiasansebastian.jpg'),
    alt: 'Iglesia de San Sebastián en Tacarigua, patrimonio religioso del pueblo',
  },

  /* ── Sociedad: Educación ── */
  educacionHero: {
    ...img('iglesia-san-jeronimo-aerea.webp', 'SaveClip.App_475906724_18350852341179168_4160617441825350742_n.jpg'),
    alt: 'Vista aérea del centro de Tacarigua con la iglesia y el entorno educativo comunitario',
  },

  /* ── Sociedad: Sanidad ── */
  centroSaludCpt3: {
    ...img('centro-salud-cpt3-tacarigua.webp', 'SaveClip.App_649857402_17940416358159625_3299975488844600819_n.jpg'),
    alt: 'Fachada del Consultorio Popular Tipo III (CPT III) en Tacarigua, Nueva Esparta',
  },

  /* ── Sociedad: Deportes ── */
  carreteraAraguaneyes: {
    ...img('carretera-araguaneyes-tacarigua.webp', '36ad661eaf454a1e899ec4bf199e1842-23.jpg'),
    alt: 'Carretera de Tacarigua flanqueada por árboles de araguaney en floración amarilla',
  },

  /* ── Geografía ── */
  valleOlleros: {
    ...img('plaza-comunitaria-tacarigua.webp', 'SaveClip.App_660490120_18062828078682253_4774751316988805799_n.jpg'),
    alt: 'Espacio comunitario de Tacarigua en el Valle de los Olleros, tradición alfarera de la parroquia',
  },
  bandaNorte: {
    ...img('valle-tacarigua-vista-satelite-nasa.webp', 'La_Isla_de_Margarita_y_el_valle_de_Tacarigua_vistos_desde_el_espacio_-_FOTO_NASA1.jpg'),
    alt: 'Ubicación de Tacarigua en la Banda del Norte de Margarita — vista satelital',
  },
  portachuelo: {
    ...img('portachuelo-vista-satelite.webp', 'phoca_thumb_l_satelite10-400x284.jpg'),
    alt: 'Vista satelital de la zona del Portachuelo del Norte en Tacarigua',
  },
  serrania: {
    ...img('valle-tacarigua-panoramica-serrania.webp', 'IMG_20180408_112127.jpg'),
    alt: 'Serranía tacarigüera y valle verde desde las estribaciones del cerro',
  },
  agricultura: {
    ...img('carretera-araguaneyes-tacarigua.webp', '36ad661eaf454a1e899ec4bf199e1842-23.jpg'),
    alt: 'Entorno rural y agrícola de Tacarigua con vegetación local',
  },

/* ── Historia y Nosotros ── */
  muralUrbaneja: {
    ...img('mural-diego-urbaneja-tacarigua.webp', 'SaveClip.App_703316412_18057111989721582_7187174371693960315_n.jpg'),
    alt: 'Mural conmemorativo al Dr. Diego Bautista Urbaneja Alayón en Tacarigua (1817–1892)',
  },
  calleColonial: {
    ...img('calle-colonial-tacarigua.webp', 'SaveClip.App_662875133_18062828102682253_8167536444018973170_n.jpg'),
    alt: 'Calle con arquitectura colonial colorida en el casco de Tacarigua',
  },
  culturaComunitaria: {
    ...img('plaza-comunitaria-tacarigua.webp', 'SaveClip.App_660490120_18062828078682253_4774751316988805799_n.jpg'),
    alt: 'Plaza y espacios comunitarios de Tacarigua con arquitectura tradicional',
  },
  musicaFolklor: {
    ...img('calle-colonial-tacarigua.webp', 'SaveClip.App_662875133_18062828102682253_8167536444018973170_n.jpg'),
    alt: 'Ambiente del casco urbano de Tacarigua, cuna de cultores y tradiciones',
  },
  documentoLegalFundacion: {
    src: `${base}/documentolegalfundación.png`,
    alt: 'Documento legal de fundación de Tacarigua - documentoolegalfundación.png',
  },
  docLegalFun: {
    src: `${base}/doclegalfun.png`,
    alt: 'Documento legal - doclegalfun.png',
  },
};

/** Imagen responsive con fallback automático si WebP no carga */
export function getImageSrc(key) {
  return IMAGES[key]?.src ?? IMAGES[key]?.fallback ?? '';
}

export function getImageAlt(key) {
  return IMAGES[key]?.alt ?? '';
}

/** Props listas para <img> */
export function imageProps(key) {
  const item = IMAGES[key];
  if (!item) return { src: '', alt: '' };
  return { src: item.src, alt: item.alt, 'data-fallback': item.fallback };
}
