import type { Metadata } from "next"
import { getAgencies, getProperties } from "@/lib/db"
import AgencyCard from "@/components/agencies/AgencyCard"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

export const metadata: Metadata = {
  title: "Inmobiliarias en Tucumán",
  description: "Conocé las mejores inmobiliarias de Tucumán. Encontrá la agencia ideal para comprar, vender o alquilar tu propiedad.",
  openGraph: {
    title: "Inmobiliarias en Tucumán | Tucumán Inmuebles",
    description: "Conocé las mejores inmobiliarias de Tucumán.",
  },
}

export default async function InmobiliariasPage() {
  const [agencies, allProperties] = await Promise.all([getAgencies(), getProperties()])

  const counts: Record<string, number> = {}
  for (const p of allProperties) {
    counts[p.agency] = (counts[p.agency] ?? 0) + 1
  }

  return (
    <main>
      <section className="relative py-16 md:py-28 bg-gradient-to-r from-teal-800 to-teal-700 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Las mejores agencias de Tucumán{" "}
            <span className="text-orange-400">confían en nosotros</span>
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Conectamos compradores y vendedores con las inmobiliarias más
            prestigiosas de la provincia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Inmobiliarias" },
          ]}
        />
      </div>
      <section className="py-16 md:py-24 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {agencies.map((agency) => (
              <AgencyCard
                key={agency.id}
                name={agency.name}
                count={counts[agency.name] ?? 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
