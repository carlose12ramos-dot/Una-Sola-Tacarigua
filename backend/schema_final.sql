-- ==========================================
-- SCRIPT DE INICIALIZACIÓN - TACARIGUA DIGITAL (12 TABLAS)
-- ==========================================

-- 1. SISTEMA BASE Y ADMINISTRACIÓN
CREATE TABLE IF NOT EXISTS admin_usuarios (
    id            SERIAL PRIMARY KEY,
    nombre        VARCHAR(150) NOT NULL,
    correo        VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    activo        BOOLEAN DEFAULT TRUE,
    telefono      VARCHAR(50),
    biografia     TEXT,
    creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP
);

-- 2. HISTORIA
CREATE TABLE IF NOT EXISTS historia_hitos (
    id          SERIAL PRIMARY KEY,
    anio        VARCHAR(30) NOT NULL,
    titulo      VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    tag         VARCHAR(100),
    imagen      VARCHAR(255),
    fuente      VARCHAR(255),
    orden       INT DEFAULT 0,
    activo      BOOLEAN DEFAULT TRUE,
    creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CULTURA: CULTORES
CREATE TABLE IF NOT EXISTS cultores (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    disciplina  VARCHAR(150) NOT NULL,
    especialidad VARCHAR(200),
    localidad   VARCHAR(150),
    anios       VARCHAR(100),
    bandera     VARCHAR(10) DEFAULT '🇻🇪',
    imagen      VARCHAR(255),
    descripcion JSONB,
    activo      BOOLEAN DEFAULT TRUE,
    orden       INT DEFAULT 0,
    creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. CULTURA: COSTUMBRES
CREATE TABLE IF NOT EXISTS cultura_costumbres (
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

-- 5. CULTURA: GASTRONOMÍA
CREATE TABLE IF NOT EXISTS cultura_gastronomia (
    id           SERIAL PRIMARY KEY,
    nombre       VARCHAR(200) NOT NULL,
    descripcion  TEXT NOT NULL,
    ingredientes JSONB,
    imagen       VARCHAR(255),
    activo       BOOLEAN DEFAULT TRUE,
    orden        INT DEFAULT 0,
    creado_en    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. CULTURA: CENTROS CULTURALES
CREATE TABLE IF NOT EXISTS cultura_centros (
    id              SERIAL PRIMARY KEY,
    titulo          VARCHAR(200) NOT NULL,
    subtitulo       VARCHAR(200),
    resumen         TEXT NOT NULL,
    contenido_html  TEXT,
    imagen          VARCHAR(255),
    imagen_logo     VARCHAR(255),
    activo          BOOLEAN DEFAULT TRUE,
    orden           INT DEFAULT 0,
    creado_en       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. SOCIEDAD: EDUCACIÓN
CREATE TABLE IF NOT EXISTS sociedad_educacion (
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

-- 8. SOCIEDAD: SANIDAD
CREATE TABLE IF NOT EXISTS sociedad_sanidad (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    tipo        VARCHAR(100),
    direccion   TEXT,
    horarios    VARCHAR(200),
    servicios   JSONB,
    telefono    VARCHAR(50),
    imagen      VARCHAR(255),
    activo      BOOLEAN DEFAULT TRUE,
    orden       INT DEFAULT 0,
    creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. SOCIEDAD: DEPORTES
CREATE TABLE IF NOT EXISTS sociedad_deportes (
    id               SERIAL PRIMARY KEY,
    disciplina       VARCHAR(150) NOT NULL,
    icono            VARCHAR(10),
    color_hex        VARCHAR(20),
    descripcion      TEXT NOT NULL,
    hitos_destacados JSONB,
    activo           BOOLEAN DEFAULT TRUE,
    orden            INT DEFAULT 0,
    creado_en        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. BIBLIOTECA
CREATE TABLE IF NOT EXISTS biblioteca_items (
    id             SERIAL PRIMARY KEY,
    titulo         VARCHAR(300) NOT NULL,
    autor          VARCHAR(200) DEFAULT 'Autor local',
    categoria      VARCHAR(100) NOT NULL,
    formato        VARCHAR(50) NOT NULL,
    url            VARCHAR(500),
    imagen         VARCHAR(500),
    extra          VARCHAR(100),
    canciones      JSONB,
    activo         BOOLEAN DEFAULT TRUE,
    orden          INT DEFAULT 0,
    creado_en      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. CALENDARIO
CREATE TABLE IF NOT EXISTS calendario_efemerides (
    id          SERIAL PRIMARY KEY,
    dia         SMALLINT NOT NULL CHECK (dia BETWEEN 1 AND 31),
    mes         SMALLINT NOT NULL CHECK (mes BETWEEN 1 AND 12),
    tipo        VARCHAR(20) NOT NULL CHECK (tipo IN ('historia', 'natalicio', 'religiosa', 'cultural', 'duelo')),
    titulo      VARCHAR(300) NOT NULL,
    descripcion TEXT NOT NULL,
    activo      BOOLEAN DEFAULT TRUE,
    creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_efemerides_fecha ON calendario_efemerides (mes, dia);

-- 12. HOME CARDS
CREATE TABLE IF NOT EXISTS home_cards (
    id          SERIAL PRIMARY KEY,
    tipo        VARCHAR(50),
    titulo      VARCHAR(300) NOT NULL,
    descripcion TEXT NOT NULL,
    detalle     TEXT,
    info        JSONB,
    imagen      VARCHAR(255),
    modal_images JSONB,
    activo      BOOLEAN DEFAULT TRUE,
    orden       INT DEFAULT 0,
    creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. SOCIEDAD: MEDICINA TRADICIONAL
CREATE TABLE IF NOT EXISTS sociedad_medicina_trad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    icono VARCHAR(10) DEFAULT '🌿',
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. SOCIEDAD: EDUCACIÓN HITOS
CREATE TABLE IF NOT EXISTS sociedad_educacion_hitos (
    id SERIAL PRIMARY KEY,
    anio VARCHAR(20) NOT NULL,
    evento TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. SOCIEDAD: EDUCADORES
CREATE TABLE IF NOT EXISTS sociedad_educadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    apodo VARCHAR(150),
    imagen VARCHAR(255),
    descripcion TEXT NOT NULL,
    detalles_html TEXT,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 16. SOCIEDAD: PERSONAJES
CREATE TABLE IF NOT EXISTS sociedad_personajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    resumen TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 17. NOSOTROS: FEATURES (Módulos)
CREATE TABLE IF NOT EXISTS nosotros_features (
    id SERIAL PRIMARY KEY,
    icono VARCHAR(10) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 18. NOSOTROS: VALORES
CREATE TABLE IF NOT EXISTS nosotros_valores (
    id SERIAL PRIMARY KEY,
    icono VARCHAR(10) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 19. NOSOTROS: STATS
CREATE TABLE IF NOT EXISTS nosotros_stats (
    id SERIAL PRIMARY KEY,
    icono VARCHAR(10) NOT NULL,
    label VARCHAR(100) NOT NULL,
    valor VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 20. NOSOTROS: MISIÓN / VISIÓN
CREATE TABLE IF NOT EXISTS nosotros_mision_vision (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    contenido TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 21. HISTORIA: SECCIONES
CREATE TABLE IF NOT EXISTS historia_secciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 22. HISTORIA: VIDEOS
CREATE TABLE IF NOT EXISTS historia_videos (
    id SERIAL PRIMARY KEY,
    src VARCHAR(255) NOT NULL,
    titulo VARCHAR(200),
    caption TEXT,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 23. HISTORIA: DOCUMENTOS LEGALES
CREATE TABLE IF NOT EXISTS historia_documentos (
    id SERIAL PRIMARY KEY,
    src VARCHAR(255) NOT NULL,
    full_src VARCHAR(255),
    alt VARCHAR(200),
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 24. HISTORIA: FEATURES
CREATE TABLE IF NOT EXISTS historia_features (
    id SERIAL PRIMARY KEY,
    icono_nombre VARCHAR(50) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 25. HISTORIA: DATOS RÁPIDOS
CREATE TABLE IF NOT EXISTS historia_datos_rapidos (
    id SERIAL PRIMARY KEY,
    icono_nombre VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    texto TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 26. HOME: FEATURED
CREATE TABLE IF NOT EXISTS home_featured (
    id SERIAL PRIMARY KEY,
    path VARCHAR(100) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    icono_nombre VARCHAR(50) NOT NULL,
    imagen_src VARCHAR(255),
    imagen_fallback VARCHAR(255),
    imagen_alt VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar administrador por defecto (password = admin123)
-- bcrypt hash para 'admin123' => $2a$10$Y145s73G355Uu10Z3vV.M.2N0H/3uM7DqEaR94yH/V0R9O696Z3jG
INSERT INTO admin_usuarios (nombre, correo, password_hash)
VALUES ('Administrador Principal', 'carlos@tacarigua.org', '$2a$10$Y145s73G355Uu10Z3vV.M.2N0H/3uM7DqEaR94yH/V0R9O696Z3jG')
ON CONFLICT (correo) DO NOTHING;
