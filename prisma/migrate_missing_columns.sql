-- Migración: agrega las columnas que el código usa pero faltan en la tabla properties de Supabase.
-- Idempotente: no falla si la columna ya existe.
-- Ejecutá este script en el SQL Editor de Supabase (Dashboard -> SQL -> New query).

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'images'
  ) THEN
    ALTER TABLE "properties" ADD COLUMN "images" TEXT[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'description'
  ) THEN
    ALTER TABLE "properties" ADD COLUMN "description" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'latitude'
  ) THEN
    ALTER TABLE "properties" ADD COLUMN "latitude" DOUBLE PRECISION;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'longitude'
  ) THEN
    ALTER TABLE "properties" ADD COLUMN "longitude" DOUBLE PRECISION;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'antiguedad'
  ) THEN
    ALTER TABLE "properties" ADD COLUMN "antiguedad" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'estado'
  ) THEN
    ALTER TABLE "properties" ADD COLUMN "estado" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'published'
  ) THEN
    ALTER TABLE "properties" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT true;
  END IF;
END $$;

-- Verificación (debería listar las columnas nuevas):
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'properties' ORDER BY ordinal_position;
