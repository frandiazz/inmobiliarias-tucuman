import type { Map as LeafletMap, DivIcon } from "leaflet"

export const TUCUMAN_CENTER: [number, number] = [-26.8083, -65.2176]

export const googleRoadmapTiles = {
  url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  attribution:
    '&copy; <a href="https://www.google.com/maps">Google</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 20,
}

export function createPinIcon(L: typeof import("leaflet")): DivIcon {
  const html = `
    <div style="position:relative;width:34px;height:46px;">
      <span class="map-pin-pulse"></span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="46" fill="#ea4335" stroke="#ffffff" stroke-width="1.4" style="filter:drop-shadow(0 4px 6px rgba(0,0,0,0.3))">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.6" fill="#ffffff"/>
      </svg>
    </div>`
  return L.divIcon({
    html,
    className: "",
    iconSize: [34, 46],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  })
}

export function addGoogleTiles(L: typeof import("leaflet"), map: LeafletMap) {
  L.tileLayer(googleRoadmapTiles.url, {
    attribution: googleRoadmapTiles.attribution,
    maxZoom: googleRoadmapTiles.maxZoom,
  }).addTo(map)
}
