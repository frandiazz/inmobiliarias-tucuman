import Link from "next/link"
import Image from "next/image"
import { getProperties, getAgencies, deleteProperty, setPropertyPublished } from "@/lib/db"
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react"
import { redirect } from "next/navigation"
import ConfirmDelete from "@/components/admin/ConfirmDelete"

const PAGE_SIZE = 12

const zonas = ["Yerba Buena", "Barrio Norte", "Barrio Sur", "Tafí Viejo", "El Corte", "Lomas de Tafí", "San Pablo"]
const tipos = ["Casa", "Departamento", "Dúplex", "Terreno"]

export default async function AdminPropiedades({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q.toLowerCase() : ""
  const operacion = typeof params.operacion === "string" ? params.operacion : ""
  const tipo = typeof params.tipo === "string" ? params.tipo : ""
  const zona = typeof params.zona === "string" ? params.zona : ""
  const pagina = typeof params.pagina === "string" ? Math.max(1, Number(params.pagina)) : 1

  const [all, agencies] = await Promise.all([getProperties(), getAgencies()])

  const filtered = all.filter((p) => {
    if (q && !p.title.toLowerCase().includes(q) && !p.agency.toLowerCase().includes(q)) return false
    if (operacion && p.operation !== operacion) return false
    if (tipo && p.tipo !== tipo) return false
    if (zona && p.zona !== zona) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const currentPage = Math.min(pagina, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function buildHref(overrides: Record<string, string | undefined>) {
    const next: Record<string, string> = {}
    if (q) next.q = q
    if (operacion) next.operacion = operacion
    if (tipo) next.tipo = tipo
    if (zona) next.zona = zona
    Object.assign(next, overrides)
    const qs = new URLSearchParams(next).toString()
    return `/admin/propiedades${qs ? `?${qs}` : ""}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Propiedades</h1>
          <p className="text-slate-500 mt-1">{total} propiedades {total === 1 ? "" : ""}en total</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Propiedad
        </Link>
      </div>

      <form className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">Buscar</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Título o agencia"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Operación</label>
          <select name="operacion" defaultValue={operacion} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Todas</option>
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Tipo</label>
          <select name="tipo" defaultValue={tipo} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Todos</option>
            {tipos.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Zona</label>
          <select name="zona" defaultValue={zona} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Todas</option>
            {zonas.map((z) => (<option key={z} value={z}>{z}</option>))}
          </select>
        </div>
        <div className="md:col-span-5 flex gap-2">
          <button type="submit" className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl transition-colors">
            Filtrar
          </button>
          <Link href="/admin/propiedades" className="px-5 py-2.5 border border-gray-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Limpiar
          </Link>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Propiedad</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Agencia</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Operación</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Precio</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-600">Estado</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 relative">
                        <Image src={p.image} alt={p.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-700 truncate max-w-[220px]">{p.title}</p>
                        <p className="text-xs text-slate-400">{p.tipo} · {p.zona}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.agency}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${p.operation === "Venta" ? "bg-teal-100 text-teal-800" : "bg-teal-100 text-teal-600"}`}>
                      {p.operation}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{p.price}</td>
                  <td className="px-4 py-3 text-center">
                    <form
                      action={async () => {
                        "use server"
                        await setPropertyPublished(p.id, !p.published)
                        redirect(buildHref({}))
                      }}
                    >
                      <button
                        type="submit"
                        title={p.published ? "Ocultar" : "Publicar"}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${p.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                      >
                        {p.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {p.published ? "Publicada" : "Oculta"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/propiedades/${p.id}/edit`} className="p-2 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <ConfirmDelete
                        action={async () => {
                          "use server"
                          await deleteProperty(p.id)
                          redirect(buildHref({}))
                        }}
                        message="¿Eliminar esta propiedad? No se puede deshacer."
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </ConfirmDelete>
                    </div>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                    No se encontraron propiedades con esos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <nav className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          {currentPage > 1 && (
            <Link href={buildHref({ pagina: String(currentPage - 1) })} className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50">
              Anterior
            </Link>
          )}
          <span className="text-sm text-slate-500 px-2">
            Página {currentPage} de {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link href={buildHref({ pagina: String(currentPage + 1) })} className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50">
              Siguiente
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
