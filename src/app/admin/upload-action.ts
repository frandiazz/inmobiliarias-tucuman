"use server"

import { uploadImage, deleteImage } from "@/lib/storage"

export async function uploadImageAction(formData: FormData): Promise<{ url: string | null; error?: string }> {
  const file = formData.get("file") as File | null
  const folder = (formData.get("folder") as string) || ""
  if (!file || file.size === 0) return { url: null, error: "Sin archivo" }
  const url = await uploadImage(file, folder)
  return { url, error: url ? undefined : "No se pudo subir" }
}

export async function deleteImageAction(url: string): Promise<void> {
  await deleteImage(url)
}
