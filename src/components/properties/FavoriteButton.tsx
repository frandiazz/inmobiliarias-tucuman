"use client"

import { Heart } from "lucide-react"
import { useFavorites } from "@/utils/favorites"

interface FavoriteButtonProps {
  propertyId: number
  className?: string
}

export default function FavoriteButton({ propertyId, className = "" }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavorites()
  const active = isFavorite(propertyId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(propertyId)
      }}
      className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all ${className}`}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          active ? "fill-red-500 text-red-500" : "text-slate-600"
        }`}
      />
    </button>
  )
}
