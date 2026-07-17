"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setSelected((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setSelected((i) => (i === images.length - 1 ? 0 : i + 1))

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightbox])

  if (images.length === 0) return null

  const main = images[selected]
  const thumbs = images.filter((_, i) => i !== selected).slice(0, 3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:h-[480px]">
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative h-72 lg:h-full lg:col-span-2 rounded-2xl overflow-hidden bg-slate-100 block group cursor-zoom-in"
      >
        <Image src={main} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 1024px) 100vw, 66vw" />
        <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors" aria-label="Anterior">
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors" aria-label="Siguiente">
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </button>

      <div className="hidden lg:flex flex-col gap-3 h-full">
        {thumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(images.indexOf(src))}
            className="relative flex-1 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-transparent hover:ring-teal-500 transition-all"
          >
            <Image src={src} alt={`${title} - vista ${i + 2}`} fill className="object-cover" sizes="33vw" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full" aria-label="Cerrar">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full" aria-label="Anterior">
            <ChevronLeft className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={main}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full" aria-label="Siguiente">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}
