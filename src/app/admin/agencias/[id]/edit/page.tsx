import Link from "next/link"
import { redirect } from "next/navigation"
import { getAgencyById, updateAgency } from "@/lib/db"
import { ArrowLeft } from "lucide-react"
import ImageUploader from "@/components/admin/ImageUploader"

export default async function EditAgencyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const agencyId = Number(id)
  const agency = await getAgencyById(agencyId)

  if (!agency) {
    redirect("/admin/agencias")
  }

  async function saveAction(formData: FormData) {
    "use server"
    const name = String(formData.get("name") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const whatsapp = String(formData.get("whatsapp") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()
    const logoUrl = String(formData.get("logoUrl") ?? "").trim()

    if (name) {
      await updateAgency(agencyId, { name, phone, whatsapp, email, description, logo_url: logoUrl || null })
    }
    redirect("/admin/agencias")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/admin/agencias"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-700 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a agencias
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 mb-1">Editar Agencia</h1>
      <p className="text-slate-500 mb-6">Modifica los datos de la inmobiliaria.</p>

      <form
        action={saveAction}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Nombre</label>
          <input
            name="name"
            defaultValue={agency.name}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono</label>
            <input
              name="phone"
              defaultValue={agency.phone}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">WhatsApp</label>
            <input
              name="whatsapp"
              defaultValue={agency.whatsapp}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={agency.email}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Descripción</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={agency.description}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Logo / Foto de perfil</label>
          <ImageUploader
            value={agency.logoUrl ?? ""}
            folder="agencias"
            label="Subir logo"
            rounded="full"
            size={80}
            inputName="logoUrl"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Guardar cambios
          </button>
          <Link
            href="/admin/agencias"
            className="px-5 py-2.5 border border-gray-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
