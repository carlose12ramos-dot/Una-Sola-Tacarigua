-- Migration: Agregar teléfono y biografía a tablas de usuarios
-- Ejecutar con: psql -U postgres -d tacarigua -f backend/migrations/001_add_profile_fields.sql

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS telefono VARCHAR(50);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS biografia TEXT;

ALTER TABLE admin_usuarios ADD COLUMN IF NOT EXISTS telefono VARCHAR(50);
ALTER TABLE admin_usuarios ADD COLUMN IF NOT EXISTS biografia TEXT;
