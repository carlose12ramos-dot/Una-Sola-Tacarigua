import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();

let total = 0;

try {
  await client.query('BEGIN');

  // =============================================
  // 1. HOME_HERO_SLIDES (5 slides from HeroBanner.jsx)
  // =============================================
  console.log('📋 Migrando home_hero_slides...');
  await client.query('TRUNCATE TABLE home_hero_slides RESTART IDENTITY CASCADE');
  const slides = [
    { image_key: 'plazaHexagonal', title: '¡Bienvenidos a la Parroquia Guevara!', subtitle: 'La Tacarigua de Margarita: memoria histórica, cultura y tradición en el corazón de Nueva Esparta' },
    { image_key: 'mapaTacarigua', title: 'Mapa de Tacarigua', subtitle: 'Descubre el valle, los cerros y el paso del Portachuelo que unen a toda la comunidad.' },
    { image_key: 'p6100004', title: 'Corazones unidos en una misma fe', subtitle: 'Nuestras Iglesias y capillas, testigos de devoción, fe y tradición.' },
    { image_key: 'paisajeHero', title: 'Memoria Histórica Viva', subtitle: '438 años de cultura, desde los indios Tacaribas hasta la comunidad de hoy' },
    { image_key: 'iglesiaPlazaAerea', title: 'Patrimonio Cultural', subtitle: 'Fiestas patronales, música folklórica, costumbres, tradiciones y gastronomía que enriquecen nuestra identidad' },
  ];
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    await client.query(
      'INSERT INTO home_hero_slides (image_key, title, subtitle, activo, orden) VALUES ($1,$2,$3,true,$4)',
      [s.image_key, s.title, s.subtitle, i + 1]
    );
  }
  console.log(`  ✓ ${slides.length} slides`);
  total += slides.length;

  // =============================================
  // 2. GEOGRAFIA_SECTORES (5 from geografiaData.js)
  // =============================================
  console.log('📋 Migrando geografia_sectores...');
  await client.query('TRUNCATE TABLE geografia_sectores RESTART IDENTITY CASCADE');
  const sectores = [
    { icono: '📍', title: 'Ubicación', content: 'Tacarigua se encuentra en la parte centro-norte de la isla de Margarita, en un semivalle de clima benigno a unos 81 metros sobre el nivel del mar, entre la capital del estado La Asunción al este y Santa Ana del Norte al oeste. Dista aproximadamente 7,7 km de Juan Griego y 12,3 km de Porlamar.' },
    { icono: '⛰️', title: 'Relieve', content: 'El poblado está rodeado de un sistema de cerros que lo delimitan y abastecen de agua. Los más destacados son El Tamoco, La Palma Real, El Mureche, Cerro Pelón y El Portachuelo — conocido históricamente como El Portezuelo de la Banda del Norte —, este último el paso natural estratégico que comunica esa Banda del Norte con el resto de la isla y que fue escenario de múltiples combates entre 1813 y 1902.' },
    { icono: '💧', title: 'Hidrología', content: 'Tacarigua constituye una de las zonas de mayor riqueza hídrica de la isla. Un estudio de la Universidad Central de Venezuela de 1971 la describió como "la zona hídrica más importante del Oriente del País". Sus cerros alimentan varias quebradas y pozas de agua cristalina que desde tiempos prehispánicos atrajeron asentamientos humanos, entre ellos el manantial de Belén y la quebrada del Orinoco.' },
    { icono: '🗺️', title: 'Organización territorial', content: 'Tacarigua se presenta como una sola comunidad territorial y cultural. Sectores como Tacarigua Afuera, Tacarigua Adentro, Tacarigüita, Corazón de Jesús, San Sebastián, Toporo y El Conchal forman un mismo valle compartido por su gente y su historia.' },
    { icono: '👥', title: 'Población y vivienda', content: 'Según el I Censo Popular de Tacarigua realizado en noviembre de 2002 —que abarcó solo el sector Tacarigua Arriba— la población era de 1.944 habitantes, de los cuales el 52,5 % eran mujeres. Entre 1950 y 1981 la población creció un 60 % y el número de viviendas un 89 %. Del total censado en 2002, el 20,4 % eran profesionales universitarios y el 13,9 % técnicos superiores o bachilleres cursando educación superior. Solo 84 personas eran analfabetas, el 97 % de ellas mayores de 60 años. El pueblo cuenta con cuatro centros de educación primaria —dos nacionales y dos privados— y un liceo de educación media general.' },
  ];
  for (let i = 0; i < sectores.length; i++) {
    const s = sectores[i];
    await client.query(
      'INSERT INTO geografia_sectores (icono, title, content, activo, orden) VALUES ($1,$2,$3,true,$4)',
      [s.icono, s.title, s.content, i + 1]
    );
  }
  console.log(`  ✓ ${sectores.length} sectores`);
  total += sectores.length;

  // =============================================
  // 3. GEOGRAFIA_CENSOS (6 from geografiaData.js)
  // =============================================
  console.log('📋 Migrando geografia_censos...');
  await client.query('TRUNCATE TABLE geografia_censos RESTART IDENTITY CASCADE');
  const censos = [
    { year: '1881', housing: '871', population: '-' },
    { year: '1950', housing: '243', population: '1.170' },
    { year: '1961', housing: '340', population: '1.192' },
    { year: '1971', housing: '362', population: '1.384' },
    { year: '1981', housing: '460', population: '1.871' },
    { year: '2002', housing: '459', population: '1.944' },
  ];
  for (const c of censos) {
    await client.query(
      'INSERT INTO geografia_censos (year, housing, population, activo, orden) VALUES ($1,$2,$3,true,0)',
      [c.year, c.housing, c.population]
    );
  }
  console.log(`  ✓ ${censos.length} censos`);
  total += censos.length;

  // =============================================
  // 4. GEOGRAFIA_HIGHLIGHTS (3 from geografiaData.js)
  // =============================================
  console.log('📋 Migrando geografia_highlights...');
  await client.query('TRUNCATE TABLE geografia_highlights RESTART IDENTITY CASCADE');
  const highlights = [
    { icono: '📍', title: 'Centro-norte de Margarita', description: 'Tacarigua está a 81 metros sobre el mar, entre La Asunción y Santa Ana del Norte.' },
    { icono: '💧', title: 'Riqueza hídrica', description: 'El área es una de las zonas hídricas más importantes del oriente venezolano.' },
    { icono: '🏘️', title: 'Un solo territorio', description: 'Tacarigua se presenta como una sola comunidad integrada por sectores como Corazón de Jesús, San Sebastián y Tacarigüita.' },
  ];
  for (let i = 0; i < highlights.length; i++) {
    const h = highlights[i];
    await client.query(
      'INSERT INTO geografia_highlights (icono, title, description, activo, orden) VALUES ($1,$2,$3,true,$4)',
      [h.icono, h.title, h.description, i + 1]
    );
  }
  console.log(`  ✓ ${highlights.length} highlights`);
  total += highlights.length;

  // =============================================
  // 5. MAPA_LUGARES (38 from geoData.js)
  // =============================================
  console.log('📋 Migrando mapa_lugares...');
  await client.query('TRUNCATE TABLE mapa_lugares RESTART IDENTITY CASCADE');
  const lugares = [
    { name: 'Iglesia Corazón de Jesús', lat: 11.0518470, lng: -63.9008640, category: 'Religioso', vicinity: 'Casco central, Sector Corazón de Jesús', editorial_summary: 'Templo principal e histórico de Tacarigua, epicentro de las celebraciones patronales de la comunidad desde el siglo XIX.' },
    { name: 'Iglesia de San Sebastián Mártir', lat: 11.0462956, lng: -63.9078221, category: 'Religioso', vicinity: 'Sector San Sebastián', editorial_summary: 'Templo dedicado al mártir San Sebastián, patrono del sector sur del valle de Tacarigua.' },
    { name: 'Capilla Dulce Corazón de María', lat: 11.049579, lng: -63.890239, category: 'Religioso', vicinity: 'Sector Tacarigüita / El Manantial', editorial_summary: 'Pequeña capilla de devoción mariana ubicada en el sector oriental de la parroquia, corazón espiritual de la comunidad de Tacarigüita.' },
    { name: 'Campo Santo Sagrado Corazón de Jesús', lat: 11.0545, lng: -63.9071389, category: 'Religioso', vicinity: 'Sector Corazón de Jesús', editorial_summary: 'Cementerio histórico de la comunidad central de Tacarigua, testimonio vivo de generaciones de familias tacarigüeras.' },
    { name: 'Campo Santo de San Sebastián', lat: 11.043277, lng: -63.910345, category: 'Religioso', vicinity: 'Sector San Sebastián', editorial_summary: 'Cementerio del sector sur, ligado a la historia y tradición religiosa del barrio de San Sebastián.' },
    { name: 'UEE Cruz Millán García', lat: 11.0479291, lng: -63.9062991, category: 'Educativo', vicinity: 'Sector San Sebastián / Los Andes', editorial_summary: 'Unidad Educativa Especial que forma parte del tejido educativo de la parroquia Guevara.' },
    { name: 'U.E.N.B Napoleón Narváez', lat: 11.0523385, lng: -63.9052847, category: 'Educativo', vicinity: 'Casco central de Tacarigua', editorial_summary: 'Escuela bolivariana que lleva el nombre de uno de los próceres de la parroquia, formando a generaciones de tacarigüeros.' },
    { name: 'Colegio Divina Pastora', lat: 11.0540321, lng: -63.905962, category: 'Educativo', vicinity: 'Sector Los Andes / Centro', editorial_summary: 'Institución educativa de tradición religiosa que ha servido a la comunidad de Tacarigua por décadas.' },
    { name: 'Unidad Educativa Roraima como el Tepuy', lat: 11.0498007, lng: -63.8913234, category: 'Educativo', vicinity: 'Sector El Manantial / Tacarigüita Este', editorial_summary: 'Escuela que lleva por nombre una metáfora de la fortaleza y la altura, ubicada en la zona oriental de la parroquia.' },
    { name: 'Primera Escuela Oficial de Tacarigua (fundada en 1875)', lat: 11.053336, lng: -63.904668, category: 'Educativo', vicinity: 'Casco central', editorial_summary: 'Hito histórico de la educación local. La primera escuela oficial de Tacarigua fue fundada en 1875, pionera de la formación académica en el municipio Gómez.' },
    { name: 'Casa de la Cultura Poeta Pedro Rivero Navarro', lat: 11.0524931, lng: -63.9025346, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Espacio dedicado a la preservación del folklore, las letras y la historia de Tacarigua. Lleva el nombre del poeta local Pedro Rivero Navarro.' },
    { name: 'Biblioteca Pública José Joaquín Salazar Franco "Cheguaco"', lat: 11.0523099, lng: -63.9025318, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Biblioteca pública que honra la memoria de "Cheguaco", cronista e historiador insigne de Tacarigua y de toda la Isla de Margarita.' },
    { name: 'Movimiento Cultural Tacarigua Adentro (MOCULTA)', lat: 11.0455618, lng: -63.9074583, category: 'Cultural', vicinity: 'Sector San Sebastián', editorial_summary: 'Organización cultural comunitaria que promueve el arte, las tradiciones y la identidad del pueblo desde el sector Tacarigua Adentro.' },
    { name: 'Escenario Artístico Hernán Malaver', lat: 11.0460824, lng: -63.9075989, category: 'Cultural', vicinity: 'Sector San Sebastián', editorial_summary: 'Espacio al aire libre dedicado a presentaciones artísticas y culturales de la comunidad, homenaje al artista local Hernán Malaver.' },
    { name: 'Concha Acústica "Eligio González"', lat: 11.0516505, lng: -63.9018004, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Concha acústica dedicada al músico y compositor Eligio González, escenario de fiestas patronales, festivales y eventos culturales del pueblo.' },
    { name: 'Casa de Yenko', lat: 11.0516907, lng: -63.9018136, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Espacio cultural emblemático de la memoria popular tacarigüera, referencia de encuentro y tradición comunitaria.' },
    { name: 'Casa Natal de Diego Bautista Alayón', lat: 11.050602, lng: -63.902635, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Casa natal de Diego Bautista Alayón, figura histórica de Tacarigua y del estado Nueva Esparta.' },
    { name: 'Prefectura de la Parroquia Guevara', lat: 11.0533421, lng: -63.9048656, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Sede de la Prefectura Civil de la Parroquia Guevara, institución administrativa histórica del municipio Gómez.' },
    { name: 'La Alcantarilla', lat: 11.0523145, lng: -63.9012121, category: 'Cultural', vicinity: 'Casco central, Ruta 1', editorial_summary: 'Paso y punto de referencia histórico sobre la Ruta 1 en el casco de Tacarigua, hito geográfico y cultural del pueblo.' },
    { name: 'Campo de Béisbol y Atletismo', lat: 11.0470201, lng: -63.9056993, category: 'Cultural', vicinity: 'Sector San Sebastián / Los Andes', editorial_summary: 'Instalación deportiva donde se forjaron atletas tacarigüeros, entre ellos los campeones de atletismo que dieron gloria a Margarita.' },
    { name: 'Plaza Corazón de Jesús', lat: 11.0519000, lng: -63.9009000, category: 'Cultural', vicinity: 'Casco central, junto a la Iglesia Corazón de Jesús', editorial_summary: 'Plaza cívica y cultural del centro de Tacarigua, espacio histórico de reunión y celebración para las festividades patronales del pueblo.' },
    { name: 'Plaza de San Sebastián', lat: 11.0461500, lng: -63.9078000, category: 'Cultural', vicinity: 'Sector San Sebastián, junto a la Iglesia', editorial_summary: 'Plaza principal del sector sur de Tacarigua, centro de encuentro comunitario y escenario de las tradiciones en honor al mártir San Sebastián.' },
    { name: 'Típica El Molino', lat: 11.0527946, lng: -63.9033478, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Taller y venta de artesanías tradicionales. Destaca por la tejeduría artesanal, hamaquismo y productos autóctonos que preservan el patrimonio cultural de Tacarigua.' },
    { name: 'El Trapiche', lat: 11.0526475, lng: -63.9010371, category: 'Cultural', vicinity: 'Casco central, Ruta 1', editorial_summary: 'Centro de producción y venta de artesanías y estería local. Toma su nombre del antiguo trapiche de caña y es un pilar de la tradición creadora del pueblo.' },
    { name: 'El Burrito', lat: 11.0515524, lng: -63.9014217, category: 'Cultural', vicinity: 'Casco central', editorial_summary: 'Reconocido espacio artesanal enfocado en el trenzado, sombrerería y tejeduría típica margariteña, manteniendo viva la herencia ancestral de Tacarigua.' },
    { name: 'Típica Carmencita', lat: 11.0506806, lng: -63.8981308, category: 'Cultural', vicinity: 'Sector El Manantial / Tacarigüita', editorial_summary: 'Referencia en la venta de artesanías y creaciones típicas elaboradas a mano. Un rincón donde se exhibe el talento y la tejeduría propia del hogar tacarigüero.' },
    { name: 'LA BUENA CACHAPA', lat: 11.0515135, lng: -63.8996989, category: 'Gastronómico', vicinity: 'Ruta 1, entre Casco Central y El Manantial', editorial_summary: 'Local emblemático que sirve las afamadas cachapas de maíz tierno de Tacarigua, uno de los sabores más representativos del pueblo.' },
    { name: 'Cachapera Mi Viejo Fogón', lat: 11.0517208, lng: -63.9002421, category: 'Gastronómico', vicinity: 'Sector El Manantial', editorial_summary: 'Tradicional puesto de cachapas al fogón de leña, orgullo gastronómico del sector El Manantial.' },
    { name: 'Cachapas de Pedro', lat: 11.0491673, lng: -63.8945161, category: 'Gastronómico', vicinity: 'Sector Tacarigüita Este', editorial_summary: 'Punto gastronómico popular entre locales y visitantes para disfrutar de las auténticas cachapas del valle.' },
    { name: 'Cachapera De Peter', lat: 11.0470537, lng: -63.8922846, category: 'Gastronómico', vicinity: 'Vía Portachuelo, sector oriental', editorial_summary: 'Establecimiento gastronómico en la vía al Portachuelo, especializado en cachapas y comida criolla para locales y turistas.' },
    { name: 'Jardín Café', lat: 11.0523461, lng: -63.8976612, category: 'Gastronómico', vicinity: 'Ruta 1, Sector El Manantial', editorial_summary: 'Café y restaurante rodeado de vegetación exuberante, punto de descanso y gastronomía local para quienes transitan la Ruta 1.' },
    { name: 'Productos La Grea C.A.', lat: 11.0545188, lng: -63.8991609, category: 'Gastronómico', vicinity: 'Norte del casco', editorial_summary: 'Sitio campestre y restaurante familiar atendido por la familia Rivera Núñez. Funciona como un centro turístico que combina la gastronomía tradicional margariteña, la producción artesanal y el contacto directo con la naturaleza.' },
    { name: 'Mirador El Portachuelo', lat: 11.0493924, lng: -63.8872891, category: 'Natural', vicinity: 'Paso de montaña al este, vía La Asunción', editorial_summary: 'Famoso mirador y paso histórico de montaña que conecta la Banda del Norte con el sur de la isla. Desde aquí se aprecian vistas panorámicas del valle de Tacarigua y el mar Caribe.' },
    { name: 'La Poza de Cayito', lat: 11.0548985, lng: -63.8983126, category: 'Natural', vicinity: 'Fuente de agua, norte del valle', editorial_summary: 'Poza de agua natural y espacio de recreación comunitaria, uno de los manantiales históricos que abastecen al pueblo de Tacarigua.' },
    { name: 'Hacienda Campestre Nido de Águilas', lat: 11.057658, lng: -63.893917, category: 'Natural', vicinity: 'Sector norte, vías hacia la montaña', editorial_summary: 'Hacienda y posada campestre enmarcada por la serranía, punto de partida para rutas de senderismo y naturaleza en los cerros de Tacarigua.' },
    { name: 'La Palma Real', lat: 11.0219444, lng: -63.8994444, category: 'Natural', vicinity: 'Sector sur, vía al Portachuelo Sur', editorial_summary: 'Área natural con predominio de palmas reales, emblema del paisaje tacarigüero y símbolo de la vegetación tropical del sur del valle.' },
    { name: 'La Huerta de Elicio', lat: 11.035944, lng: -63.911029, category: 'Natural', vicinity: 'Extremo suroeste, límite de la parroquia', editorial_summary: 'Huerta agroecológica que marca el límite suroeste de la frontera de Tacarigua, espacio de cultivo tradicional y biodiversidad local.' },
    { name: 'Consultorio Popular CPT', lat: 11.0535715, lng: -63.9046648, category: 'Salud', vicinity: 'Casco central', editorial_summary: 'Centro de atención médica comunitaria de la Parroquia Guevara, pilar del sistema de salud pública de Tacarigua.' },
  ];
  for (const l of lugares) {
    await client.query(
      'INSERT INTO mapa_lugares (name, lat, lng, category, vicinity, editorial_summary, activo, orden) VALUES ($1,$2,$3,$4,$5,$6,true,0)',
      [l.name, l.lat, l.lng, l.category, l.vicinity, l.editorial_summary]
    );
  }
  console.log(`  ✓ ${lugares.length} lugares`);
  total += lugares.length;

  // =============================================
  // 6. SOCIEDAD_SANIDAD_HITOS (3 from Sanidad.jsx historiaAgua)
  // =============================================
  console.log('📋 Migrando sociedad_sanidad_hitos...');
  await client.query('TRUNCATE TABLE sociedad_sanidad_hitos RESTART IDENTITY CASCADE');
  const hitosAgua = [
    {
      periodo: '1579 – 1927',
      titulo: 'Época de los Manantiales',
      icono: '💧',
      resumen: 'Durante casi 350 años los tacarigüeros dependieron de ríos, pozas y manantiales de la serranía.',
      contenido_html: '<p>Durante casi 350 años, los tacarigüeros dependieron de los ríos, riachuelos, pozos, pozas, tanquillas y aljibes naturales de la serranía. Los indios Tacaribas, presentes desde hace unos 1.500 años, se asentaron en el Valle de los Olleros atraídos por la abundancia de agua y la fertilidad de la tierra.</p><h4>La Poza "La Barca"</h4><p>En el sitio conocido como el Copeicillo, ubicado en la montaña Palma Real en el pueblo de San Sebastián, se encuentra una famosa poza en medio del riachuelo que baja de su montaña, la cual pertenece al Parque Nacional "Jovito Villalba" de la serranía del Copey.</p><p>El riachuelo baja serpenteante entre las piedras limosas, regando a su paso antiguas y nuevas matas de mamey, níspero, aguacate, mango, cocotero, hicacos y otras. En su recorrido cae sobre una enorme piedra cavada por el agua a través de muchos años, formando una poza en forma de "Barca".</p><p>Esta formación rocosa abarca una extensión grande y la poza queda en el centro de la misma, con un nivel de llenado que llega a la cintura. Para el lejano año de <strong>1890</strong> se construyó una represa conocida como Alberca, en la parte de arriba de la poza, para almacenar el agua y llevarla por tuberías hasta la Caja Vieja o depósito de agua —la primera obra civil construida en el pueblo.</p><p>La antigua poza lleva el nombre de "Barca" por su parecido a la misma. También se oye decir entre los más viejos del pueblo que su nombre viene de la palabra <em>Alberca</em>, que encierra o represa el agua, y que luego comenzaron a llamarle Albercón, después Abarcón y con el tiempo simplemente "Barca", como se le conoce hoy.</p>',
      imagen: 'manantial',
    },
    {
      periodo: '1889 – 1939',
      titulo: 'Galerías, Cajas y Molinos',
      icono: '⚙️',
      resumen: 'Galerías filtrantes excavadas en 1934–1935, molinos de viento y la primera caja de agua del pueblo.',
      contenido_html: '<h4>Las Galerías Filtrantes</h4><p>En la montaña Palma Real se encuentran dos galerías filtrantes, excavadas en el año 1934 y finalizadas en 1935. Aún se pueden observar. Las entradas de ambas están hechas con concreto armado hasta dos metros, luego sigue la galería excavada al natural. Estas forman parte del patrimonio del pueblo de San Sebastián.</p><h4>La Vieja Caja de Agua</h4><p>Antigua y legendaria estructura hecha de ladrillos, piedras y cemento. Ubicada en medio de dos cerros, muy cerca del riachuelo "Copeicillo" y no muy lejos del sitio denominado "La Barca".</p><p>Su construcción se hizo en terrenos de Don Felipe Morao y data del año <strong>1889</strong>, en el gobierno del General Juan Pablo Rojas Paúl. En ese mismo año se da inicio a los trabajos del Acueducto Tacarigua-Juangriego, siendo ésta la primera obra civil hecha en el pueblo, junto a la instalación de las tuberías que bajaban del sitio conocido como "El Carapo", en la montaña "Palma Real". Se empleó el sistema de gravedad para llevar el agua fresca y cristalina hasta la Caja o depósito de agua, y de allí a pueblos como Juangriego, Los Millanes, La Vecindad, Santa Ana, Tacarigua y San Sebastián por espacio de 8 años.</p><h4>Los Molinos de Viento de Tacarigua</h4><p>En la población de Tacarigua, el término se asocia a la memoria histórica de sus viejos molinos de viento. Estos molinos se utilizaban para bombear agua salobre desde los pozos subterráneos hacia tanques de almacenamiento.</p><p><strong>El Molino de Aleja</strong>, situado en el sector Tacarigua-Corazón de Jesús (Calle Principal), es uno de los más icónicos y emblemáticos de la zona, conservándose en su lugar como un símbolo de la identidad local. También existió el Molino de Las Delicias.</p>',
      imagen: 'galeria',
    },
    {
      periodo: '1960 – Presente',
      titulo: 'Acueducto Submarino',
      icono: '🚰',
      resumen: 'El acueducto submarino transformó el acceso al agua en la isla, conectando a Margarita con el continente y permitiendo el desarrollo de la red local de Tacarigua (1962–1964).',
      contenido_html: '<p>El acueducto submarino de la Isla de Margarita es la red de tuberías que transporta agua dulce desde el estado Sucre (Venezuela) hasta la isla. Su relación directa con Tacarigua radica en que allí se construyó un acueducto terrestre (1962–1964) que sirvió de complemento y distribuidor del sistema insular.</p><h4>El Acueducto Submarino</h4><p><strong>Primer acueducto:</strong> Inaugurado en <strong>1960</strong> por el presidente Rómulo Betancourt, atravesó el mar desde la población de Cariaco y el río Carinicuao (Clavellinos), trayendo por primera vez agua continental a la isla de forma permanente.</p><p><strong>Segundo acueducto «Luisa Cáceres de Arismendi»:</strong> Inaugurado en <strong>1988</strong> por el presidente Jaime Lusinchi, trajo agua desde el embalse de Turimiquire, reforzando significativamente el sistema y ampliando la capacidad de suministro para toda Margarita y Coche.</p><p><strong>Impacto regional:</strong> Permitió conectar a Margarita y Coche con el continente, reemplazando definitivamente el suministro de emergencia que anteriormente se hacía mediante barcos cisterna (gabarras), lo que representó un salto histórico en la calidad de vida de los isleños.</p><h4>Relación con Tacarigua</h4><p><strong>El sistema distribuidor:</strong> Entre <strong>1962 y 1964</strong> se construyó la red local de Tacarigua, pensada como parte de la infraestructura necesaria para gestionar y canalizar el agua proveniente del continente hacia esta zona del municipio Gómez.</p><p><strong>Memoria histórica:</strong> Esta conexión fue vital para la región. A nivel local se recuerda con especial cariño a figuras como <strong>Emilia José Salinas Ordaz</strong>, apodada la <em>"Reina del Acueducto Submarino de Margarita"</em>, por su histórica labor comunitaria y su incansable abogacía por el derecho al agua en esta localidad.</p>',
      imagen: 'asim',
    },
  ];
  for (let i = 0; i < hitosAgua.length; i++) {
    const h = hitosAgua[i];
    await client.query(
      'INSERT INTO sociedad_sanidad_hitos (periodo, titulo, icono, resumen, contenido_html, imagen, activo, orden) VALUES ($1,$2,$3,$4,$5,$6,true,$7)',
      [h.periodo, h.titulo, h.icono, h.resumen, h.contenido_html, h.imagen, i + 1]
    );
  }
  console.log(`  ✓ ${hitosAgua.length} hitos de agua`);
  total += hitosAgua.length;

  await client.query('COMMIT');
  console.log(`\n✅ Migración completada. Total: ${total} registros insertados en tablas nuevas.`);
} catch (e) {
  await client.query('ROLLBACK');
  console.error('❌ Error:', e.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}
