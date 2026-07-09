-- Seed data for remaining tables

-- home_featured (4 main section cards)
INSERT INTO home_featured (path, titulo, descripcion, icono_nombre, imagen_src, imagen_fallback, imagen_alt, orden, activo) VALUES
('/cultura', 'Cultura', 'Conoce nuestras tradiciones, cultores, gastronomia y costumbres.', 'Palette', '/images/iglesia-plaza-tacarigua-aerea.webp', '/images/pueblo-panoramica.jpg', 'Cultura de Tacarigua', 1, true),
('/geografia', 'Geografia', 'Explora el valle de Tacarigua, su ubicacion y entorno natural.', 'Map', '/images/valle-tacarigua-vista-satelite-nasa.webp', '/images/La_Isla_de_Margarita_y_el_valle_de_Tacarigua_vistos_desde_el_espacio_-_FOTO_NASA1.jpg', 'Geografia de Tacarigua', 2, true),
('/historia', 'Historia', 'Viaje a traves del tiempo desde los Tacaribas hasta hoy.', 'Users', '/images/paisaje-hero-tacarigua.webp', '/images/hero-bg.jpg', 'Historia de Tacarigua', 3, true),
('/sociedad', 'Sociedad', 'Educacion, sanidad, deportes y vida comunitaria.', 'Building', '/images/iglesia-san-jeronimo-aerea.webp', '/images/SaveClip.App_475906724_18350852341179168_4160617441825350742_n.jpg', 'Sociedad de Tacarigua', 4, true)
ON CONFLICT DO NOTHING;

-- nosotros_features (portal modules)
INSERT INTO nosotros_features (icono, titulo, descripcion, orden, activo) VALUES
('📖', 'Historia Digital', 'Preservamos la cronologia historica de Tacarigua desde la epoca prehispanica hasta nuestros dias.', 1, true),
('🎭', 'Cultura Viva', 'Documentamos y difundimos las expresiones culturales, tradiciones y el talento de nuestros cultores.', 2, true),
('📚', 'Biblioteca Virtual', 'Ofrecemos acceso digital a libros, documentos, musica y videos sobre Tacarigua.', 3, true),
('🏛️', 'Geografia Social', 'Exploramos la geografia, educacion, sanidad y deportes que definen nuestra comunidad.', 4, true)
ON CONFLICT DO NOTHING;

-- nosotros_valores (project values)
INSERT INTO nosotros_valores (icono, titulo, descripcion, orden, activo) VALUES
('🔍', 'Veracidad', 'Toda la informacion publicada esta verificada con fuentes documentales y comunitarias.', 1, true),
('🤝', 'Colaboracion', 'Construimos juntos: comunidad, investigadores e instituciones trabajando en equipo.', 2, true),
('🌍', 'Accesibilidad', 'El conocimiento sobre Tacarigua debe estar disponible para todos, gratis y sin barreras.', 3, true),
('📱', 'Innovacion', 'Usamos tecnologia moderna para preservar y difundir nuestra herencia cultural.', 4, true)
ON CONFLICT DO NOTHING;

-- nosotros_stats (community stats)
INSERT INTO nosotros_stats (icono, label, valor, orden, activo) VALUES
('🎭', 'Cultores Documentados', '66', 1, true),
('📚', 'Libros Digitales', '48', 2, true),
('📅', 'Efemerides Registradas', '213', 3, true),
('🎵', 'Albumes Musicales', '19', 4, true)
ON CONFLICT DO NOTHING;
