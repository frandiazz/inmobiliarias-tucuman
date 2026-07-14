import { notFound } from "next/navigation"
import { getPropertyById, getAgencies, updateProperty } from "@/lib/db"
import { redirect } from "next/navigation"
import PropertyForm from "@/components/admin/PropertyForm"

export default async function EditarPropiedad({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = await getPropertyById(Number(id))
  if (!property) notFound()

  const agencies = await getAgencies()

  async function handleSubmit(data: Record<string, unknown>) {
    "use server"
    await updateProperty(Number(id), data)
    redirect("/admin/propiedades")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Editar Propiedad</h1>
      <PropertyForm
        initial={property}
        agencies={agencies.map((a) => ({ id: a.id, name: a.name }))}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
