/**
 * geoData.js — Hitos reales de Tacarigua, Parroquia Guevara
 * Coordenadas extraídas exactamente del archivo KML "Capa sin nombre.kml"
 * Clasificados por categoría para el mapa interactivo con Leaflet.js
 */

export const tacariguaPlaces = [

  // ──────────────── RELIGIOSO ────────────────
  {
    name: 'Iglesia Corazón de Jesús',
    geometry: { location: { lat: 11.0518470, lng: -63.9008640 } }, // Centro exacto del edificio en el mapa OSM
    category: 'Religioso',
    vicinity: 'Casco central, Sector Corazón de Jesús',
    editorial_summary: 'Templo principal e histórico de Tacarigua, epicentro de las celebraciones patronales de la comunidad desde el siglo XIX.',
  },
  {
    name: 'Iglesia de San Sebastián Mártir',
    geometry: { location: { lat: 11.0462956, lng: -63.9078221 } },
    category: 'Religioso',
    vicinity: 'Sector San Sebastián',
    editorial_summary: 'Templo dedicado al mártir San Sebastián, patrono del sector sur del valle de Tacarigua.',
  },
  {
    name: 'Capilla Dulce Corazón de María',
    geometry: { location: { lat: 11.049579, lng: -63.890239 } },
    category: 'Religioso',
    vicinity: 'Sector Tacarigüita / El Manantial',
    editorial_summary: 'Pequeña capilla de devoción mariana ubicada en el sector oriental de la parroquia, corazón espiritual de la comunidad de Tacarigüita.',
  },
  {
    name: 'Campo Santo Sagrado Corazón de Jesús',
    geometry: { location: { lat: 11.0545, lng: -63.9071389 } },
    category: 'Religioso',
    vicinity: 'Sector Corazón de Jesús',
    editorial_summary: 'Cementerio histórico de la comunidad central de Tacarigua, testimonio vivo de generaciones de familias tacarigüeras.',
  },
  {
    name: 'Campo Santo de San Sebastián',
    geometry: { location: { lat: 11.043277, lng: -63.910345 } },
    category: 'Religioso',
    vicinity: 'Sector San Sebastián',
    editorial_summary: 'Cementerio del sector sur, ligado a la historia y tradición religiosa del barrio de San Sebastián.',
  },

  // ──────────────── EDUCATIVO ────────────────
  {
    name: 'UEE Cruz Millán García',
    geometry: { location: { lat: 11.0479291, lng: -63.9062991 } },
    category: 'Educativo',
    vicinity: 'Sector San Sebastián / Los Andes',
    editorial_summary: 'Unidad Educativa Especial que forma parte del tejido educativo de la parroquia Guevara.',
  },
  {
    name: 'U.E.N.B Napoleón Narváez',
    geometry: { location: { lat: 11.0523385, lng: -63.9052847 } },
    category: 'Educativo',
    vicinity: 'Casco central de Tacarigua',
    editorial_summary: 'Escuela bolivariana que lleva el nombre de uno de los próceres de la parroquia, formando a generaciones de tacarigüeros.',
  },
  {
    name: 'Colegio Divina Pastora',
    geometry: { location: { lat: 11.0540321, lng: -63.905962 } },
    category: 'Educativo',
    vicinity: 'Sector Los Andes / Centro',
    editorial_summary: 'Institución educativa de tradición religiosa que ha servido a la comunidad de Tacarigua por décadas.',
  },
  {
    name: 'Unidad Educativa Roraima como el Tepuy',
    geometry: { location: { lat: 11.0498007, lng: -63.8913234 } },
    category: 'Educativo',
    vicinity: 'Sector El Manantial / Tacarigüita Este',
    editorial_summary: 'Escuela que lleva por nombre una metáfora de la fortaleza y la altura, ubicada en la zona oriental de la parroquia.',
  },
  {
    name: 'Primera Escuela Oficial de Tacarigua (fundada en 1875)',
    geometry: { location: { lat: 11.053336, lng: -63.904668 } },
    category: 'Educativo',
    vicinity: 'Casco central',
    editorial_summary: 'Hito histórico de la educación local. La primera escuela oficial de Tacarigua fue fundada en 1875, pionera de la formación académica en el municipio Gómez.',
  },

  // ──────────────── CULTURAL ────────────────
  {
    name: 'Casa de la Cultura Poeta Pedro Rivero Navarro',
    geometry: { location: { lat: 11.0524931, lng: -63.9025346 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Espacio dedicado a la preservación del folklore, las letras y la historia de Tacarigua. Lleva el nombre del poeta local Pedro Rivero Navarro.',
  },
  {
    name: 'Biblioteca Pública José Joaquín Salazar Franco "Cheguaco"',
    geometry: { location: { lat: 11.0523099, lng: -63.9025318 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Biblioteca pública que honra la memoria de "Cheguaco", cronista e historiador insigne de Tacarigua y de toda la Isla de Margarita.',
  },
  {
    name: 'Movimiento Cultural Tacarigua Adentro (MOCULTA)',
    geometry: { location: { lat: 11.0455618, lng: -63.9074583 } },
    category: 'Cultural',
    vicinity: 'Sector San Sebastián',
    editorial_summary: 'Organización cultural comunitaria que promueve el arte, las tradiciones y la identidad del pueblo desde el sector Tacarigua Adentro.',
  },
  {
    name: 'Escenario Artístico Hernán Malaver',
    geometry: { location: { lat: 11.0460824, lng: -63.9075989 } },
    category: 'Cultural',
    vicinity: 'Sector San Sebastián',
    editorial_summary: 'Espacio al aire libre dedicado a presentaciones artísticas y culturales de la comunidad, homenaje al artista local Hernán Malaver.',
  },
  {
    name: 'Concha Acústica "Eligio González"',
    geometry: { location: { lat: 11.0516505, lng: -63.9018004 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Concha acústica dedicada al músico y compositor Eligio González, escenario de fiestas patronales, festivales y eventos culturales del pueblo.',
  },
  {
    name: 'Casa de Yenko',
    geometry: { location: { lat: 11.0516907, lng: -63.9018136 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Espacio cultural emblemático de la memoria popular tacarigüera, referencia de encuentro y tradición comunitaria.',
  },
  {
    name: 'Casa Natal de Diego Bautista Alayón',
    geometry: { location: { lat: 11.050602, lng: -63.902635 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Casa natal de Diego Bautista Alayón, figura histórica de Tacarigua y del estado Nueva Esparta.',
  },
  {
    name: 'Prefectura de la Parroquia Guevara',
    geometry: { location: { lat: 11.0533421, lng: -63.9048656 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Sede de la Prefectura Civil de la Parroquia Guevara, institución administrativa histórica del municipio Gómez.',
  },
  {
    name: 'La Alcantarilla',
    geometry: { location: { lat: 11.0523145, lng: -63.9012121 } },
    category: 'Cultural',
    vicinity: 'Casco central, Ruta 1',
    editorial_summary: 'Paso y punto de referencia histórico sobre la Ruta 1 en el casco de Tacarigua, hito geográfico y cultural del pueblo.',
  },
  {
    name: 'Campo de Béisbol y Atletismo',
    geometry: { location: { lat: 11.0470201, lng: -63.9056993 } },
    category: 'Cultural',
    vicinity: 'Sector San Sebastián / Los Andes',
    editorial_summary: 'Instalación deportiva donde se forjaron atletas tacarigüeros, entre ellos los campeones de atletismo que dieron gloria a Margarita.',
  },
  {
    name: 'Plaza Corazón de Jesús',
    geometry: { location: { lat: 11.0519000, lng: -63.9009000 } }, // Junto a la cruz de la iglesia
    category: 'Cultural',
    vicinity: 'Casco central, junto a la Iglesia Corazón de Jesús',
    editorial_summary: 'Plaza cívica y cultural del centro de Tacarigua, espacio histórico de reunión y celebración para las festividades patronales del pueblo.',
  },
  {
    name: 'Plaza de San Sebastián',
    geometry: { location: { lat: 11.0461500, lng: -63.9078000 } },
    category: 'Cultural',
    vicinity: 'Sector San Sebastián, junto a la Iglesia',
    editorial_summary: 'Plaza principal del sector sur de Tacarigua, centro de encuentro comunitario y escenario de las tradiciones en honor al mártir San Sebastián.',
  },

  // ──────────────── GASTRONÓMICO ────────────────
  // ──────────────── GASTRONÓMICO Y CULTURAL (Reclasificados) ────────────────
  {
    name: 'Típica El Molino',
    geometry: { location: { lat: 11.0527946, lng: -63.9033478 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Taller y venta de artesanías tradicionales. Destaca por la tejeduría artesanal, hamaquismo y productos autóctonos que preservan el patrimonio cultural de Tacarigua.',
  },
  {
    name: 'El Trapiche',
    geometry: { location: { lat: 11.0526475, lng: -63.9010371 } },
    category: 'Cultural',
    vicinity: 'Casco central, Ruta 1',
    editorial_summary: 'Centro de producción y venta de artesanías y estería local. Toma su nombre del antiguo trapiche de caña y es un pilar de la tradición creadora del pueblo.',
  },
  {
    name: 'El Burrito',
    geometry: { location: { lat: 11.0515524, lng: -63.9014217 } },
    category: 'Cultural',
    vicinity: 'Casco central',
    editorial_summary: 'Reconocido espacio artesanal enfocado en el trenzado, sombrerería y tejeduría típica margariteña, manteniendo viva la herencia ancestral de Tacarigua.',
  },
  {
    name: 'LA BUENA CACHAPA',
    geometry: { location: { lat: 11.0515135, lng: -63.8996989 } },
    category: 'Gastronómico',
    vicinity: 'Ruta 1, entre Casco Central y El Manantial',
    editorial_summary: 'Local emblemático que sirve las afamadas cachapas de maíz tierno de Tacarigua, uno de los sabores más representativos del pueblo.',
  },
  {
    name: 'Típica Carmencita',
    geometry: { location: { lat: 11.0506806, lng: -63.8981308 } },
    category: 'Cultural',
    vicinity: 'Sector El Manantial / Tacarigüita',
    editorial_summary: 'Referencia en la venta de artesanías y creaciones típicas elaboradas a mano. Un rincón donde se exhibe el talento y la tejeduría propia del hogar tacarigüero.',
  },
  {
    name: 'Cachapera Mi Viejo Fogón',
    geometry: { location: { lat: 11.0517208, lng: -63.9002421 } }, // Ubicada exactamente al lado derecho de la Panadería Bella Vista
    category: 'Gastronómico',
    vicinity: 'Sector El Manantial',
    editorial_summary: 'Tradicional puesto de cachapas al fogón de leña, orgullo gastronómico del sector El Manantial.',
  },
  {
    name: 'Cachapas de Pedro',
    geometry: { location: { lat: 11.0491673, lng: -63.8945161 } },
    category: 'Gastronómico',
    vicinity: 'Sector Tacarigüita Este',
    editorial_summary: 'Punto gastronómico popular entre locales y visitantes para disfrutar de las auténticas cachapas del valle.',
  },
  {
    name: 'Cachapera De Peter',
    geometry: { location: { lat: 11.0470537, lng: -63.8922846 } },
    category: 'Gastronómico',
    vicinity: 'Vía Portachuelo, sector oriental',
    editorial_summary: 'Establecimiento gastronómico en la vía al Portachuelo, especializado en cachapas y comida criolla para locales y turistas.',
  },
  {
    name: 'Jardín Café',
    geometry: { location: { lat: 11.0523461, lng: -63.8976612 } },
    category: 'Gastronómico',
    vicinity: 'Ruta 1, Sector El Manantial',
    editorial_summary: 'Café y restaurante rodeado de vegetación exuberante, punto de descanso y gastronomía local para quienes transitan la Ruta 1.',
  },

  // ──────────────── NATURAL ────────────────
  {
    name: 'Mirador El Portachuelo',
    geometry: { location: { lat: 11.0493924, lng: -63.8872891 } },
    category: 'Natural',
    vicinity: 'Paso de montaña al este, vía La Asunción',
    editorial_summary: 'Famoso mirador y paso histórico de montaña que conecta la Banda del Norte con el sur de la isla. Desde aquí se aprecian vistas panorámicas del valle de Tacarigua y el mar Caribe.',
  },
  {
    name: 'La Poza de Cayito',
    geometry: { location: { lat: 11.0548985, lng: -63.8983126 } },
    category: 'Natural',
    vicinity: 'Fuente de agua, norte del valle',
    editorial_summary: 'Poza de agua natural y espacio de recreación comunitaria, uno de los manantiales históricos que abastecen al pueblo de Tacarigua.',
  },
  {
    name: 'Productos La Grea C.A.',
    geometry: { location: { lat: 11.0545188, lng: -63.8991609 } },
    category: 'Gastronómico',
    vicinity: 'Norte del casco',
    editorial_summary: 'Sitio campestre y restaurante familiar atendido por la familia Rivera Núñez. Funciona como un centro turístico que combina la gastronomía tradicional margariteña, la producción artesanal y el contacto directo con la naturaleza.',
  },
  {
    name: 'Hacienda Campestre Nido de Águilas',
    geometry: { location: { lat: 11.057658, lng: -63.893917 } },
    category: 'Natural',
    vicinity: 'Sector norte, vías hacia la montaña',
    editorial_summary: 'Hacienda y posada campestre enmarcada por la serranía, punto de partida para rutas de senderismo y naturaleza en los cerros de Tacarigua.',
  },
  {
    name: 'La Palma Real',
    geometry: { location: { lat: 11.0219444, lng: -63.8994444 } },
    category: 'Natural',
    vicinity: 'Sector sur, vía al Portachuelo Sur',
    editorial_summary: 'Área natural con predominio de palmas reales, emblema del paisaje tacarigüero y símbolo de la vegetación tropical del sur del valle.',
  },
  {
    name: 'La Huerta de Elicio',
    geometry: { location: { lat: 11.035944, lng: -63.911029 } },
    category: 'Natural',
    vicinity: 'Extremo suroeste, límite de la parroquia',
    editorial_summary: 'Huerta agroecológica que marca el límite suroeste de la frontera de Tacarigua, espacio de cultivo tradicional y biodiversidad local.',
  },

  // ──────────────── SALUD ────────────────
  {
    name: 'Consultorio Popular CPT',
    geometry: { location: { lat: 11.0535715, lng: -63.9046648 } },
    category: 'Salud',
    vicinity: 'Casco central',
    editorial_summary: 'Centro de atención médica comunitaria de la Parroquia Guevara, pilar del sistema de salud pública de Tacarigua.',
  },
];
