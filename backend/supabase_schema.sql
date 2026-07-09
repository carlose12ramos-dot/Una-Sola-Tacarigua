-- ==============================================================
-- SCRIPT DE INICIALIZACIÓN COMPLETO - TACARIGUA DIGITAL (SUPABASE)
-- Este script incluye todas las tablas para cada módulo y submódulo
-- ==============================================================

-- ==========================================
-- 0. LIMPIEZA INICIAL (Opcional, ten cuidado)
-- ==========================================
DROP TABLE IF EXISTS sociedad_deportes CASCADE;
DROP TABLE IF EXISTS sociedad_sanidad CASCADE;
DROP TABLE IF EXISTS sociedad_educacion CASCADE;
DROP TABLE IF EXISTS cultura_cultores CASCADE;
DROP TABLE IF EXISTS cultura_agrupaciones CASCADE;
DROP TABLE IF EXISTS historia_hitos CASCADE;
DROP TABLE IF EXISTS historia_personajes CASCADE;
DROP TABLE IF EXISTS geografia_sectores CASCADE;
DROP TABLE IF EXISTS geografia_lugares CASCADE;
DROP TABLE IF EXISTS biblioteca_documentos CASCADE;
DROP TABLE IF EXISTS sugerencias CASCADE;
DROP TABLE IF EXISTS noticias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ==========================================
-- 1. SISTEMA BASE Y ADMINISTRACIÓN
-- ==========================================

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Usando UUID, ideal para Supabase Auth
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    rol VARCHAR(20) DEFAULT 'ciudadano' CHECK (rol IN ('ciudadano', 'colaborador', 'admin')),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE noticias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    imagen VARCHAR(255),
    modulo_relacionado VARCHAR(50), -- ej. 'Sociedad', 'Deportes', 'General'
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE sugerencias (
    id SERIAL PRIMARY KEY,
    usuario_nombre VARCHAR(150) NOT NULL,
    correo_contacto VARCHAR(150),
    modulo VARCHAR(50) NOT NULL, -- 'Historia', 'Cultura', 'Biblioteca', 'Geografía', etc.
    detalles TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_revision', 'aprobado', 'rechazado')),
    imagen VARCHAR(255),
    adjuntos JSONB,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 2. MÓDULO: SOCIEDAD
-- ==========================================

-- Submódulo: Deportes
CREATE TABLE sociedad_deportes (
    id SERIAL PRIMARY KEY,
    disciplina VARCHAR(100) NOT NULL,
    icono VARCHAR(10),
    color_hex VARCHAR(20),
    descripcion TEXT NOT NULL,
    hitos_destacados JSONB, -- Array de strings con los datos principales
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Submódulo: Sanidad
CREATE TABLE sociedad_sanidad (
    id SERIAL PRIMARY KEY,
    nombre_centro VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- 'Ambulatorio', 'Farmacia', 'Consultorio'
    direccion TEXT,
    horarios VARCHAR(150),
    servicios JSONB, -- Array de servicios ofrecidos
    telefono VARCHAR(50),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Submódulo: Educación
CREATE TABLE sociedad_educacion (
    id SERIAL PRIMARY KEY,
    institucion VARCHAR(150) NOT NULL,
    nivel VARCHAR(50), -- 'Preescolar', 'Básica', 'Diversificada'
    direccion TEXT,
    resena_historica TEXT,
    imagen VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 3. MÓDULO: CULTURA
-- ==========================================

-- Submódulo: Cultores
CREATE TABLE cultura_cultores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    disciplina VARCHAR(100) NOT NULL, -- 'Música', 'Artesanía', 'Pintura', etc.
    localidad VARCHAR(100),
    bandera VARCHAR(10) DEFAULT '🇻🇪',
    biografia TEXT,
    imagen VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Submódulo: Agrupaciones y Eventos
CREATE TABLE cultura_agrupaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    genero VARCHAR(100),
    anio_fundacion INT,
    descripcion TEXT,
    imagen VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 4. MÓDULO: HISTORIA
-- ==========================================

-- Submódulo: Línea de Tiempo / Hitos
CREATE TABLE historia_hitos (
    id SERIAL PRIMARY KEY,
    anio VARCHAR(20) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255),
    fuente VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Submódulo: Personajes Históricos
CREATE TABLE historia_personajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    epoca VARCHAR(100),
    aportes TEXT NOT NULL,
    imagen VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 5. MÓDULO: GEOGRAFÍA
-- ==========================================

-- Submódulo: Sectores y Caseríos
CREATE TABLE geografia_sectores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    limites TEXT,
    poblacion_estimada INT,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Submódulo: Lugares Emblemáticos (Plazas, Iglesias, Sitios Naturales)
CREATE TABLE geografia_lugares (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    tipo VARCHAR(50), -- 'Plaza', 'Iglesia', 'Monumento', 'Naturaleza'
    descripcion TEXT NOT NULL,
    coordenadas VARCHAR(100), -- Ej. '11.0500, -63.9167'
    imagen VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 6. MÓDULO: BIBLIOTECA
-- ==========================================

CREATE TABLE biblioteca_documentos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL, -- 'Historia', 'Música', 'Cuentos'
    formato VARCHAR(50) NOT NULL, -- 'PDF', 'Audio', 'Video', 'Enlace'
    url_archivo VARCHAR(255),
    imagen_portada VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==============================================================
-- INSERCIÓN DE DATOS DE PRUEBA (MOCK DATA)
-- ==============================================================

-- Deportes
INSERT INTO sociedad_deportes (disciplina, icono, color_hex, descripcion, hitos_destacados) VALUES
('Béisbol', '⚾', '#e74c3c', 'En la Isla de Margarita el Béisbol inició en 1907. Equipos emblemáticos: Los Sapos.', '["Club Mariño fundado en 1907", "No-hit-no-run de Dalmiro Malaver"]'),
('Atletismo Olímpico', '🏅', '#f1c40f', 'Nico Maza González obtuvo dos Medallas Olímpicas en los Juegos Especiales.', '["Nicomedes Maza González", "2 Medallas Olímpicas en Minnesota 1991"]');

-- Sanidad
INSERT INTO sociedad_sanidad (nombre_centro, tipo, direccion, horarios) VALUES
('Ambulatorio de Tacarigua', 'Ambulatorio', 'Calle Principal', '24 horas'),
('Farmacia del Pueblo', 'Farmacia', 'Frente a la Plaza Bolívar', '8:00 AM - 8:00 PM');

-- Educación (seed eliminado — datos incorrectos, las instituciones auténticas están en el frontend)

-- Cultores
INSERT INTO cultura_cultores (nombre, disciplina, localidad) VALUES
('Maestro Juan', 'Luthier', 'Tacarigua'),
('Maestro Roi', 'Artesano', 'San Sebastián');

-- Historia Hitos
INSERT INTO historia_hitos (anio, titulo, descripcion) VALUES
('1500', 'Época Precolombina', 'Asentamientos indígenas Guaiqueríes habitaban el fértil valle costero.'),
('1700', 'Fundación de la Parroquia', 'Fundación eclesiástica y trazado de la plaza hexagonal.');

-- Biblioteca
INSERT INTO biblioteca_documentos (titulo, autor, categoria, formato) VALUES
('Polo Margariteño', 'Manos de Folk', 'Música Tradicional', 'Audio'),
('Historia de la Iglesia de Tacarigua', 'Cronista Local', 'Historia', 'PDF');

-- Sugerencias
INSERT INTO sugerencias (usuario_nombre, modulo, detalles, estado) VALUES
('Vecino Activo', 'Historia', 'Tengo fotos antiguas de la plaza para la línea de tiempo.', 'pendiente');


-- ==============================================================
-- SEGURIDAD (RLS - Row Level Security) Opcional
-- ==============================================================
-- Ejemplo de cómo activar RLS para lectura pública pero escritura privada:
/*
ALTER TABLE sociedad_deportes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de deportes" ON sociedad_deportes FOR SELECT USING (true);
CREATE POLICY "Solo admins modifican deportes" ON sociedad_deportes FOR ALL USING (auth.role() = 'authenticated');
*/
