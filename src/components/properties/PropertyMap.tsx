"use client"

import { useEffect, useRef } from "react"
import { TUCUMAN_CENTER, addGoogleTiles, createPinIcon } from "@/lib/mapConfig"

interface PropertyMapProps {
  lat?: number
  lng?: number
  title?: string
  address?: string
  className?: string
}

export default function PropertyMap({ lat, lng, title, address, className = "" }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  const hasCoords = lat != null && lng != null
  const mapsHref = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address ?? "San Miguel de Tucuman, Tucuman, Argentina")}`

  useEffect(() => {
    let map: import("leaflet").Map | null = null
    let cancelled = false

    async function init() {
      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")
      if (cancelled || !mapRef.current) return

      const center: [number, number] = hasCoords ? [lat!, lng!] : TUCUMAN_CENTER

      map = L.map(mapRef.current, {
        center,
        zoom: hasCoords ? 16 : 12,
        scrollWheelZoom: true,
        zoomControl: true,
      })

      addGoogleTiles(L, map)

      const icon = createPinIcon(L)
      L.marker(center, { icon }).addTo(map)

      setTimeout(() => map?.invalidateSize(), 200)
    }

    init()

    return () => {
      cancelled = true
      if (map) {
        map.remove()
        map = null
      }
    }
  }, [lat, lng, hasCoords])

  return (
    <div className="space-y-3">
      <div className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm ${className || "h-72"}`}>
        <div ref={mapRef} className="absolute inset-0" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
          {address ?? "San Miguel de Tucumán, Tucumán, Argentina"}
        </p>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-teal-700 hover:text-teal-800 transition-colors shrink-0"
        >
          Abrir en Google Maps ↗
        </a>
      </div>
    </div>
  )
}
