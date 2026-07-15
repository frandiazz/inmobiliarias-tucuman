"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bed, Bath, Ruler, ArrowLeft, Trash2, BarChart3 } from "lucide-react"
import { getCompareProperties } from "@/utils/compare"
import type { Property } from "@/utils/types"
import { useCompare } from "@/utils/compare"
import AnimatedSection from "@/components/ui/AnimatedSection"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import Loader from "@/components/ui/Loader"

function CompareRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(0,1fr))] gap-4 border-b border-gray-100 py-4">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      {children}
    </div>
  )
}

function Cell({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`text-sm ${highlight ? "text-teal-700 font-semibold" : "text-slate-700"}`}>
      {children}
    </div>
  )
}

export default function CompararPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const { toggle } = useCompare()

  useEffect(() => {
    getCompareProperties().then((data) => {
      setProperties(data)
      setLoading(false)
    })
  }, [])

  function removeItem(id: number) {
    toggle(id)
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  if (loading) return <Loader className="min-h-screen" />

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Propiedades", href: "/propiedades" },
            { label: "Comparar" },
          ]}
        />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Comparar propiedades</h1>
            <p className="mt-1 text-slate-500">
              {properties.length} {properties.length === 1 ? "propiedad seleccionada" : "propiedades seleccionadas"}
              {properties.length < 2 && " (seleccioná al menos 2)"}
            </p>
          </div>
          <Link
            href="/propiedades"
            className="flex items-center gap-2 text-sm text-teal-700 hover:text-teal-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a propiedades
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-24">
            <BarChart3 className="w-16 h-16 mx-auto text-slate-200" />
            <h2 className="mt-4 text-xl font-semibold text-slate-600">
              No seleccionaste propiedades para comparar
            </h2>
            <p className="mt-2 text-slate-400">
              Hacé clic en &ldquo;Comparar&rdquo; en cualquier propiedad para agregarla acá (máx 4).
            </p>
            <Link
              href="/propiedades"
              className="btn-pill"
            >
              Explorar propiedades
            </Link>
          </div>
        ) : (
          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
            <div className="min-w-[600px] p-6">
              <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(0,1fr))] gap-4 mb-6">
                <div />
                {properties.map((p) => (
                  <div key={p.id} className="relative">
                    <button
                      onClick={() => removeItem(p.id)}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors z-10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100 mb-3">
                      <Image src={p.image} alt={p.title} fill className="object-cover" sizes="250px" />
                    </div>
                    <p className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">{p.title}</p>
                    <p className="mt-1 text-lg font-bold text-teal-800">{p.price}</p>
                  </div>
                ))}
              </div>

              <CompareRow label="Operación">
                {properties.map((p) => (
                  <Cell key={p.id}>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${p.operation === "Venta" ? "bg-teal-100 text-teal-800" : "bg-teal-100 text-teal-600"}`}>
                      {p.operation}
                    </span>
                  </Cell>
                ))}
              </CompareRow>

              <CompareRow label="Agencia">
                {properties.map((p) => (
                  <Cell key={p.id}>{p.agency}</Cell>
                ))}
              </CompareRow>

              <CompareRow label="Dormitorios">
                {properties.map((p) => (
                  <Cell key={p.id} highlight={p.beds === Math.max(...properties.map((x) => x.beds))}>
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4" /> {p.beds}
                    </span>
                  </Cell>
                ))}
              </CompareRow>

              <CompareRow label="Baños">
                {properties.map((p) => (
                  <Cell key={p.id} highlight={p.baths === Math.max(...properties.map((x) => x.baths))}>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4" /> {p.baths}
                    </span>
                  </Cell>
                ))}
              </CompareRow>

              <CompareRow label="Superficie">
                {properties.map((p) => (
                  <Cell key={p.id} highlight={p.area === Math.max(...properties.map((x) => x.area))}>
                    <span className="flex items-center gap-1.5">
                      <Ruler className="w-4 h-4" /> {p.area} m²
                    </span>
                  </Cell>
                ))}
              </CompareRow>

              {properties.length >= 2 && (
                <CompareRow label="Mejor precio">
                  {(() => {
                    const prices = properties.map((p) => {
                      const num = parseFloat(p.price.replace(/[^0-9]/g, ""))
                      return { id: p.id, num }
                    })
                    const best = prices.reduce((a, b) => (a.num < b.num ? a : b))
                    return properties.map((p) => (
                      <Cell key={p.id} highlight={p.id === best.id}>
                        {p.id === best.id ? "✓ Mejor precio" : p.price}
                      </Cell>
                    ))
                  })()}
                </CompareRow>
              )}

              <CompareRow label=" ">
                {properties.map((p) => (
                  <div key={p.id} className="mt-2">
                    <Link
                      href={`/propiedades/${p.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                      Ver detalle
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                    </Link>
                  </div>
                ))}
              </CompareRow>
            </div>
          </div>
          </AnimatedSection>
        )}
      </div>
    </main>
  )
}
