"use client"

import { useEffect, useRef } from "react"

interface AdminMapPickerProps {
  lat?: number | null
  lng?: number | null
  onPick: (lat: number, lng: number) => void
}

const defaultLat = -26.8083
const defaultLng = -65.2176

export default function AdminMapPicker({ lat, lng, onPick }: AdminMapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<import("leaflet").Map | null>(null)
  const markerRef = useRef<import("leaflet").Marker | null>(null)
  const onPickRef = useRef(onPick)
  onPickRef.current = onPick

  useEffect(() => {
    let cancelled = false
    let map: import("leaflet").Map | null = null

    async function init() {
      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")
      if (cancelled || !mapRef.current) return

      const startLat = lat ?? defaultLat
      const startLng = lng ?? defaultLng

      map = L.map(mapRef.current, { center: [startLat, startLng], zoom: 13 })
      const m = map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(m)

      const pin = L.divIcon({
        html: `<div style="width:18px;height:18px;border-radius:50%;background:#0f766e;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
        className: "",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      if (lat != null && lng != null) {
        markerRef.current = L.marker([lat, lng], { icon: pin }).addTo(m)
      }

      m.on("click", (e: any) => {
        const { lat: la, lng: ln } = e.latlng
        if (markerRef.current) {
          markerRef.current.setLatLng([la, ln])
        } else {
          markerRef.current = L.marker([la, ln], { icon: pin }).addTo(m)
        }
        onPickRef.current(la, ln)
      })

      mapInstance.current = map
      setTimeout(() => map?.invalidateSize(), 200)
    }

    init()
    return () => {
      cancelled = true
      map?.remove()
      mapInstance.current = null
      markerRef.current = null
    }
  }, [])

  return (
    <div className="relative">
      <div ref={mapRef} className="h-64 w-full rounded-xl overflow-hidden border border-gray-200" />
      <p className="absolute bottom-2 right-2 z-[400] rounded-full bg-white/90 px-3 py-1 text-[11px] text-slate-500 shadow-sm pointer-events-none">
        Clic para ubicar
      </p>
    </div>
  )
}
