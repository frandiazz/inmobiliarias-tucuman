-- Storage: crea el bucket "propiedades" y politicas para subida/lectura publica.
-- Ejecutalo en Supabase -> SQL Editor -> Run.
-- Nota: tambien podes crear el bucket desde Storage -> New bucket (nombre: propiedades, public: ON).

-- 1) Crear el bucket (publico)
insert into storage.buckets (id, name, public)
values ('propiedades', 'propiedades', true)
on conflict (id) do update set public = true;

-- 2) Politica de LECTURA publica (cualquiera puede ver las imagenes)
drop policy if exists "Public read propiedades" on storage.objects;
create policy "Public read propiedades"
  on storage.objects for select
  using ( bucket_id = 'propiedades' );

-- 3) Politica de SUBIDA (anon puede insertar en el bucket propiedades)
drop policy if exists "Anon insert propiedades" on storage.objects;
create policy "Anon insert propiedades"
  on storage.objects for insert
  to anon, authenticated
  with check ( bucket_id = 'propiedades' );

-- 4) Politica de BORRADO (authenticated puede borrar sus objetos)
drop policy if exists "Anon delete propiedades" on storage.objects;
create policy "Anon delete propiedades"
  on storage.objects for delete
  to anon, authenticated
  using ( bucket_id = 'propiedades' );
