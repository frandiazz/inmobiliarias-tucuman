"use client"

import { useRef, useState } from "react"
import { Upload, Loader2, X } from "lucide-react"
import { uploadImageAction, deleteImageAction } from "@/app/admin/upload-action"

interface ImageUploaderProps {
  value?: string
  onChange?: (url: string) => void
  folder?: string
  label?: string
  rounded?: "full" | "xl"
  size?: number
  className?: string
  inputName?: string
}

export default function ImageUploader({
  value = "",
  onChange,
  folder = "",
  label = "Subir imagen",
  rounded = "xl",
  size = 96,
  className = "",
  inputName,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [current, setCurrent] = useState(value ?? "")

  function setUrl(url: string) {
    setCurrent(url)
    if (hiddenRef.current) hiddenRef.current.value = url
    onChange?.(url)
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("folder", folder)
    const res = await uploadImageAction(fd)
    setUploading(false)
    if (res.url) {
      if (current) await deleteImageAction(current)
      setUrl(res.url)
    } else {
      setError(res.error || "No se pudo subir. Intentá de nuevo.")
    }
    if (inputRef.current) inputRef.current.value = ""
  }

  const isAvatar = rounded === "full"

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className={`relative overflow-hidden border border-gray-200 bg-slate-100 flex items-center justify-center ${
          isAvatar ? "rounded-full" : "rounded-xl"
        }`}
        style={{ width: size, height: size }}
      >
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-slate-400 text-center px-2">Sin imagen</span>
        )}
        {current && (
          <button
            type="button"
            onClick={async () => {
              await deleteImageAction(current)
              setUrl("")
            }}
            className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
            aria-label="Quitar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Subiendo..." : label}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      {inputName && (
        <input ref={hiddenRef} type="hidden" name={inputName} defaultValue={current} />
      )}
    </div>
  )
}
