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

  useEffect(() => {
    let map: import("leaflet").Map | null = null
    let cancelled = false

    async function init() {
      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")
      if (cancelled || !mapRef.current) return

      const center: [number, number] =
        lat != null && lng != null ? [lat, lng] : [defaultLat, defaultLng]

      map = L.map(mapRef.current, {
        center,
        zoom: lat != null && lng != null ? 15 : 12,
        scrollWheelZoom: true,
        zoomControl: true,
      })

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map)

      const pinSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38" fill="#0f766e" stroke="#ffffff" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.6" fill="#ffffff"/>
        </svg>`

      const icon = L.divIcon({
        html: `<div style="transform:translate(-50%,-100%)">${pinSvg}</div>`,
        className: "",
        iconSize: [38, 38],
        iconAnchor: [19, 38],
      })

      L.marker(center, { icon }).addTo(map)

      if (title) {
        L.tooltip({ permanent: true, direction: "top", offset: [0, -34], className: "map-pin-label" })
          .setLatLng(center)
          .setContent(title)
          .addTo(map)
      }

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
  }, [lat, lng, title])

  return (
    <div className="space-y-3">
      <div className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm ${className || "h-72"}`}>
        <div ref={mapRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute top-3 left-3 z-[400] flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
          📍 Mapa de la zona
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 z-[400] rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-[11px] text-slate-500 shadow-sm">
          Scroll para zoom · Arrastrá para mover
        </div>
      </div>
      <p className="text-xs text-slate-400 flex items-center gap-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-600" />
        {address ?? "San Miguel de Tucumán, Tucumán, Argentina"}
      </p>
    </div>
  )
}
