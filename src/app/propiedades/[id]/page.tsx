import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin, Ruler, Calendar, ShieldCheck } from "lucide-react"
import { getPropertyById, getAgencyById, getProperties } from "@/lib/db"
import PropertyGallery from "@/components/properties/PropertyGallery"
import PropertyContactCard from "@/components/properties/PropertyContactCard"
import PropertyMap from "@/components/properties/PropertyMap"
import PropertyCard from "@/components/properties/PropertyCard"
import ShareButtons from "@/components/properties/ShareButtons"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

const fallbackImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18fb4b3f2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600563442515-1f1f0c0b5e5a?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=80&w=2070&auto=format&fit=crop",
]

const newCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000

function getGalleryImages(property: { image: string; images?: string[] | null }): string[] {
  const real = (property.images ?? []).filter(Boolean)
  if (real.length > 0) {
    const unique = Array.from(new Set([property.image, ...real]))
    return unique.slice(0, 8)
  }
  const others = fallbackImages.filter((img) => img !== property.image).slice(0, 7)
  return [property.image, ...others]
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const property = await getPropertyById(Number(id))
  if (!property) return {}
  return {
    title: property.title,
    description: `${property.operation} — ${property.price}. ${property.beds} dormitorios, ${property.baths} baños, ${property.area}m². ${property.agency}.`,
    openGraph: {
      title: `${property.title} | Tucumán Inmuebles`,
      description: `${property.operation} — ${property.price}. ${property.beds} dormitorios, ${property.baths} baños, ${property.area}m².`,
      images: [{ url: property.image }],
    },
  }
}

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = await getPropertyById(Number(id))
  if (!property) notFound()

  const agency = await getAgencyById(property.agencyId)
  const images = getGalleryImages(property)

  const allProperties = await getProperties()
  const similares = allProperties
    .filter((p) => p.id !== property.id && (p.zona === property.zona || p.tipo === property.tipo))
    .slice(0, 3)

  const shareUrl = `https://tucumaninmuebles.com/propiedades/${property.id}`
  const shareText = `Mirá esta propiedad: ${property.title} — ${property.price}`

  const priceNumber = Number(property.price.replace(/[^0-9]/g, ""))
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    image: property.image,
    description: property.description ?? `Propiedad en ${property.zona}, Tucumán`,
    brand: { "@type": "Brand", name: property.agency },
    offers: {
      "@type": "Offer",
      price: Number.isFinite(priceNumber) ? priceNumber : undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: shareUrl,
    },
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://tucumaninmuebles.com" },
      { "@type": "ListItem", position: 2, name: "Propiedades", item: "https://tucumaninmuebles.com/propiedades" },
      { "@type": "ListItem", position: 3, name: property.title, item: shareUrl },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Propiedades", href: "/propiedades" },
            { label: property.title },
          ]}
        />
        <PropertyGallery images={images} title={property.title} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-slate-500 uppercase tracking-wide">
                    {property.operation} — {property.agency}
                  </p>
                  <h1 className="mt-1 text-2xl md:text-3xl font-bold text-slate-800">
                    {property.title}
                  </h1>
                  <p className="mt-1 flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-4 h-4" />
                    {property.zona}, Tucumán
                  </p>
                </div>
                <p className="text-3xl font-bold text-teal-800 shrink-0">
                  {property.price}
                </p>
              </div>

              <ShareButtons shareUrl={shareUrl} shareText={shareText} />
            </div>

            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                Descripción
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {property.description ??
                  `Propiedad en ${property.zona}, Tucumán. ${property.operation} de ${property.tipo} con ${property.beds} dormitorios, ${property.baths} baños y ${property.area}m². Contactá con la agencia para más detalles y coordinar una visita.`}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Características
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <Ruler className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Superficie</p>
                    <p className="font-semibold text-slate-800">{property.area} m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Antigüedad</p>
                    <p className="font-semibold text-slate-800">{property.antiguedad ?? "A consular"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Estado</p>
                    <p className="font-semibold text-slate-800">{property.estado ?? "Excelente"}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                Ubicación
              </h2>
              <PropertyMap
                lat={property.latitude ?? undefined}
                lng={property.longitude ?? undefined}
                title={property.title}
                address={`${property.zona}, Tucumán, Argentina`}
                className="h-80 w-full"
              />
            </section>

            {similares.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 reveal-on-scroll">
                  Propiedades similares
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-on-scroll">
                  {similares.map((p) => (
                    <PropertyCard key={p.id} property={p} isNew={new Date(p.createdAt).getTime() > newCutoff} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <PropertyContactCard
                property={property}
                whatsapp={agency?.whatsapp}
                email={agency?.email}
                phone={agency?.phone}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
