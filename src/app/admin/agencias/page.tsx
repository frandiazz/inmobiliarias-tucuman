import Link from "next/link"
import { getAgencies, getProperties, deleteAgency } from "@/lib/db"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { redirect } from "next/navigation"
import ConfirmDelete from "@/components/admin/ConfirmDelete"
import AgencyAvatar from "@/components/agencies/AgencyAvatar"

export default async function AdminAgencias() {
  const [agencies, properties] = await Promise.all([getAgencies(), getProperties()])

  function countByAgency(agencyId: number) {
    return properties.filter((p) => p.agencyId === agencyId).length
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Agencias</h1>
          <p className="text-slate-500 mt-1">{agencies.length} agencias registradas</p>
        </div>
        <Link
          href="/admin/agencias/nueva"
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Agencia
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agencies.map((a) => (
          <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between">
               <div className="flex items-center gap-4">
                 <AgencyAvatar name={a.name} logoUrl={a.logoUrl} size={56} />
                 <div>
                  <h3 className="font-semibold text-slate-800">{a.name}</h3>
                  <p className="text-sm text-slate-500">
                    {countByAgency(a.id)} propiedades
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/agencias/${a.id}/edit`}
                  className="p-2 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <ConfirmDelete
                  action={async () => {
                    "use server"
                    await deleteAgency(a.id)
                    redirect("/admin/agencias")
                  }}
                  message="¿Eliminar esta agencia? También se quitarán sus referencias en propiedades."
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </ConfirmDelete>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-slate-400">WhatsApp</p>
                <p className="font-medium text-slate-700 truncate">{a.whatsapp}</p>
              </div>
              <div>
                <p className="text-slate-400">Email</p>
                <p className="font-medium text-slate-700 truncate">{a.email}</p>
              </div>
              <div>
                <p className="text-slate-400">Teléfono</p>
                <p className="font-medium text-slate-700">{a.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
