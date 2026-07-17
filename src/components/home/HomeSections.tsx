import Link from "next/link"
import { Search, Building2, MessageSquare, MapPin, ArrowRight, ShieldCheck, Star, Home } from "lucide-react"
import AnimatedSection from "@/components/ui/AnimatedSection"
import { getZones } from "@/lib/db"

const pasos = [
  {
    icon: Search,
    title: "Buscá",
    text: "Filtrá por zona, tipo, operación y precio para encontrar exactamente lo que buscás.",
  },
  {
    icon: Building2,
    title: "Compará",
    text: "Guardá favoritos y compará hasta 4 propiedades lado a lado para decidir mejor.",
  },
  {
    icon: MessageSquare,
    title: "Contactá",
    text: "Hablando directo con la inmobiliaria por WhatsApp, sin intermediarios.",
  },
]

const beneficios = [
  "Solo agencias reales y verificadas de Tucumán",
  "Búsqueda por zona, tipo, precio y ambientes",
  "Favoritos y comparador para decidir sin apuro",
  "Contacto directo por WhatsApp con cada agencia",
]

export function ComoFunciona() {
  return (
    <section className="py-16 md:py-24 bg-white reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-teal-700 uppercase tracking-wide">
              Tan simple como 1, 2, 3
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-800">
              Cómo encontrar tu propiedad
            </h2>
            <p className="mt-3 text-slate-500">
              En tres pasos tenés tu próximo hogar o inversión a un clic de distancia.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pasos.map((paso, i) => {
            const Icon = paso.icon
            return (
              <AnimatedSection key={paso.title} delay={i * 80}>
                <div className="h-full bg-slate-50 rounded-2xl p-8 text-center border border-gray-100 hover:border-teal-200 transition-colors">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-700 text-white flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="mt-5 text-sm font-bold text-teal-700">Paso {i + 1}</div>
                  <h3 className="mt-1 text-xl font-semibold text-slate-800">{paso.title}</h3>
                  <p className="mt-2 text-slate-500 leading-relaxed">{paso.text}</p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function PorQueElegirnos({ totalAgencies, totalZonas }: { totalAgencies: number; totalZonas: number }) {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimatedSection>
          <span className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
            ¿Por qué Tucumán Inmuebles?
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            El portal hecho para Tucumán
          </h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Reunimos a las mejores inmobiliarias de la provincia en un solo lugar,
            para que encuentres tu propiedad sin dar vueltas por decenas de sitios.
          </p>
          <ul className="mt-6 space-y-3">
            {beneficios.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-8">
            <div>
              <p className="text-3xl font-bold text-teal-400">{totalAgencies}+</p>
              <p className="text-sm text-slate-400">Inmobiliarias</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-400">{totalZonas}+</p>
              <p className="text-sm text-slate-400">Zonas cubiertas</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={120}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/40 to-slate-900/40 mix-blend-multiply" />
            <div className="bg-teal-800/90 p-10 h-full flex flex-col justify-center">
              <div className="flex gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xl font-medium leading-relaxed">
                &ldquo;Encontré mi departamento en Yerba Buena en menos de una semana.
                La búsqueda por zona y el contacto directo por WhatsApp lo hicieron súper fácil.&rdquo;
              </p>
              <p className="mt-4 text-sm text-teal-200">— Familia García, Tucumán</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export function CtaAgencias() {
  return (
    <section className="py-16 md:py-24 bg-teal-50 reveal-on-scroll">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 md:p-14 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-700 text-white flex items-center justify-center">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-slate-800">
              ¿Sos inmobiliaria en Tucumán?
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Sumate al portal y publicá tus propiedades ante cientos de compradores
              e inquilinos cada mes. Gestionalas desde tu panel exclusivo.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/publicar"
                className="btn-pill px-8 py-3.5 text-base"
              >
                Publicá tu inmobiliaria
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/inmobiliarias"
                className="px-8 py-3.5 text-base font-semibold text-slate-600 hover:text-teal-700 transition-colors"
              >
                Ver agencias
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export async function ZonasDestacadas() {
  const zonas = await getZones()
  const lista = zonas.length > 0 ? zonas : ["Yerba Buena", "Barrio Norte", "Tafí Viejo", "El Corte", "Lomas de Tafí", "San Pablo"]

  return (
    <section className="py-16 md:py-24 bg-white reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="text-sm font-semibold text-teal-700 uppercase tracking-wide">
                Explorá por zona
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-800">
                Zonas destacadas de Tucumán
              </h2>
            </div>
            <Link
              href="/propiedades"
              className="flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {lista.slice(0, 6).map((zona, i) => (
            <AnimatedSection key={zona} delay={i * 50}>
              <Link
                href={`/propiedades?ubicacion=${encodeURIComponent(zona.toLowerCase())}`}
                className="group h-full flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-teal-700 rounded-2xl p-6 text-center transition-colors border border-gray-100 hover:border-teal-700"
              >
                <div className="w-12 h-12 rounded-full bg-teal-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <MapPin className="w-5 h-5 text-teal-700 group-hover:text-white transition-colors" />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-white transition-colors text-sm">
                  {zona}
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
