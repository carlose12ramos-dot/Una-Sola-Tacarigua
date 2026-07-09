-- Seed Fix: Restaurar datos oficiales de init.sql para las 9 tablas afectadas

BEGIN;

-- =============================================
-- Limpiar datos incorrectos (de seed_extra.sql)
-- =============================================
TRUNCATE TABLE historia_secciones CASCADE;
TRUNCATE TABLE historia_videos CASCADE;
TRUNCATE TABLE historia_documentos CASCADE;
TRUNCATE TABLE historia_features CASCADE;
TRUNCATE TABLE historia_datos_rapidos CASCADE;
TRUNCATE TABLE home_featured CASCADE;
TRUNCATE TABLE nosotros_features CASCADE;
TRUNCATE TABLE nosotros_valores CASCADE;
TRUNCATE TABLE nosotros_stats CASCADE;

-- =============================================
-- HISTORIA: SECCIONES
-- =============================================
INSERT INTO historia_secciones (titulo, contenido, activo, orden) VALUES
('Origen del nombre Tacarigua', 'El nombre Tacarigua proviene del pueblo indígena Guaiquerí y está vinculado al árbol balsa. La primera referencia documental aparece en la Información de Testigos de 1580.', true, 1),
('Cinco oleadas indígenas', 'Los estudios reconocen cinco ocupaciones indígenas: desde Punta Gorda y El Agua hasta Playa Guacuco. En el valle se desarrolló la cerámica, el cultivo del maíz y la crianza de algodón.', true, 2),
('Valle, agua y alfarería', 'El valle de Tacarigua fue conocido como El Valle de los Olleros o Valle de Arimacoa por su cerámica. Sus habitantes cultivaban maíz, yuca y algodón.', true, 3),
('Independencia y República', 'Durante la guerra de independencia Tacarigua sirvió como hospital de campaña y base patriota. En 1881 fue Distrito Tacarigua y en 1916 se integró como parroquia Guevara.', true, 4);

-- =============================================
-- HISTORIA: VIDEOS
-- =============================================
INSERT INTO historia_videos (src, titulo, caption, activo, orden) VALUES
('/images/videos/Historia Tacarigua.mp4', 'Historia Tacarigua', 'Recorrido audiovisual por los hitos históricos de Tacarigua, documentado por el Equipo de Trabajo (2018–2022).', true, 1);

-- =============================================
-- HISTORIA: DOCUMENTOS LEGALES
-- =============================================
INSERT INTO historia_documentos (src, full_src, alt, titulo, descripcion, activo, orden) VALUES
('/images/doclegalfun.png', '/images/doclegalfun.png', 'Documento Legal de Tacarigua', 'Documento Legal de Tacarigua', 'Documento histórico que registra la organización y demarcación territorial del valle de Tacarigua.', true, 1),
('/images/documentolegalfundación.png', '/images/documentolegalfundación.png', 'Acta de Fundación', 'Acta de Fundación', 'Documento original de fundación de Tacarigua, testimonio histórico del establecimiento de la parroquia.', true, 2);

-- =============================================
-- HISTORIA: FEATURES
-- =============================================
INSERT INTO historia_features (icono_nombre, titulo, descripcion, activo, orden) VALUES
('Landmark', 'Valle ancestral', 'Tacarigua es un semivalle fértil entre cerros como El Tamoco y El Portachuelo. El agua y la alfarería le dieron identidad desde tiempos indígenas.', true, 1),
('Droplet', 'Agua estratégica', 'En 1971 la UCV describió la zona como la hidrósfera más importante del oriente de Venezuela por sus manantiales, quebradas y lagunas.', true, 2),
('BookOpen', 'Nombre con historia', 'El topónimo Tacarigua tiene origen guaiquerí y se propagó desde Miranda hasta Nueva Esparta junto a las rutas indígenas.', true, 3),
('Clock3', 'Parroquia Guevara', 'Desde 1916 Tacarigua forma parte de la parroquia Guevara del municipio Gómez, conservando su memoria republicana.', true, 4);

