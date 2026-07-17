import Link from "next/link"
import { redirect } from "next/navigation"
import { getAgencyById, updateAgency } from "@/lib/db"
import { ArrowLeft } from "lucide-react"
import AgencyForm from "@/components/admin/AgencyForm"

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

  async function handleSubmit(data: Record<string, unknown>) {
    "use server"
    if (data.name) {
      await updateAgency(agencyId, {
        name: data.name,
        phone: data.phone ?? "",
        whatsapp: data.whatsapp ?? "",
        email: data.email ?? "",
        description: data.description ?? "",
        logo_url: (data.logoUrl as string) || null,
      })
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

      <AgencyForm
        initial={{
          id: agency.id,
          name: agency.name,
          phone: agency.phone,
          whatsapp: agency.whatsapp,
          email: agency.email,
          description: agency.description,
          logoUrl: agency.logoUrl,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
