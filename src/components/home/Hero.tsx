import { Search, Building2, Home, ChevronDown } from "lucide-react"
import RadioTabs from "@/components/ui/RadioTabs"
import HeroBackground from "./HeroBackground"

const operaciones = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
]
const tipos = ["Casa", "Departamento", "Dúplex", "Terreno"]
const ubicacionesDefault = ["Yerba Buena", "Barrio Norte", "Barrio Sur", "Tafí Viejo", "El Corte", "Lomas de Tafí", "San Pablo"]

interface HeroProps {
  totalProps: number
  totalAgencies: number
  zonas?: string[]
}

export default function Hero({ totalProps, totalAgencies, zonas }: HeroProps) {
  const ubicaciones = zonas && zonas.length > 0 ? zonas : ubicacionesDefault
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Tucumán Inmuebles",
    description: "Portal inmobiliario de Tucumán",
    url: "https://tucumaninmuebles.com",
    areaServed: "Tucumán, Argentina",
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBackground />
      <div className="absolute inset-0 animate-gradient-shift" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(15,118,110,0.55) 50%, rgba(0,0,0,0.65) 100%)" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
          Encontrá tu lugar en Tucumán
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl">
          <span className="animate-typewriter">El portal inmobiliario N°1 de la provincia</span>
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <span className="flex items-center gap-1.5">
            <Home className="w-4 h-4" />
            {totalProps.toLocaleString("es-AR")}+ propiedades
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            {totalAgencies} inmobiliarias
          </span>
        </div>

        <form
          action="/propiedades"
          method="GET"
          className="mt-8 w-full max-w-5xl bg-white rounded-2xl shadow-lg p-4 md:p-6 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-center">
              <RadioTabs name="operacion" options={operaciones} defaultValue="venta" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <select
                  name="tipo"
                  defaultValue=""
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer appearance-none pr-10"
                >
                  <option value="">Tipo</option>
                  {tipos.map((t) => (
                    <option key={t} value={t.toLowerCase()}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  name="ubicacion"
                  defaultValue=""
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer appearance-none pr-10"
                >
                  <option value="">Ubicación</option>
                  {ubicaciones.map((u) => (
                    <option key={u} value={u.toLowerCase()}>
                      {u}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <button
                type="submit"
                className="btn-pill w-full justify-center shadow-md"
              >
                <Search className="w-5 h-5" />
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
