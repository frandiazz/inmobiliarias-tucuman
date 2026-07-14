import Link from "next/link"
import { getProperties } from "@/lib/db"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { redirect } from "next/navigation"
import { deleteProperty } from "@/lib/db"

export default async function AdminPropiedades() {
  const properties = await getProperties()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Propiedades</h1>
          <p className="text-slate-500 mt-1">{properties.length} propiedades registradas</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Propiedad
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-semibold text-slate-600">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Título</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Agencia</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Operación</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Precio</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-400 font-mono">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-700 max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-slate-500">{p.agency}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${p.operation === "Venta" ? "bg-teal-100 text-teal-800" : "bg-orange-100 text-orange-700"}`}>
                      {p.operation}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{p.price}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/propiedades/${p.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form
                        action={async () => {
                          "use server"
                          await deleteProperty(p.id)
                          redirect("/admin/propiedades")
                        }}
                      >
                        <button
                          type="submit"
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
