"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Property } from "@/utils/types"
import AdminMapPicker from "./AdminMapPicker"
import ImageUploader from "./ImageUploader"
import GalleryUploader from "./GalleryUploader"

const zonas = [
  "Yerba Buena", "Barrio Norte", "Barrio Sur", "Tafí Viejo",
  "El Corte", "Lomas de Tafí", "San Pablo",
]

const tipos = ["Casa", "Departamento", "Dúplex", "Terreno"]
const estados = ["Excelente", "Muy bueno", "Bueno", "A refaccionar"]

interface PropertyFormProps {
  initial?: Property
  agencies: { id: number; name: string }[]
  onSubmit: (data: Record<string, unknown>) => Promise<void>
}

export default function PropertyForm({ initial, agencies, onSubmit }: PropertyFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    agencyId: initial?.agencyId ?? (agencies[0]?.id ?? 1),
    operation: initial?.operation ?? "Venta",
    price: initial?.price ?? "",
    beds: initial?.beds ?? 2,
    baths: initial?.baths ?? 1,
    area: initial?.area ?? 80,
    image: initial?.image ?? "",
    images: initial?.images ?? [],
    description: initial?.description ?? "",
    antiguedad: initial?.antiguedad ?? "",
    estado: initial?.estado ?? "Excelente",
    latitude: initial?.latitude ?? null,
    longitude: initial?.longitude ?? null,
    published: initial?.published ?? true,
    agency: initial?.agency ?? agencies[0]?.name ?? "",
  })

  const zona = zonas.find((z) => form.title.toLowerCase().includes(z.toLowerCase())) ?? ""
  const tipo = tipos.find((t) => form.title.toLowerCase().includes(t.toLowerCase())) ?? ""

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSubmit({
      ...form,
      zona,
      tipo,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
      images: form.images.filter((i) => i.trim() !== ""),
    })
    setSaving(false)
    router.push("/admin/propiedades")
    router.refresh()
  }

  function fillTitle(tipo: string, zona: string) {
    const dorm = tipo === "Terreno" ? 0 : form.beds
    const templates: Record<string, string[]> = {
      Casa: [`Casa de ${dorm} dormitorios en ${zona}`, `Casa en ${zona}`, `Casa familiar en ${zona}`],
      Departamento: [`Departamento en ${zona}`, `Departamento de ${Math.max(1, dorm)} ambientes en ${zona}`],
      Dúplex: [`Dúplex en ${zona}`, `Dúplex de ${dorm} dormitorios en ${zona}`],
      Terreno: [`Terreno en ${zona}`, `Lote en ${zona}`],
    }
    const opts = templates[tipo] ?? ["Propiedad en " + zona]
    update("title", opts[0])
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-3xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
          <select
            value={tipo ?? ""}
            onChange={(e) => {
              const t = e.target.value
              const zn = zonas.find((z) => form.title.includes(z)) ?? zonas[0]
              fillTitle(t, zn)
            }}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Seleccionar...</option>
            {tipos.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Zona</label>
          <select
            value={zona ?? ""}
            onChange={(e) => {
              const zn = e.target.value
              const tp = tipos.find((t) => form.title.includes(t)) ?? "Casa"
              fillTitle(tp, zn)
            }}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Seleccionar...</option>
            {zonas.map((z) => (<option key={z} value={z}>{z}</option>))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título de la propiedad</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Operación</label>
          <select
            value={form.operation}
            onChange={(e) => update("operation", e.target.value as "Venta" | "Alquiler")}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Agencia</label>
          <select
            value={form.agencyId}
            onChange={(e) => {
              const id = Number(e.target.value)
              const a = agencies.find((ag) => ag.id === id)
              setForm((f) => ({ ...f, agencyId: id, agency: a?.name ?? "" }))
            }}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {agencies.map((a) => (<option key={a.id} value={a.id}>{a.name}</option>))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Precio</label>
          <input
            type="text"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder={form.operation === "Venta" ? "USD 85.000" : "$ 45.000/mes"}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Dormitorios</label>
          <input
            type="number" value={form.beds} min="0"
            onChange={(e) => update("beds", Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Baños</label>
          <input
            type="number" value={form.baths} min="0"
            onChange={(e) => update("baths", Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Superficie (m²)</label>
          <input
            type="number" value={form.area} min="1"
            onChange={(e) => update("area", Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Antigüedad</label>
          <input
            type="text" value={form.antiguedad}
            onChange={(e) => update("antiguedad", e.target.value)}
            placeholder="Ej: 5 años"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
          <select
            value={form.estado}
            onChange={(e) => update("estado", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {estados.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Imagen principal</label>
        <ImageUploader
          value={form.image}
          onChange={(url) => update("image", url)}
          folder=""
          label="Subir imagen principal"
          rounded="xl"
          size={112}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Galería de imágenes</label>
        <GalleryUploader
          value={form.images}
          onChange={(urls) => update("images", urls)}
          folder=""
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Ubicación en el mapa</label>
        <AdminMapPicker
          lat={form.latitude}
          lng={form.longitude}
          onPick={(lat, lng) => {
            update("latitude", lat)
            update("longitude", lng)
          }}
        />
        <p className="mt-1 text-xs text-slate-400">
          {form.latitude && form.longitude
            ? `Lat: ${form.latitude.toFixed(5)} · Lng: ${form.longitude.toFixed(5)}`
            : "Hacé clic en el mapa para fijar la ubicación."}
        </p>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="w-4 h-4 accent-teal-700"
        />
        <span className="text-sm font-medium text-slate-700">Publicada (visible en el sitio)</span>
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors"
        >
          {saving ? "Guardando..." : initial ? "Guardar cambios" : "Crear propiedad"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
