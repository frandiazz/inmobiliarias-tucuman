"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { getFavoriteProperties } from "@/utils/favorites"
import PropertyCard from "@/components/properties/PropertyCard"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import Loader from "@/components/ui/Loader"

function getCutoff() {
  return Date.now() - 7 * 24 * 60 * 60 * 1000
}

export default function FavoritosPage() {
  const [properties, setProperties] = useState<ReturnType<typeof getFavoriteProperties>>([])
  const [newCutoff] = useState(getCutoff)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => {
        setProperties(getFavoriteProperties(data))
        setLoading(false)
      })
  }, [])

  if (loading) return <Loader className="min-h-screen" />

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Favoritos" },
          ]}
        />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Mis favoritos</h1>
            <p className="mt-1 text-slate-500">
              {properties.length} {properties.length === 1 ? "propiedad guardada" : "propiedades guardadas"}
            </p>
          </div>
          {properties.length > 0 && (
            <Link
              href="/propiedades"
              className="text-sm text-teal-700 hover:text-teal-800 font-medium"
            >
              Explorar propiedades →
            </Link>
          )}
        </div>

        {!loading && properties.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 mx-auto text-slate-200" />
            <h2 className="mt-4 text-xl font-semibold text-slate-600">
              No tenés propiedades guardadas
            </h2>
            <p className="mt-2 text-slate-400">
              Hacé clic en el corazón de cualquier propiedad para guardarla acá.
            </p>
            <Link
              href="/propiedades"
              className="mt-6 inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Ver propiedades
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} isNew={new Date(p.createdAt).getTime() > newCutoff} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
