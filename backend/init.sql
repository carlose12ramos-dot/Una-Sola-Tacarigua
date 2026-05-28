-- ==============================================================
-- SCRIPT DE INICIALIZACIÓN - TACARIGUA DIGITAL (POSTGRESQL)
-- Ejecuta este script en la Query Tool de pgAdmin para crear las tablas
-- ==============================================================

-- 1. Eliminar tablas si ya existen (para evitar colisiones al reinstalar)
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
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear Tabla de Cultores
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

-- Insertar Sugerencias para Moderación
INSERT INTO sugerencias (usuario_nombre, tipo_aporte, detalles, estado, imagen) VALUES
('Carlos Eduardo Ramos González', 'Tipo Aporte', 'Detecten en el ounmate de la colla de contartanosa rintima a scolamir conumunianiss cossesigns.', 'pendiente', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'),
('Carlos Eduardo Ramos González', 'Tipo Aporte', 'Pentanom om el aaunstor de suesolides cotrmenves acandomas de reviewo el vehnato monas.', 'pendiente', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'),
('Carlos Ramos González', 'Tipo Aporte', 'Contriloianes enbarnzos argenimeuts, como nounos de altros.', 'pendiente', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop');
