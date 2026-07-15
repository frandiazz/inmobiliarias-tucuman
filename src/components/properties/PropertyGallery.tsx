"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selected, setSelected] = useState(0)

  const prev = () => setSelected((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setSelected((i) => (i === images.length - 1 ? 0 : i + 1))

  if (images.length === 0) return null

  const main = images[selected]
  const thumbs = images.filter((_, i) => i !== selected).slice(0, 3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:h-[480px]">
      <div className="relative h-72 lg:h-full lg:col-span-2 rounded-2xl overflow-hidden bg-slate-100">
        <Image src={main} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors" aria-label="Anterior">
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors" aria-label="Siguiente">
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

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
    </div>
  )
}
