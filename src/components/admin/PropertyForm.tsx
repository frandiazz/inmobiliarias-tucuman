"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Property } from "@/utils/types"

const zonas = [
  "Yerba Buena", "Barrio Norte", "Barrio Sur", "Tafí Viejo",
  "El Corte", "Lomas de Tafí", "San Pablo",
]

const tipos = ["Casa", "Departamento", "Dúplex", "Terreno"]

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
    agency: initial?.agency ?? agencies[0]?.name ?? "",
  })

  const zona = zonas.find((z) => form.title.toLowerCase().includes(z.toLowerCase())) ?? ""
  const tipo = tipos.find((t) => form.title.toLowerCase().includes(t.toLowerCase())) ?? ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSubmit({
      ...form,
      zona,
      tipo,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
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
    setForm((f) => ({ ...f, title: opts[0] }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
      <div className="space-y-6">
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
              {tipos.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
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
              {zonas.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Título de la propiedad</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Operación</label>
            <select
              value={form.operation}
              onChange={(e) => setForm((f) => ({ ...f, operation: e.target.value as "Venta" | "Alquiler" }))}
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
              {agencies.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Precio</label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder={form.operation === "Venta" ? "USD 85.000" : "$ 45.000/mes"}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dormitorios</label>
            <input
              type="number"
              value={form.beds}
              onChange={(e) => setForm((f) => ({ ...f, beds: Number(e.target.value) }))}
              min="0"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Baños</label>
            <input
              type="number"
              value={form.baths}
              onChange={(e) => setForm((f) => ({ ...f, baths: Number(e.target.value) }))}
              min="0"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Superficie (m²)</label>
            <input
              type="number"
              value={form.area}
              onChange={(e) => setForm((f) => ({ ...f, area: Number(e.target.value) }))}
              min="1"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL de imagen</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-colors"
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
