"use client"

import { useEffect, useRef } from "react"

interface PropertyMapProps {
  lat?: number
  lng?: number
  title?: string
  address?: string
  className?: string
}

const defaultLat = -26.8083
const defaultLng = -65.2176

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

      const center: [number, number] = hasCoords ? [lat!, lng!] : [defaultLat, defaultLng]

      map = L.map(mapRef.current, {
        center,
        zoom: hasCoords ? 15 : 12,
        scrollWheelZoom: true,
        zoomControl: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      const pinSvg = `
        <div style="position:relative;transform:translate(-50%,-100%)">
          <span class="map-pin-pulse"></span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#0f766e" stroke="#ffffff" stroke-width="1.5" style="filter:drop-shadow(0 4px 6px rgba(0,0,0,0.25))">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.6" fill="#ffffff"/>
          </svg>
        </div>`

      const icon = L.divIcon({
        html: pinSvg,
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      })

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
  }, [lat, lng, title, hasCoords])

  return (
    <div className="space-y-3">
      <div className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm ${className || "h-72"}`}>
        <div ref={mapRef} className="absolute inset-0" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-600" />
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
