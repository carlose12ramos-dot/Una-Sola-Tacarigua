-- ==========================================
-- NUEVAS TABLAS - HERO, GEOGRAFÍA, MAPA, SOCIEDAD SANIDAD HITOS
-- ==========================================

-- 1. HOME: HERO SLIDES
CREATE TABLE IF NOT EXISTS home_hero_slides (
    id SERIAL PRIMARY KEY,
    image_key VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    subtitle TEXT,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. GEOGRAFÍA: SECTORES
CREATE TABLE IF NOT EXISTS geografia_sectores (
    id SERIAL PRIMARY KEY,
    icono VARCHAR(10),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. GEOGRAFÍA: CENSOS
CREATE TABLE IF NOT EXISTS geografia_censos (
    id SERIAL PRIMARY KEY,
    year VARCHAR(20) NOT NULL,
    housing VARCHAR(50),
    population VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. GEOGRAFÍA: HIGHLIGHTS
CREATE TABLE IF NOT EXISTS geografia_highlights (
    id SERIAL PRIMARY KEY,
    icono VARCHAR(10),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. MAPA: LUGARES
CREATE TABLE IF NOT EXISTS mapa_lugares (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    lat DECIMAL(10,7) NOT NULL,
    lng DECIMAL(10,7) NOT NULL,
    category VARCHAR(50),
    vicinity TEXT,
    editorial_summary TEXT,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. SOCIEDAD: SANIDAD HITOS
CREATE TABLE IF NOT EXISTS sociedad_sanidad_hitos (
    id SERIAL PRIMARY KEY,
    periodo VARCHAR(100) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    icono VARCHAR(10),
    resumen TEXT,
    contenido_html TEXT,
    imagen VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
