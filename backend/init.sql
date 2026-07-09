-- ==============================================================
-- SCRIPT DE INICIALIZACIÓN - TACARIGUA DIGITAL (POSTGRESQL)
-- Ejecuta este script en la Query Tool de pgAdmin para crear las tablas
-- ==============================================================

-- 1. Eliminar tablas si ya existen (para evitar colisiones al reinstalar)
DROP TABLE IF EXISTS cultura_costumbres;
DROP TABLE IF EXISTS cultura_gastronomia;
DROP TABLE IF EXISTS sociedad_educacion;
DROP TABLE IF EXISTS sugerencias;
DROP TABLE IF EXISTS biblioteca;
DROP TABLE IF EXISTS historia;
DROP TABLE IF EXISTS cultores;
DROP TABLE IF EXISTS usuarios;

-- 2. Crear Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'ciudadano' CHECK (rol IN ('ciudadano', 'colaborador', 'admin')),
    telefono VARCHAR(50),
    biografia TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear Tabla de Educación (Sociedad)
CREATE TABLE sociedad_educacion (
    id                SERIAL PRIMARY KEY,
    nombre            VARCHAR(200) NOT NULL,
    nivel             VARCHAR(150),
    descripcion       TEXT NOT NULL,
    icono             VARCHAR(10) DEFAULT '🏫',
    imagen            VARCHAR(255),
    activo            BOOLEAN DEFAULT TRUE,
    orden             INT DEFAULT 0,
    creado_en         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear Tabla de Cultores
CREATE TABLE cultores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    bandera VARCHAR(10) DEFAULT '🇻🇪',
    imagen VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear Tabla de Historia (Línea de Tiempo)
CREATE TABLE historia (
    id SERIAL PRIMARY KEY,
    anio VARCHAR(10) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255),
    activo BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Crear Tabla de Biblioteca
CREATE TABLE biblioteca (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    formato VARCHAR(50) NOT NULL, -- 'Música', 'Partitura', 'Documento', etc.
    imagen VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Crear Tabla de Sugerencias (Moderación Participativa)
CREATE TABLE sugerencias (
    id SERIAL PRIMARY KEY,
    usuario_nombre VARCHAR(150) NOT NULL,
    tipo_aporte VARCHAR(50) NOT NULL, -- 'Historia', 'Cultura', 'Biblioteca', 'Geografía'
    detalles TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
    imagen VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Crear Tabla de Costumbres (Cultura)
CREATE TABLE cultura_costumbres (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    categoria   VARCHAR(100),
    descripcion TEXT NOT NULL,
    imagen      VARCHAR(255),
    fuente      VARCHAR(255),
    activo      BOOLEAN DEFAULT TRUE,
    orden       INT DEFAULT 0,
    creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Crear Tabla de Gastronomía (Cultura)
CREATE TABLE cultura_gastronomia (
    id           SERIAL PRIMARY KEY,
    nombre       VARCHAR(200) NOT NULL,
    descripcion  TEXT NOT NULL,
    ingredientes JSONB,
    imagen       VARCHAR(255),
    activo       BOOLEAN DEFAULT TRUE,
    orden        INT DEFAULT 0,
    creado_en    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==============================================================
-- INSERCIÓN DE DATOS SEMILLA (MOCK DATA)
-- ==============================================================

-- Insertar Usuarios semilla
INSERT INTO usuarios (nombre, correo, password, rol) VALUES
('Carlos Eduardo Ramos González', 'carlos@tacarigua.org', 'password123', 'admin'),
('Colaborador Tacarigua', 'colab@tacarigua.org', 'password123', 'colaborador'),
('Vecino Gomez', 'vecino@gmail.com', 'password123', 'ciudadano');

-- Insertar Cultores semilla
INSERT INTO cultores (nombre, disciplina, localidad, bandera, imagen) VALUES
('Maestro Juan', 'Luthier', 'Tacarigua', '🇻🇪', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'),
('Maestro Roi', 'Artisans', 'San Sebastián', '🇻🇪', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'),
('Maestro 3rana', 'Luthier', 'Tacarigua', '🇻🇪', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop'),
('Maestro Dorro', 'Luthier', 'San Sebastián', '🇻🇪', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop');

-- Insertar Hitos Históricos
INSERT INTO historia (anio, titulo, descripcion, imagen, activo) VALUES
('1500', 'Época Precolombina', 'Asentamientos indígenas Guaiqueríes habitaban el fértil valle costero.', '/images/iglesia-tacarigua.jpg', FALSE),
('1600', 'Colonización Española', 'Primeros registros de labradores españoles estableciendo haciendas.', NULL, FALSE),
('1700', 'Fundación de la Parroquia', 'Fundación eclesiástica y trazado de la emblemática plaza hexagonal de Tacarigua.', '/images/pueblo-panoramica.jpg', TRUE),
('1800', 'Hito Independentista', 'Tacarigua sirve de bastión patriota y paso estratégico de tropas.', NULL, FALSE);

-- Insertar Biblioteca
INSERT INTO biblioteca (titulo, autor, categoria, formato, imagen) VALUES
('Polo', 'Manos de Folk', 'Bronce Tierra', 'Música', 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?w=100&h=100&fit=crop'),
('Jota', 'Manos de Folk', 'Bronce Tierra', 'Música', 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?w=100&h=100&fit=crop'),
('Malagueña', 'Manos de Folk', 'Bronce Tierra', 'Música', 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?w=100&h=100&fit=crop');

-- Insertar Costumbres y Tradiciones
INSERT INTO cultura_costumbres (nombre, categoria, descripcion, imagen, fuente, activo, orden) VALUES
('Feria de la Cachapa y el Guarapo de Caña Tacariguero', 'Festividades', 'Evento cultural único en Nueva Esparta organizado por el CDC "Pablo Romero Millán" de Tacarigua, en honor a Don Tomás Sánchez y sus amigos campesinos. Cada año, cerca de la Iglesia del Sagrado Corazón de Jesús, unos 70 emprendedores ofrecen cachapas y platos a base de maíz, además del refrescante guarapo de caña. La feria cuenta con un trapiche de madera donde la caña se muele artesanalmente como en la época de los burros y bueyes. Premiado por el jurado de Margarita Gastronómica.', 'https://www.cheguaco.org/wp-content/uploads/2019/02/feria-de-la-cachapa_c1-300x168.jpg', 'cheguaco.org', true, 1),
('Baile de Burra y Mazorquín', 'Folclore', 'Tradición folclórica de Tacarigua organizada por el CDC "Pablo Romero Millán". El Baile de Burra es una de las diversiones populares más características del pueblo tacarigüero, junto al Mazorquín. Se realizan como actividades de integración comunitaria, colecta de fondos y celebración de las raíces culturales insulares.', 'https://www.cheguaco.org/wp-content/uploads/2019/01/Cachapa1-225x300.jpg', 'cheguaco.org', true, 2),
('Fiestas Patronales del Sagrado Corazón de Jesús y San Sebastián', 'Festividades', 'El Sagrado Corazón de Jesús y San Sebastián son los santos patronos de Tacarigua. El Centro Cultural Pablo Romero Millán integra a la comunidad en sus fiestas patronales, con procesiones, música y actividades culturales.', '/images/IGLESIA SS.jpg', 'cheguaco.org', true, 3),
('Las Olimpíadas de Historia de Tacarigua', 'Educación', 'Proyecto único en el Estado Nueva Esparta en el que un equipo de facilitadores dictó 35 charlas a docentes y alumnos de educación básica sobre Historia, Cultura, Educación, Sanidad y Deportes de Tacarigua. 248 estudiantes participaron en la primera edición, celebrada en junio de 2019.', 'https://www.cheguaco.org/wp-content/uploads/2019/06/65270802_1204808106366649_2898299581232054272_n-300x169.jpg', 'cheguaco.org', true, 4),
('Velorio de Cruz de Mayo y Parrandas', 'Tradiciones', 'El Velorio de Cruz de Mayo es una tradición religiosa celebrada en Tacarigua con cantos, procesiones y devoción popular. A esto se suman las parrandas de conjuntos locales que recorrieron las calles del pueblo repartiendo música sin cobrar, manteniendo viva la tradición parrandera de más de 430 años.', '/images/WhatsApp Image 2026-06-09 at 2.09.07 PM.jpeg', 'cheguaco.org', true, 5);

-- Insertar Gastronomía
INSERT INTO cultura_gastronomia (nombre, descripcion, imagen, activo, orden) VALUES
('Cachapa Tacarigüera', 'La cachapa es el plato más emblemático de Tacarigua. En la III Feria de la Cachapa y el Guarapo de Caña Tacariguero, unos 70 emprendedores presentan variaciones de este plato a base de maíz tierno, convirtiendo a Tacarigua en la capital cachemera de Nueva Esparta.', 'https://www.cheguaco.org/wp-content/uploads/2019/01/Cachapa2-225x300.jpg', true, 1),
('Guarapo de Caña Tacariguero', 'El guarapo de caña es bebida insigne de Tacarigua. Producido artesanalmente desde trapiches de madera jalados por burros o bueyes, su historia está ligada a Don Tomás Sánchez y su familia campesina. En la Feria de la Cachapa, el CDC trae el trapiche histórico de la finca de los Cerros de Paraguachi.', 'https://www.cheguaco.org/wp-content/uploads/2019/02/IMG_20190207_153644-300x225.jpg', true, 2),
('Sancocho e Gallo', 'El sancocho de gallo es una preparación tradicional margariteña. Compartido en reuniones familiares, bodas y celebraciones comunitarias, su receta tradicional combina el gallo criollo con verduras de estación.', 'https://www.cheguaco.org/wp-content/uploads/2019/02/reportaje1-300x203.jpg', true, 3),
('Caña de Azúcar y Melaza', 'La caña de azúcar, traída por los conquistadores españoles, tuvo una reproducción increíble en el Valle de las Tacariguas hasta convertirse en símbolo de la tacarigüedad. Los alambiques del pueblo producían melaza y guarapo.', '/images/WhatsApp Image 2026-06-09 at 2.09.24 PM.jpeg', true, 4),
('Arepas, Empanadas y Pasteles de Pescado', 'La cocina margariteña tiene en Tacarigua exponentes destacados de estas preparaciones tradicionales. El pescado fresco de la costa neoespartana se combina con la masa de maíz para crear arepas, empanadas y pasteles que alimentan la tradición culinaria del pueblo.', '/images/WhatsApp Image 2026-06-09 at 2.09.24 PM.jpeg', true, 5);

-- Insertar Instituciones Educativas
INSERT INTO sociedad_educacion (nombre, nivel, descripcion, icono, imagen, activo, orden) VALUES
('U.E. "Napoleón Narváez"', 'Educación Inicial y Básica', 'Fundada en 1946. Lleva el nombre del ilustre historiador neoespartano Napoleón Narváez. Ha formado generaciones de tacarigüeros y cuenta con biblioteca escolar desde 1987. Ubicadada en la Calle Principal de Tacarigua.', '🏫', 'escuelaNapoleonNarvaez', true, 1),
('U.E.E. "Cruz Millán García"', 'Educación Inicial, Básica y Media General', 'La U.E.E. Cruz Millán García (Unidad Educativa Estadal Cruz Millán García) es una institución pública de educación básica y media general. Fue fundada en enero de 1963. Su historia se remonta a 1931 cuando inició como la Escuela Mixta Nº 26. Ubicada en el Valle de San Sebastián, en el Municipio Gómez del Estado Nueva Esparta, Venezuela.', '🏫', 'escuelaCruzMillanGarcia', true, 2),
('U.E. "Roraima"', 'Educación Inicial, Básica y Media General', 'La Unidad Educativa Roraima es un prestigioso colegio privado bilingue ubicado en la Calle Principal de Tacariguita, Municipio Gómez, Estado Nueva Esparta, específicamente en el Municipio Gómez. Ofrece formación integral (Educación Inicial, Primaria y Media General) enfocada en la libertad, el contacto con la naturaleza y la diversión.', '📖', 'escuelaRoraima', true, 3),
('U.E. "Colegio Divina Pastora"', 'Educación Inicial, Básica y Media General', 'Fundada el 23 de septiembre de 1993 por la Licenciada Yumeli Rivera Núñez. Proyecto educativo privado basado en valores cristianos y humanos, con una pedagogía participativa y progresista. Ubicado en la Vía Principal de Tacarigua.', '✏️', 'colegioDivinaPastora', true, 4);

-- Insertar Sugerencias para Moderación
INSERT INTO sugerencias (usuario_nombre, tipo_aporte, detalles, estado, imagen) VALUES
('Carlos Eduardo Ramos González', 'Tipo Aporte', 'Detecten en el ounmate de la colla de contartanosa rintima a scolamir conumunianiss cossesigns.', 'pendiente', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'),
('Carlos Eduardo Ramos González', 'Tipo Aporte', 'Pentanom om el aaunstor de suesolides cotrmenves acandomas de reviewo el vehnato monas.', 'pendiente', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'),
('Carlos Ramos González', 'Tipo Aporte', 'Contriloianes enbarnzos argenimeuts, como nounos de altros.', 'pendiente', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop');

-- ==============================================================
-- FASE 2: NUEVAS TABLAS Y SEMILLAS
-- ==============================================================

-- Limpiar datos existentes de Fase 2
DROP TABLE IF EXISTS sociedad_medicina_trad CASCADE;
DROP TABLE IF EXISTS sociedad_educacion_hitos CASCADE;
DROP TABLE IF EXISTS sociedad_educadores CASCADE;
DROP TABLE IF EXISTS sociedad_personajes CASCADE;
DROP TABLE IF EXISTS nosotros_features CASCADE;
DROP TABLE IF EXISTS nosotros_valores CASCADE;
DROP TABLE IF EXISTS nosotros_stats CASCADE;
DROP TABLE IF EXISTS nosotros_mision_vision CASCADE;
DROP TABLE IF EXISTS historia_secciones CASCADE;
DROP TABLE IF EXISTS historia_videos CASCADE;
DROP TABLE IF EXISTS historia_documentos CASCADE;
DROP TABLE IF EXISTS historia_features CASCADE;
DROP TABLE IF EXISTS historia_datos_rapidos CASCADE;
DROP TABLE IF EXISTS home_featured CASCADE;

-- 1. MEDICINA TRADICIONAL
INSERT INTO sociedad_medicina_trad (nombre, descripcion, icono, activo, orden) VALUES
('Parteras Tradicionales', 'Las parteras de Tacarigua fueron por generaciones las encargadas de traer al mundo a los hijos del pueblo. Con sabiduría ancestral heredada de los Guaiqueríes, atendían partos en los hogares con técnicas transmitidas de madre a hija.', '🤱', true, 1),
('Sobadores y Curanderos', 'Los sobadores y curanderos utilizaban hierbas, arbustos y remedios de la serranía tacarigüera para aliviar males. Esta práctica, originada con los indios Tacaribas, perduró como primera línea de salud antes de la llegada de la medicina formal.', '🌿', true, 2),
('Curanderos Emblemáticos', 'Ladislao Romero (curaba tifus, tétano, dolores) y Antonio Romero Mata (sobador de huesos, preparaba colirios) fueron figuras destacadas que combinaban oraciones con remedios de monte.', '✨', true, 3),
('Sobadores Legendarios', 'Jóvito Antonio Moya (masajista con "Mentol Davis") y Esteban Rivera atendían personas desde Anaco hasta California, curando torceduras, zafaduras y picaduras de animales ponzoñosos.', '💪', true, 4);

-- 2. HITOS EDUCATIVOS
INSERT INTO sociedad_educacion_hitos (anio, evento, activo, orden) VALUES
('1870', 'Firma del Decreto de Instrucción Pública Gratuita y Obligatoria por el presidente Antonio Guzmán Blanco el 27 de junio de 1870, sentando la base legal para las escuelas oficiales.', true, 1),
('1875', 'El 12 de julio de 1875 se inaugura la Escuela Federal Diurna de Varones N° 860 en Tacarigua (Resolución N° 20). Su primer preceptor/maestro fue Ignacio Jiménez, con 42 alumnos.', true, 2),
('1897', 'Reapertura de la Escuela Federal de Varones N° 860, renombrada como Escuela Federal N° 1550 de Hembras Diurna, abriendo el acceso formal para las mujeres del pueblo bajo la dirección de Anastasia Rivero.', true, 3),
('1934', 'El 20 de octubre de 1934 se nombra a Cándido Sánchez como maestro de la Escuela Nocturna N° 8 de Tacarigua.', true, 4),
('1939', 'El 14 de septiembre de 1939 (según Gaceta Oficial N° 532) se nombra a nuevos educadores, incluyendo a Evaristo Alfonzo Guerra en la Escuela Nocturna N° 8 (o de Varones Diurna N° 8) en Corazón de Jesús, Tacarigua.', true, 5),
('1946', 'El 16 de septiembre de 1946 se funda el Grupo Escolar / Escuela Napoleón Narváez mediante la fusión de la Escuela Federal N° 651 de Varones, la Escuela Federal N° 1354 de Hembras y la Escuela Estadal N° 18 Nocturna de Adultos, con el impulso de Luis Beltrán Rivero Millán y Pablo Romero Millán.', true, 6),
('1949', 'Evaristo Alfonzo Guerra «Lico» se gradúa como Licenciado en Química en la Universidad Central de Venezuela (UCV), convirtiéndose en el primer universitario graduado originario de Tacarigua.', true, 7),
('1951', 'En julio de 1951, Antonio «Toñito» Millán Guerra se gradúa como el primer Maestro Normalista nacido en Tacarigua, obteniendo su título en la Escuela Normal "El Mácaro" de Maracay a los 17 años.', true, 8),
('1954', 'En julio de 1954, Helvecia Marcano González se gradúa como la primera enfermera profesional originaria de Tacarigua, en la Escuela de Enfermeras "Domingo Badaracco Bermúdez" de Cumaná.', true, 9),
('1961', 'Florentino Lárez (egresado de la Escuela Normal "Miguel Suniaga") y Juana María Gil Ordaz (quien obtuvo su título tras equivalencias en el Liceo "Francisco Antonio Rísquez") se gradúan como Maestros Normalistas.', true, 10),
('1963', 'Se inaugura el edificio de la Escuela San Sebastián en el sector Tacarigua (posteriormente renombrada "Cruz Millán García" en honor a su célebre educador).', true, 11),
('1990', 'Agustín Landaeta obtiene su Licenciatura en Educación, completando su formación docente y continuando su trayectoria como subdirector desde 1994.', true, 12),
('1993', 'El 23 de septiembre de 1993, la Licenciada Yumeli Rivera Núñez funda el Colegio Divina Pastora, enfocado en valores cristianos y pedagogía participativa.', true, 13);

-- 3. EDUCADORES
INSERT INTO sociedad_educadores (nombre, apodo, imagen, descripcion, detalles_html, activo, orden) VALUES
('Evaristo Alfonzo Guerra', 'Profesor "Lico"', 'evaristoAlfonzo', 'Primer Profesional Universitario de la Parroquia Guevara, Municipio Gómez, Estado Nueva Esparta. Profesor de Biología y Química graduado en el Instituto Pedagógico de Caracas en julio de 1949.', '<p>En la Parroquia Guevara, municipio Gómez del estado Nueva Esparta, la Humildad duerme en cada quicio y cada estera; sueña con cosas hermosas y no solo se aferra a la esperanza sino que duerme con ella, lucha por ella y se sacrifica por ella…. amor del bueno. Evaristo Alfonzo Guerra es de los nuestros, con la Humildad con mayúscula, sueños al aire, visión de alguien en la vida y misión de luchar por sus sueños.</p><p>Nació el 27 de octubre de 1922 en nuestra población de Tacarigua - San Sebastián, del vientre de Atanasia Guerra, vecina del lugar, y de la varonilidad de Emilio Alfonzo, agricultor del antiguo Caserío El Río. Sus padrinos fueron Juan Romero y Catalina Moya.</p><h4>Infancia y Formación</h4><p>Su infancia transcurrió en su pueblo natal hasta que, a los 7 años de edad, fue inscrito en la Escuela Estadal N° 43, en Tacarigua San Sebastián bajo la dirección de la Preceptora Magdalena Piñerúa. Esta era una Escuela de Varones Diurna con un presupuesto de Bs. 60 y la asistencia de unos 42 estudiantes. En esa escuela estuvo hasta aprobar el 4to grado, cuando fue trasladado a Santa Ana del Norte en septiembre de 1934, a la Escuela Federal EF-9 bajo la dirección de Víctor Aumaitre Villarroel.</p><p>Luego de obtener su sexto grado, pidió a su madre continuar estudiando y fue inscrito en el Liceo "Francisco Antonio Rísquez", donde estudió hasta 4to año en 1938.</p><h4>Primeros Pasos como Maestro</h4><p>En el año 1939, estando en su población natal, reemplazó a Pablito Romero Millán en la Escuela Estadal de Varones Diurna N° 8, según la Gaceta Oficial N° 532 del 14-09-1939. Una semana más tarde, el 21 de septiembre de 1939, fue nombrado como Maestro de la Escuela Estadal Varones Diurna N° 117 en Carapacho (Municipio Díaz), en reemplazo de Ana Luisa Heredia (Gaceta Oficial N° 567 del 21-09-1939). No obstante, ese cambio no fue de su agrado y renunció al mismo el 2 de octubre, según la Gaceta Oficial N° 569.</p><h4>Estudios en Caracas y Título Universitario</h4><p>Posteriormente, se trasladó a Puerto Cabello, donde estaba su padre, y luego a Caracas, donde cursó estudios en el Colegio La Salle. En ese instituto se graduó de Bachiller en Ciencias Biológicas en el lapso 1943-1944.</p><p>El 24 de septiembre de 1945 se inscribió en el Instituto Pedagógico de Caracas, identificado con la cédula de identidad N° V-89.751. Tras culminar su carrera, se graduó como <strong>Profesor en Biología y Química en julio de 1949</strong>, logro que lo cataloga históricamente como el <strong>primer Profesional Universitario de la Parroquia Guevara</strong>.</p><h4>Carrera Profesional y Legado</h4><p>El Profesor "Lico" inició su carrera como Educador en varias instituciones educativas de la capital, entre las cuales destaca principalmente el Colegio San Pablo, donde tuvo una ejemplar trayectoria hasta llegar a ser Director de la institución.</p><p>El Profesor Evaristo falleció en Caracas el 15 de marzo de 1992, sin dejar descendencia pero con el corazón henchido de satisfacciones al comprobar que su obra educativa y su ejemplo fueron de una dimensión extraordinaria. ¡Gloria al Profesor Evaristo Alfonzo!</p>', true, 1),
('Ignacio Jiménez', NULL, NULL, 'Primer preceptor oficial de la Escuela Federal N° 860 (1875–1883). El "Apostól de la Educación Tacarigüera" falleció joven a los 29 años, dejando el legado que hizo de Tacarigua "La Atenas Neoespartana".', NULL, true, 2),
('Napoleón Narváez', NULL, NULL, 'Historiador neoespartano epónimo de la escuela fundada en 1946. Documentó la historia de Margarita y Tacarigua, incluyendo la participación de José Jesús Guevara en el Congreso de Angostura.', NULL, true, 3),
('Toñito Millán', NULL, NULL, 'Primer Maestro Normalista tacarigüero (1951). Su espíritu libertario lo llevó a combatir a Pérez Jiménez y posteriormente ejercer en El Tigre y Valencia. Homenajeado como Ciudadano Ejemplar.', NULL, true, 4),
('Juana María Gil Ordaz', NULL, NULL, 'Maestra Normalista graduada (1961) que ejerció como Directora en la Escuela "Napoleón Narváez". Condecorada con la "Orden Victor Aumaitre Villarroel" por su 36 años de servicio educativo.', NULL, true, 5),
('Agustín Landaeta', NULL, NULL, 'Maestro Normalista (1963) y Licenciado en Educación (1990). Director de escuelas en San Sebastián y lideró el Grupo Escolar "Nuestra Señora de La Asunción". Fue SubDirector desde 1994.', NULL, true, 6),
('Florentino Larez', NULL, NULL, 'Maestro Normalista (1961) que ejerció en San Antonio de Irapa y luego en Porlamar y Santa Ana. Fundador del periódico "Los Angeles" y pionero en agrupaciones musicales. Jubilado en 1986.', NULL, true, 7);

-- 4. PERSONAJES DE SANIDAD
INSERT INTO sociedad_personajes (nombre, resumen, activo, orden) VALUES
('Evaristo Rivera', 'Evaristo Rivera fue una figura emblemática de la salud comunitaria en Tacarigua. Reconocido por su vocación de servicio, apoyó activamente las labores de prevención y atención primaria en el pueblo, convirtiéndose en un referente de la memoria sanitaria del Valle de Tacarigua.', true, 1),
('Esteban Rivera', 'Sobador y curandero destacado, Esteban Rivera fue heredero directo de las tradiciones medicinales guaiqueríes. Con técnicas aprendidas de los antiguos pobladores de la isla, atendía torceduras, zafaduras y picaduras de animales ponzoñosos. Su fama trascendió los límites del pueblo y personas de distintas localidades acudían a él en busca de alivio.', true, 2),
('Luis Laplana', 'Médico español que marcó un antes y un después en la historia sanitaria de Tacarigua. Ejerció entre 1946 y 1948 como primer médico residente ampliamente recordado por la comunidad. Su presencia representó el inicio de la medicina formal en el pueblo: realizaba visitas a domicilio, asistía partos y brindaba atención general con los escasos recursos de la época.', true, 3),
('Idahís Marcano', 'Investigadora y asesora indispensable en la documentación de la historia sanitaria de Tacarigua. Prestó servicios en el Dispensario durante 33 años consecutivos, convirtiéndose en la memoria institucional viva de ese centro de salud. Gracias a su labor, se rescataron testimonios, registros y datos que hoy forman parte del acervo histórico del pueblo.', true, 4),
('Jóvito Antonio Moya', 'Masajista y sobador que aprendió su oficio de un anciano indígena en la Hacienda de Isla de Gato. Jóvito Antonio Moya desarrolló una técnica particular con "Mentol Davis" que le ganó reconocimiento regional: personas desde Anaco hasta California, pasando por El Tigre, cruzaban distancias considerables para ser atendidos por sus manos. Fue una de las figuras más entrañables de la medicina popular tacarigüera.', true, 5),
('Helvecia Marcano', 'Primera enfermera graduada de origen tacarigüero, egresada en 1954 de una institución formadora de salud. Su titulación fue un hito en la historia local: demostró que las mujeres del pueblo podían alcanzar formación profesional en el área de la salud. Ejerció con devoción y fue pionera en inspirar a futuras generaciones de enfermeras de la Parroquia Guevara.', true, 6);

-- 5. NOSOTROS: FEATURES
INSERT INTO nosotros_features (icono, titulo, descripcion, activo, orden) VALUES
('📜', 'Historia', 'Cronologia desde los primeros asentamientos indigenas hasta la actualidad, con documentos originales y fuentes verificadas.', true, 1),
('🎭', 'Cultura', 'Tradiciones, festividades, gastronomia tipica y expresiones artisticas que definen la identidad tacariguera.', true, 2),
('🗺️', 'Geografia', 'Mapa interactivo, topografia, recursos naturales y puntos de interes del valle de Tacarigua.', true, 3),
('🏘️', 'Sociedad', 'Organizaciones comunitarias, personajes ilustres y la estructura social que ha dado forma a la parroquia.', true, 4),
('📚', 'Biblioteca', 'Repositorio digital de libros, documentos, musica y fotografias historicas de libre acceso.', true, 5),
('📅', 'Calendario', 'Efemerides historicas, religiosas, culturales y fechas conmemorativas del municipio Gomez y Tacarigua.', true, 6);

-- 6. NOSOTROS: VALORES
INSERT INTO nosotros_valores (icono, titulo, descripcion, activo, orden) VALUES
('🔍', 'Veracidad', 'Informacion verificada y documentada con fuentes confiables', true, 1),
('🤝', 'Comunidad', 'Trabajo colaborativo con los habitantes de Tacarigua de Margarita', true, 2),
('💡', 'Innovacion', 'Uso de tecnologia moderna para preservar la historia', true, 3),
('🌍', 'Accesibilidad', 'Conocimiento disponible para todos, sin barreras', true, 4),
('❤️', 'Pasion', 'Amor profundo por nuestra tierra y su historia', true, 5),
('🎓', 'Educacion', 'Compromiso con el aprendizaje y la difusion cultural', true, 6);

-- 7. NOSOTROS: STATS
INSERT INTO nosotros_stats (icono, label, valor, activo, orden) VALUES
('📚', 'Libros Publicados', '50+', true, 1),
('🎓', 'Profesionales Universitarios', '28.3%', true, 2),
('📜', 'Años de Historia', '445+', true, 3),
('🗂️', 'Modulos del Portal', '7', true, 4);

-- 8. NOSOTROS: MISIÓN / VISIÓN
INSERT INTO nosotros_mision_vision (tipo, titulo, contenido, activo) VALUES
('mision', 'Nuestra Mision', 'Digitalizar y preservar la memoria historica de Tacarigua de Margarita, haciendo accesible su rico patrimonio cultural, educativo y social a traves de una plataforma interactiva y colaborativa.', true),
('vision', 'Nuestra Vision', 'Convertirnos en el referente digital mas completo sobre la historia y cultura de Tacarigua, conectando a las generaciones actuales y futuras con sus raices a traves de la tecnologia y la innovacion.', true);

-- 9. HISTORIA: SECCIONES
INSERT INTO historia_secciones (titulo, contenido, activo, orden) VALUES
('Origen del nombre Tacarigua', 'El nombre Tacarigua proviene del pueblo indígena Guaiquerí y está vinculado al árbol balsa. La primera referencia documental aparece en la Información de Testigos de 1580.', true, 1),
('Cinco oleadas indígenas', 'Los estudios reconocen cinco ocupaciones indígenas: desde Punta Gorda y El Agua hasta Playa Guacuco. En el valle se desarrolló la cerámica, el cultivo del maíz y la crianza de algodón.', true, 2),
('Valle, agua y alfarería', 'El valle de Tacarigua fue conocido como El Valle de los Olleros o Valle de Arimacoa por su cerámica. Sus habitantes cultivaban maíz, yuca y algodón.', true, 3),
('Independencia y República', 'Durante la guerra de independencia Tacarigua sirvió como hospital de campaña y base patriota. En 1881 fue Distrito Tacarigua y en 1916 se integró como parroquia Guevara.', true, 4);

-- 10. HISTORIA: VIDEOS
INSERT INTO historia_videos (src, titulo, caption, activo, orden) VALUES
('/images/videos/Historia Tacarigua.mp4', 'Historia Tacarigua', 'Recorrido audiovisual por los hitos históricos de Tacarigua, documentado por el Equipo de Trabajo (2018–2022).', true, 1);

-- 11. HISTORIA: DOCUMENTOS LEGALES
INSERT INTO historia_documentos (src, full_src, alt, titulo, descripcion, activo, orden) VALUES
('/images/doclegalfun.png', '/images/doclegalfun.png', 'Documento Legal de Tacarigua', 'Documento Legal de Tacarigua', 'Documento histórico que registra la organización y demarcación territorial del valle de Tacarigua.', true, 1),
('/images/documentolegalfundación.png', '/images/documentolegalfundación.png', 'Acta de Fundación', 'Acta de Fundación', 'Documento original de fundación de Tacarigua, testimonio histórico del establecimiento de la parroquia.', true, 2);

-- 12. HISTORIA: FEATURES
INSERT INTO historia_features (icono_nombre, titulo, descripcion, activo, orden) VALUES
('Landmark', 'Valle ancestral', 'Tacarigua es un semivalle fértil entre cerros como El Tamoco y El Portachuelo. El agua y la alfarería le dieron identidad desde tiempos indígenas.', true, 1),
('Droplet', 'Agua estratégica', 'En 1971 la UCV describió la zona como la hidrósfera más importante del oriente de Venezuela por sus manantiales, quebradas y lagunas.', true, 2),
('BookOpen', 'Nombre con historia', 'El topónimo Tacarigua tiene origen guaiquerí y se propagó desde Miranda hasta Nueva Esparta junto a las rutas indígenas.', true, 3),
('Clock3', 'Parroquia Guevara', 'Desde 1916 Tacarigua forma parte de la parroquia Guevara del municipio Gómez, conservando su memoria republicana.', true, 4);

-- 13. HISTORIA: DATOS RÁPIDOS
INSERT INTO historia_datos_rapidos (icono_nombre, label, texto, activo, orden) VALUES
('Scroll', '1579', 'La fecha más probable del contacto entre los indios Tacaribas y los españoles es el 29 de septiembre de 1579, día de San Miguel Arcángel.', true, 1),
('MapPin', '15+ Tacariguas', 'El nombre Tacarigua existe en más de 15 poblaciones de Venezuela y en una localidad de Trinidad y Tobago.', true, 2),
('Sparkles', 'Cerámica', 'La alfarería indígena del valle de Tacarigua produjo ánforas, tinajones y platos que se intercambiaban con comunidades vecinas.', true, 3);

-- 14. HOME: FEATURED
INSERT INTO home_featured (path, titulo, descripcion, icono_nombre, imagen_src, imagen_fallback, imagen_alt, activo, orden) VALUES
('/cultura', 'Cultura', '76 libros de autores tacarigüeros, conjuntos musicales, patronos, artesanía de los Olleros y tradiciones de más de 438 años', 'Palette', '/images/cultura_inicio.webp', '/images/cultura_inicio.jpg', 'Cultura Tacarigua', true, 1),
('/geografia', 'Geografía', 'El Valle de los Olleros, la Banda del Norte, el Portachuelo del Norte y la serranía que abastece de agua a la parroquia', 'Map', '/images/geografia_inicio.webp', '/images/geografia_inicio.jpg', 'Geografía Tacarigua', true, 2),
('/sociedad', 'Sociedad', 'Educación desde 1875, sanidad desde los manantiales guaiqueríes y deportes con medallas olímpicas de Nicomedes Maza González', 'Users', '/images/sociedad_inicio.webp', '/images/sociedad_inicio.jpg', 'Sociedad Tacarigua', true, 3),
('/historia', 'Historia', 'Desde el encuentro con Miguel Maza de Lizana en 1579 hasta Diego B. Urbaneja, Presidente de Venezuela, nacido en Tacarigua', 'Building', '/images/historia_inicio.webp', '/images/historia_inicio.jpg', 'Historia Tacarigua', true, 4);
