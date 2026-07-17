"use client"

import { useRef, useState } from "react"
import { Upload, Loader2, X } from "lucide-react"
import { uploadImage, deleteImage } from "@/lib/storage"

interface GalleryUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  folder?: string
}

export default function GalleryUploader({ value, onChange, folder = "" }: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    setUploading(true)
    const uploaded: string[] = []
    for (const file of files) {
      const url = await uploadImage(file, folder)
      if (url) uploaded.push(url)
    }
    setUploading(false)
    if (uploaded.length) onChange([...value, ...uploaded])
    if (inputRef.current) inputRef.current.value = ""
  }

  async function remove(url: string) {
    await deleteImage(url)
    onChange(value.filter((u) => u !== url))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {value.filter((i) => i.trim()).map((img, i) => (
          <div key={i} className="relative w-24 h-20 rounded-lg overflow-hidden border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(img)}
              className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
              aria-label="Quitar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 hover:border-teal-500 text-slate-600 text-sm font-medium rounded-xl transition-colors"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? "Subiendo..." : "Agregar imágenes"}
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
    </div>
  )
}
