import Link from "next/link"
import { getProperties, getAgencies } from "@/lib/db"
import { Home, Building2, ArrowRight } from "lucide-react"

export default async function AdminDashboard() {
  const [properties, agencies] = await Promise.all([getProperties(), getAgencies()])

  const venta = properties.filter((p) => p.operation === "Venta").length
  const alquiler = properties.filter((p) => p.operation === "Alquiler").length

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <p className="text-slate-500 mt-1">Resumen del portal inmobiliario</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
            <Home className="w-6 h-6 text-teal-700" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800">{properties.length}</p>
          <p className="text-sm text-slate-500">Propiedades totales</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-teal-700" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800">{agencies.length}</p>
          <p className="text-sm text-slate-500">Agencias registradas</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
            <Home className="w-6 h-6 text-orange-600" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800">{venta}</p>
          <p className="text-sm text-slate-500">En Venta</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Home className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-800">{alquiler}</p>
          <p className="text-sm text-slate-500">En Alquiler</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4">Acciones rápidas</h2>
          <div className="space-y-3">
            <Link
              href="/admin/propiedades/nueva"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium transition-colors"
            >
              Agregar nueva propiedad
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/agencias/nueva"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium transition-colors"
            >
              Registrar nueva agencia
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4">Últimas propiedades agregadas</h2>
          <div className="space-y-3">
            {properties.slice(-5).reverse().map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{p.title}</p>
                  <p className="text-xs text-slate-400">{p.agency}</p>
                </div>
                <span className="text-sm font-semibold text-teal-700 shrink-0 ml-4">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
