import type { Metadata } from "next"
import Hero from "@/components/home/Hero"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import { getPropertiesCount, getAgenciesCount } from "@/lib/db"

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
  const [totalProps, totalAgencies] = await Promise.all([
    getPropertiesCount(),
    getAgenciesCount(),
  ])

  return (
    <>
      <Hero totalProps={totalProps} totalAgencies={totalAgencies} />
      <FeaturedProperties />
    </>
  )
}
