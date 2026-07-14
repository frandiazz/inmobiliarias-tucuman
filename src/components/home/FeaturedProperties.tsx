import PropertyCard from "@/components/properties/PropertyCard"
import AnimatedSection from "@/components/ui/AnimatedSection"
import { getLatestProperties } from "@/lib/db"

const newCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000

export default async function FeaturedProperties() {
  const latest = await getLatestProperties(6)
  return (
    <section className="py-16 md:py-24 bg-teal-50 reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Últimas propiedades ingresadas
          </h2>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latest.map((property, i) => (
            <AnimatedSection key={property.id} delay={i * 100}>
              <PropertyCard property={property} isNew={new Date(property.createdAt).getTime() > newCutoff} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
