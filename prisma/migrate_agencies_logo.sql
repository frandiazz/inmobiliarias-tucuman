-- Migración: agrega logo_url a la tabla agencies.
-- Idempotente: no falla si la columna ya existe.
-- Ejecutá en Supabase -> SQL Editor -> Run.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'agencies' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE "agencies" ADD COLUMN "logo_url" TEXT;
  END IF;
END $$;
