import { getLeads, deleteLead, markLeadRead } from "@/lib/db"
import { Trash2, Mail, MailOpen, Phone, MessageSquare } from "lucide-react"
import { redirect } from "next/navigation"

function formatDate(d?: string) {
  if (!d) return ""
  const date = new Date(d)
  return date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default async function AdminLeads() {
  const leads = await getLeads()
  const unread = leads.filter((l) => !l.read).length

  async function toggleRead(formData: FormData) {
    "use server"
    const id = Number(formData.get("id"))
    const read = formData.get("read") === "true"
    await markLeadRead(id, !read)
    redirect("/admin/leads")
  }

  async function removeLead(formData: FormData) {
    "use server"
    const id = Number(formData.get("id"))
    await deleteLead(id)
    redirect("/admin/leads")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Consultas</h1>
          <p className="text-slate-500 mt-1">
            {leads.length} consultas · {unread} sin leer
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Aún no hay consultas recibidas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`bg-white rounded-2xl border shadow-sm p-5 transition-colors ${
                lead.read ? "border-gray-100" : "border-teal-200 bg-teal-50/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800 truncate">
                      {lead.name || "Sin nombre"}
                    </h3>
                    {!lead.read && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-teal-100 text-teal-700">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{formatDate(lead.created_at)}</p>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                    {lead.email && (
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {lead.email}
                      </span>
                    )}
                    {lead.phone && (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {lead.phone}
                      </span>
                    )}
                  </div>

                  {lead.property_title && (
                    <p className="mt-2 text-sm text-slate-500">
                      Sobre: <span className="font-medium text-slate-700">{lead.property_title}</span>
                    </p>
                  )}

                  {lead.message && (
                    <p className="mt-3 text-sm text-slate-600 bg-slate-50 rounded-xl p-3 border border-gray-100">
                      {lead.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <form action={toggleRead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="read" value={String(!!lead.read)} />
                    <button
                      type="submit"
                      title={lead.read ? "Marcar como no leído" : "Marcar como leído"}
                      className="p-2 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                    >
                      {lead.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </button>
                  </form>
                  <form action={removeLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button
                      type="submit"
                      title="Eliminar"
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
