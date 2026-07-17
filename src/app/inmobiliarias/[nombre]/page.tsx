import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin } from "lucide-react"
import { getAgencies, getPropertiesByAgency } from "@/lib/db"
import PropertyCard from "@/components/properties/PropertyCard"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import AgencyAvatar from "@/components/agencies/AgencyAvatar"

export const dynamic = "force-dynamic"

const newCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000

export async function generateMetadata({ params }: { params: Promise<{ nombre: string }> }): Promise<Metadata> {
  const { nombre } = await params
  const name = decodeURIComponent(nombre)
  return {
    title: `${name} | Inmobiliaria en Tucumán`,
    description: `Todas las propiedades publicadas por ${name} en Tucumán. Casas, departamentos, terrenos y más.`,
    openGraph: {
      title: `${name} | Tucumán Inmuebles`,
      description: `Todas las propiedades publicadas por ${name} en Tucumán.`,
    },
  }
}

export default async function AgencyPage({
  params,
}: {
  params: Promise<{ nombre: string }>
}) {
  const { nombre } = await params
  const name = decodeURIComponent(nombre)

  const agencies = await getAgencies()
  const agency = agencies.find((a) => a.name === name)
  if (!agency) notFound()

  const properties = await getPropertiesByAgency(agency.id)

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Inmobiliarias", href: "/inmobiliarias" },
            { label: name },
          ]}
        />
      </div>
      <section className="bg-gradient-to-r from-teal-800 to-teal-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 animate-fade-in-up">
            <div className="shrink-0 ring-4 ring-white/30 rounded-full">
              <AgencyAvatar name={name} logoUrl={agency.logoUrl} size={80} className="bg-white/20" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{name}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-white/70">
                <MapPin className="w-4 h-4" />
                Tucumán, Argentina
              </p>
              <p className="mt-0.5 text-white/60 text-sm">
                {properties.length}{" "}
                {properties.length === 1
                  ? "propiedad publicada"
                  : "propiedades publicadas"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">
            Catálogo de propiedades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} isNew={new Date(property.createdAt).getTime() > newCutoff} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
