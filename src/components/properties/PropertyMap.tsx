"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  lat?: number
  lng?: number
  title?: string
  className?: string
}

const defaultLat = -26.8083
const defaultLng = -65.2176

export default function PropertyMap({ lat, lng, title, className = "" }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current || !mapRef.current) return

    let L: typeof import("leaflet")
    let map: import("leaflet").Map | null = null

    async function init() {
      L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")

      if (!mapRef.current) return
      initialized.current = true

      const center: [number, number] = lat != null && lng != null ? [lat, lng] : [defaultLat, defaultLng]

      map = L.map(mapRef.current, {
        center,
        zoom: 14,
        scrollWheelZoom: false,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map)

      const icon = L.divIcon({
        html: '<div style="background:#f97316;color:white;padding:6px 10px;border-radius:12px;font-size:13px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.2)">📍 ' + (title ?? "Propiedad") + "</div>",
        className: "",
        iconSize: [0, 0],
        iconAnchor: [20, 40],
      })

      L.marker(center, { icon }).addTo(map)
    }

    init()

    return () => {
      if (map) {
        map.remove()
        initialized.current = false
      }
    }
  }, [lat, lng, title])

  return (
    <div className="space-y-3">
      <div ref={mapRef} className={`rounded-2xl overflow-hidden ${className || "h-64"}`} />
      <p className="text-xs text-slate-400 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        San Miguel de Tucumán, Tucumán, Argentina
      </p>
    </div>
  )
}
