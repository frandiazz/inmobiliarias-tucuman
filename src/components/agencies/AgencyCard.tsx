"use client"

import { useRef, type MouseEvent } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface AgencyCardProps {
  name: string
  count: number
}

export default function AgencyCard({ name, count }: AgencyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("")

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col items-center text-center transition-shadow duration-300"
      style={{ transition: "transform 0.1s ease" }}
    >
      <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
        <span className="text-2xl font-bold text-teal-800">{initials}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-800">{name}</h3>

      <p className="mt-1.5 text-sm text-slate-500">
        {count} {count === 1 ? "propiedad publicada" : "propiedades publicadas"}
      </p>

      <div className="mt-auto pt-5 w-full">
        <Link
          href={`/inmobiliarias/${encodeURIComponent(name)}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-teal-800 text-teal-800 font-semibold hover:bg-teal-50 transition-colors"
        >
          Ver su catálogo
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
