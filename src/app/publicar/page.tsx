"use client"

import Link from "next/link"
import { ArrowRight, Building2, TrendingUp, Users, BarChart3, Smartphone } from "lucide-react"
import FlipCard from "@/components/ui/FlipCard"

const beneficios = [
  {
    icon: TrendingUp,
    title: "Más visibilidad",
    desc: "Llegá a miles de compradores potenciales todos los días.",
  },
  {
    icon: Users,
    title: "Leads directos",
    desc: "Recibí consultas directamente desde la plataforma.",
  },
  {
    icon: BarChart3,
    title: "Dashboard exclusivo",
    desc: "Panel privado para gestionar todas tus propiedades.",
  },
  {
    icon: Smartphone,
    title: "Sitio optimizado",
    desc: "Tu catálogo en una plataforma moderna y rápida.",
  },
  {
    icon: Building2,
    title: "Sin página web propia",
    desc: "Nosotros nos encargamos de todo.",
  },
]

const agencias = [
  "Inmobiliaria Aconquija",
  "Tucumán Propiedades",
  "Norte Raíces",
  "San Miguel Inmuebles",
  "Citrus Propiedades",
  "Lomas Negocio Inmobiliario",
  "Sierras del Norte",
  "Portal Inmobiliario Tucumán",
  "Alto Verde Propiedades",
  "Soler Bienes Raíces",
]

export default function PublicarPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-teal-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Portal Tucumán Inmuebles
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              El portal inmobiliario N°1 de Tucumán
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl">
              Conectamos tu inmobiliaria con miles de personas que buscan su próximo hogar en la provincia.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+543815555555"
                className="btn-pill text-base shadow-xl"
              >
                Consultanos sin compromiso
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/inmobiliarias"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Ver agencias activas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 reveal-on-scroll">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center">
            ¿Por qué publicar con nosotros?
          </h2>
          <p className="mt-4 text-lg text-slate-500 text-center max-w-xl mx-auto">
            Todo lo que tu inmobiliaria necesita para llegar a más clientes.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((b) => (
              <FlipCard key={b.title} icon={b.icon} title={b.title} description={b.desc} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-100 reveal-on-scroll">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Ya forman parte del portal
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {agencias.map((a) => {
              const initials = a.split(" ").map((w) => w[0]).slice(0, 2).join("")
              return (
                <div key={a} className="flex items-center gap-2 text-slate-500">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-teal-800">{initials}</span>
                  </div>
                  <span className="text-sm font-medium">{a}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-center reveal-on-scroll">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">¿Querés sumar tu inmobiliaria?</h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            Contactanos y te contamos todo sin compromiso.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <a href="tel:+543815555555" className="text-lg hover:text-white transition-colors">
              📞 381 555-5555
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a href="mailto:info@tucumaninmuebles.com" className="text-lg hover:text-white transition-colors">
              ✉️ info@tucumaninmuebles.com
            </a>
          </div>
          <p className="mt-6">
            <Link href="/" className="text-teal-400 hover:text-teal-300 transition-colors">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
