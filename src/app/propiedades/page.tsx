import type { Metadata } from "next"
import { getProperties } from "@/lib/db"
import PropertyCard from "@/components/properties/PropertyCard"
import { SlidersHorizontal, X, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

const PAGE_SIZE = 9
const newCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, ""))
}

export const metadata: Metadata = {
  title: "Propiedades en Tucumán",
  description: "Explorá casas, departamentos, terrenos y dúplex en venta y alquiler en toda la provincia de Tucumán.",
  openGraph: {
    title: "Propiedades en Tucumán | Tucumán Inmuebles",
    description: "Explorá casas, departamentos, terrenos y dúplex en venta y alquiler en toda la provincia de Tucumán.",
  },
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const operacion = typeof params.operacion === "string" ? params.operacion : ""
  const tipo = typeof params.tipo === "string" ? params.tipo : ""
  const ubicacion = typeof params.ubicacion === "string" ? params.ubicacion : ""
  const q = typeof params.q === "string" ? params.q : ""
  const precioMin = typeof params.precio_min === "string" ? Number(params.precio_min) : 0
  const precioMax = typeof params.precio_max === "string" ? Number(params.precio_max) : 0
  const dorm = typeof params.dorm === "string" ? Number(params.dorm) : 0
  const banios = typeof params.banios === "string" ? Number(params.banios) : 0
  const orden = typeof params.orden === "string" ? params.orden : "reciente"
  const pagina = typeof params.pagina === "string" ? Math.max(1, Number(params.pagina)) : 1

  const allProperties = await getProperties()
  let filtered = [...allProperties]

  if (operacion) {
    filtered = filtered.filter((p) => p.operation.toLowerCase() === operacion)
  }

  if (tipo) {
    filtered = filtered.filter((p) => normalize(p.tipo).includes(tipo))
  }

  if (ubicacion) {
    filtered = filtered.filter((p) => normalize(p.zona).includes(normalize(ubicacion)))
  }

  if (q) {
    const qn = normalize(q)
    filtered = filtered.filter(
      (p) => normalize(p.title).includes(qn) || normalize(p.agency).includes(qn)
    )
  }

  if (precioMin > 0) {
    filtered = filtered.filter((p) => parsePrice(p.price) >= precioMin)
  }
  if (precioMax > 0) {
    filtered = filtered.filter((p) => parsePrice(p.price) <= precioMax)
  }

  if (dorm > 0) {
    filtered = filtered.filter((p) => p.beds >= dorm)
  }
  if (banios > 0) {
    filtered = filtered.filter((p) => p.baths >= banios)
  }

  if (orden === "precio_asc") {
    filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
  } else if (orden === "precio_desc") {
    filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const currentPage = Math.min(pagina, totalPages || 1)
  const start = (currentPage - 1) * PAGE_SIZE
  const pageItems = filtered.slice(start, start + PAGE_SIZE)

  function buildHref(overrides: Record<string, string | undefined>) {
    const next: Record<string, string> = {}
    if (operacion) next.operacion = operacion
    if (tipo) next.tipo = tipo
    if (ubicacion) next.ubicacion = ubicacion
    if (q) next.q = q
    if (precioMin > 0) next.precio_min = String(precioMin)
    if (precioMax > 0) next.precio_max = String(precioMax)
    if (dorm > 0) next.dorm = String(dorm)
    if (banios > 0) next.banios = String(banios)
    if (orden && orden !== "reciente") next.orden = orden
    if (currentPage > 1) next.pagina = String(currentPage)
    Object.assign(next, overrides)
    const qs = new URLSearchParams(next).toString()
    return `/propiedades${qs ? `?${qs}` : ""}`
  }

  const hasFilters = operacion || tipo || ubicacion || q || precioMin > 0 || precioMax > 0 || dorm > 0 || banios > 0

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Propiedades" },
          ]}
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Propiedades en Tucumán
            </h1>
            <p className="mt-1 text-slate-500">
              {total} {total === 1 ? "resultado encontrado" : "resultados encontrados"}
            </p>
          </div>
          <Link
            href="/propiedades"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              hasFilters
                ? "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                : "bg-white border-gray-200 text-slate-600"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {hasFilters ? "Limpiar filtros" : "Todos los filtros"}
          </Link>
        </div>

          <details className="mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <summary className="flex items-center gap-2 px-4 sm:px-6 py-4 cursor-pointer text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              Filtros avanzados
            </summary>
            <form method="GET" action="/propiedades" className="px-4 sm:px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <input type="hidden" name="operacion" value={operacion} />
            <input type="hidden" name="tipo" value={tipo} />
            <input type="hidden" name="ubicacion" value={ubicacion} />
            <input type="hidden" name="q" value={q} />
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Precio mínimo</label>
              <select name="precio_min" defaultValue={precioMin} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="0">Sin mínimo</option>
                <option value="50000">USD 50.000</option>
                <option value="100000">USD 100.000</option>
                <option value="150000">USD 150.000</option>
                <option value="200000">USD 200.000</option>
                <option value="300000">USD 300.000</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Precio máximo</label>
              <select name="precio_max" defaultValue={precioMax} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="0">Sin máximo</option>
                <option value="100000">USD 100.000</option>
                <option value="150000">USD 150.000</option>
                <option value="200000">USD 200.000</option>
                <option value="300000">USD 300.000</option>
                <option value="500000">USD 500.000</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Dormitorios</label>
              <select name="dorm" defaultValue={dorm} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="0">Cualquiera</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Baños</label>
              <select name="banios" defaultValue={banios} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="0">Cualquiera</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Ordenar por</label>
              <select name="orden" defaultValue={orden} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="reciente">Más recientes</option>
                <option value="precio_asc">Menor precio</option>
                <option value="precio_desc">Mayor precio</option>
              </select>
            </div>
            <div className="col-span-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button type="submit" className="px-6 py-3 bg-teal-800 text-white text-sm font-semibold rounded-xl hover:bg-teal-900 transition-colors">
                Aplicar filtros
              </button>
              <Link href={buildHref({ precio_min: undefined, precio_max: undefined, dorm: undefined, banios: undefined, orden: undefined })} className="text-sm text-slate-500 hover:text-slate-700 transition-colors py-2 text-center">
                Restablecer
              </Link>
            </div>
          </form>
        </details>

        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {operacion && (
              <Link href={buildHref({ operacion: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                {operacion.charAt(0).toUpperCase() + operacion.slice(1)}
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
            {tipo && (
              <Link href={buildHref({ tipo: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
            {ubicacion && (
              <Link href={buildHref({ ubicacion: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                {ubicacion.charAt(0).toUpperCase() + ubicacion.slice(1)}
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
            {precioMin > 0 && (
              <Link href={buildHref({ precio_min: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                Desde USD {precioMin.toLocaleString("es-AR")}
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
            {precioMax > 0 && (
              <Link href={buildHref({ precio_max: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                Hasta USD {precioMax.toLocaleString("es-AR")}
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
            {dorm > 0 && (
              <Link href={buildHref({ dorm: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                {dorm}+ dorm.
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
            {banios > 0 && (
              <Link href={buildHref({ banios: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                {banios}+ baños
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
            {q && (
              <Link href={buildHref({ q: undefined })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors animate-scale-in">
                &ldquo;{q}&rdquo;
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        {pageItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500">No encontramos propiedades con esos filtros</p>
            <Link href="/propiedades" className="btn-pill">
              Ver todas las propiedades
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pageItems.map((property) => (
              <PropertyCard key={property.id} property={property} isNew={new Date(property.createdAt).getTime() > newCutoff} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {currentPage > 1 && (
              <Link href={buildHref({ pagina: String(currentPage - 1) })} className="px-3 sm:px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-700 font-medium text-sm card-hover">
                Anterior
              </Link>
            )}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                .map((p, idx, arr) => (
                  <span key={p} className="contents">
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-slate-400">&hellip;</span>}
                    <Link
                      href={buildHref({ pagina: String(p) })}
                      className={`min-w-[2.5rem] h-10 flex items-center justify-center rounded-xl border font-medium text-sm transition-colors card-hover ${
                        p === currentPage
                          ? "bg-teal-800 text-white border-teal-800"
                          : "border-gray-200 bg-white text-slate-700"
                      }`}
                    >
                      {p}
                    </Link>
                  </span>
                ))}
            </div>
            {currentPage < totalPages && (
              <Link href={buildHref({ pagina: String(currentPage + 1) })} className="px-3 sm:px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-slate-700 font-medium text-sm card-hover">
                Siguiente
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  )
}
