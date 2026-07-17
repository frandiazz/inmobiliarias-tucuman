import { getAgencies, addAgency } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function NuevaAgencia() {
  const agencies = await getAgencies()

  async function handleSubmit(formData: FormData) {
    "use server"
    const name = String(formData.get("name") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const whatsapp = String(formData.get("whatsapp") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()

    if (name) {
      await addAgency({ name, phone, whatsapp, email, description })
    }
    redirect("/admin/agencias")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Nueva Agencia</h1>
      <form
        action={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la agencia</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
            <input
              type="text"
              name="phone"
              placeholder="381 555-0100"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp (con código país)</label>
            <input
              type="text"
              name="whatsapp"
              placeholder="5493815550100"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="info@inmobiliaria.com"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
          <textarea
            name="description"
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors"
          >
            Crear agencia
          </button>
          <button
            type="button"
            onClick={() => history.back()}
            className="px-6 py-2.5 border border-gray-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
