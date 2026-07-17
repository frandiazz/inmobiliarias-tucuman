import { supabase } from "./supabase"

const BUCKET = "propiedades"

function sanitizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 80)
}

export async function uploadImage(file: File, folder = ""): Promise<string | null> {
  if (!file || file.size === 0) return null
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg"
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const path = folder ? `${folder}/${unique}.${ext}` : `${unique}.${ext}`

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false })

  if (error) {
    console.error("uploadImage error:", error.message)
    return null
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
  return urlData.publicUrl
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const parts = url.split(`/${BUCKET}/`)
    if (parts.length < 2) return
    const path = parts[1].split("?")[0]
    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    /* ignore */
  }
}
