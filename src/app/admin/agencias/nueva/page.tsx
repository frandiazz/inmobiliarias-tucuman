import { addAgency } from "@/lib/db"
import AgencyForm from "@/components/admin/AgencyForm"

export default function NuevaAgencia() {
  async function handleSubmit(data: Record<string, unknown>) {
    "use server"
    if (data.name) {
      await addAgency({
        name: data.name as string,
        phone: (data.phone as string) ?? "",
        whatsapp: (data.whatsapp as string) ?? "",
        email: (data.email as string) ?? "",
        description: (data.description as string) ?? "",
        logoUrl: (data.logoUrl as string) || null,
      })
    }
    // redirect handled by form
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Nueva Agencia</h1>
      <AgencyForm onSubmit={handleSubmit} />
    </div>
  )
}
