import type { Metadata } from "next"
import Hero from "@/components/home/Hero"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import { ComoFunciona, PorQueElegirnos, CtaAgencias, ZonasDestacadas } from "@/components/home/HomeSections"
import { getPropertiesCount, getAgenciesCount, getZones } from "@/lib/db"

export const metadata: Metadata = {
  title: "Tucumán Inmuebles | Portal Inmobiliario de Tucumán",
  description:
    "Encontrá tu propiedad ideal en Tucumán. Casas, departamentos, terrenos y más. El portal inmobiliario N°1 de la provincia.",
  openGraph: {
    title: "Tucumán Inmuebles | Portal Inmobiliario de Tucumán",
    description:
      "Encontrá tu propiedad ideal en Tucumán. Casas, departamentos, terrenos y más.",
  },
}

export default async function Home() {
  const [totalProps, totalAgencies, zonas] = await Promise.all([
    getPropertiesCount(),
    getAgenciesCount(),
    getZones(),
  ])

  return (
    <>
      <Hero totalProps={totalProps} totalAgencies={totalAgencies} zonas={zonas} />
      <FeaturedProperties />
      <ComoFunciona />
      <ZonasDestacadas />
      <PorQueElegirnos totalAgencies={totalAgencies} totalZonas={zonas.length || 6} />
      <CtaAgencias />
    </>
  )
}
