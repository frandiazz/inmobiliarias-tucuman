import Link from "next/link"
import { getProperties, getAgencies, getLeads } from "@/lib/db"
import { Home, Building2, Inbox, ArrowRight } from "lucide-react"

function countBy<T>(items: T[], key: (i: T) => string): Record<string, number> {
  const out: Record<string, number> = {}
  for (const i of items) {
    const k = key(i)
    out[k] = (out[k] ?? 0) + 1
  }
  return out
}

export default async function AdminDashboard() {
  const [properties, agencies, leads] = await Promise.all([
    getProperties(),
    getAgencies(),
    getLeads(),
  ])

  const venta = properties.filter((p) => p.operation === "Venta").length
  const alquiler = properties.filter((p) => p.operation === "Alquiler").length
  const publicadas = properties.filter((p) => p.published !== false).length
  const unread = leads.filter((l) => !l.read).length

  const byZona = countBy(properties, (p) => p.zona || "Sin zona")
  const byTipo = countBy(properties, (p) => p.tipo || "Otro")
  const maxZona = Math.max(1, ...Object.values(byZona))
  const maxTipo = Math.max(1, ...Object.values(byTipo))

  const recentLeads = leads.slice(0, 5)

  const stats = [
    { label: "Propiedades", value: properties.length, sub: `${publicadas} publicadas`, icon: Home, color: "bg-teal-50 text-teal-700" },
    { label: "Agencias", value: agencies.length, sub: "registradas", icon: Building2, color: "bg-teal-50 text-teal-700" },
    { label: "Consultas", value: leads.length, sub: `${unread} sin leer`, icon: Inbox, color: "bg-teal-50 text-teal-700" },
    { label: "En Venta / Alq.", value: `${venta} / ${alquiler}`, sub: "operaciones", icon: Home, color: "bg-teal-50 text-teal-700" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <p className="text-slate-500 mt-1">Resumen del portal inmobiliario</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-800">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-5">Propiedades por zona</h2>
          <div className="space-y-3">
            {Object.entries(byZona)
              .sort((a, b) => b[1] - a[1])
              .map(([zona, count]) => (
                <div key={zona}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{zona}</span>
                    <span className="font-semibold text-slate-700">{count}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-600"
                      style={{ width: `${(count / maxZona) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            {Object.keys(byZona).length === 0 && (
              <p className="text-sm text-slate-400">Sin datos.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-5">Propiedades por tipo</h2>
          <div className="space-y-3">
            {Object.entries(byTipo)
              .sort((a, b) => b[1] - a[1])
              .map(([tipo, count]) => (
                <div key={tipo}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{tipo}</span>
                    <span className="font-semibold text-slate-700">{count}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{ width: `${(count / maxTipo) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            {Object.keys(byTipo).length === 0 && (
              <p className="text-sm text-slate-400">Sin datos.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Consultas recientes</h2>
            <Link href="/admin/leads" className="text-sm text-teal-700 hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {recentLeads.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{l.name || "Sin nombre"}</p>
                  <p className="text-xs text-slate-400 truncate">{l.property_title || "Consulta general"}</p>
                </div>
                {!l.read && (
                  <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-teal-100 text-teal-700 shrink-0">
                    Nuevo
                  </span>
                )}
              </div>
            ))}
            {recentLeads.length === 0 && (
              <p className="text-sm text-slate-400">No hay consultas todavía.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4">Acciones rápidas</h2>
          <div className="space-y-3">
            <Link
              href="/admin/propiedades/nueva"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium transition-colors"
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
            <Link
              href="/admin/leads"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium transition-colors"
            >
              Revisar consultas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