-- =============================================
-- HISTORIA: DATOS RÁPIDOS
-- =============================================
INSERT INTO historia_datos_rapidos (icono_nombre, label, texto, activo, orden) VALUES
('Scroll', '1579', 'La fecha más probable del contacto entre los indios Tacaribas y los españoles es el 29 de septiembre de 1579, día de San Miguel Arcángel.', true, 1),
('MapPin', '15+ Tacariguas', 'El nombre Tacarigua existe en más de 15 poblaciones de Venezuela y en una localidad de Trinidad y Tobago.', true, 2),
('Sparkles', 'Cerámica', 'La alfarería indígena del valle de Tacarigua produjo ánforas, tinajones y platos que se intercambiaban con comunidades vecinas.', true, 3);

-- =============================================
-- HOME: FEATURED
-- =============================================
INSERT INTO home_featured (path, titulo, descripcion, icono_nombre, imagen_src, imagen_fallback, imagen_alt, activo, orden) VALUES
('/cultura', 'Cultura', '76 libros de autores tacarigüeros, conjuntos musicales, patronos, artesanía de los Olleros y tradiciones de más de 438 años', 'Palette', '/images/culturainicio.jpg', '/images/culturainicio.jpg', 'Cultura Tacarigua', true, 1),
('/geografia', 'Geografía', 'El Valle de los Olleros, la Banda del Norte, el Portachuelo del Norte y la serranía que abastece de agua a la parroquia', 'Map', '/images/mapainicio.jpg', '/images/mapainicio.jpg', 'Geografía Tacarigua', true, 2),
('/sociedad', 'Sociedad', 'Educación desde 1875, sanidad desde los manantiales guaiqueríes y deportes con medallas olímpicas de Nicomedes Maza González', 'Users', '/images/scj.jpg', '/images/scj.jpg', 'Sociedad Tacarigua', true, 3),
('/historia', 'Historia', 'Desde el encuentro con Miguel Maza de Lizana en 1579 hasta Diego B. Urbaneja, Presidente de Venezuela, nacido en Tacarigua', 'Building', '/images/historiat.jpg', '/images/historiat.jpg', 'Historia Tacarigua', true, 4);

-- =============================================
-- NOSOTROS: FEATURES (6 módulos del portal)
-- =============================================
INSERT INTO nosotros_features (icono, titulo, descripcion, activo, orden) VALUES
('📜', 'Historia', 'Cronología desde los primeros asentamientos indígenas hasta la actualidad, con documentos originales y fuentes verificadas.', true, 1),
('🎭', 'Cultura', 'Tradiciones, festividades, gastronomía típica y expresiones artísticas que definen la identidad tacarigüera.', true, 2),
('🗺️', 'Geografía', 'Mapa interactivo, topografía, recursos naturales y puntos de interés del valle de Tacarigua.', true, 3),
('🏘️', 'Sociedad', 'Organizaciones comunitarias, personajes ilustres y la estructura social que ha dado forma a la parroquia.', true, 4),
('📚', 'Biblioteca', 'Repositorio digital de libros, documentos, música y fotografías históricas de libre acceso.', true, 5),
('📅', 'Calendario', 'Efemérides históricas, religiosas, culturales y fechas conmemorativas del municipio Gómez y Tacarigua.', true, 6);

-- =============================================
-- NOSOTROS: VALORES
-- =============================================
INSERT INTO nosotros_valores (icono, titulo, descripcion, activo, orden) VALUES
('🔍', 'Veracidad', 'Información verificada y documentada con fuentes confiables', true, 1),
('🤝', 'Comunidad', 'Trabajo colaborativo con los habitantes de Tacarigua de Margarita', true, 2),
('💡', 'Innovación', 'Uso de tecnología moderna para preservar la historia', true, 3),
('🌍', 'Accesibilidad', 'Conocimiento disponible para todos, sin barreras', true, 4),
('❤️', 'Pasión', 'Amor profundo por nuestra tierra y su historia', true, 5),
('🎓', 'Educación', 'Compromiso con el aprendizaje y la difusión cultural', true, 6);

-- =============================================
-- NOSOTROS: STATS
-- =============================================
INSERT INTO nosotros_stats (icono, label, valor, activo, orden) VALUES
('📚', 'Libros Publicados', '50+', true, 1),
('🎓', 'Profesionales Universitarios', '28.3%', true, 2),
('📜', 'Años de Historia', '445+', true, 3),
('🗂️', 'Módulos del Portal', '7', true, 4);

COMMIT;
