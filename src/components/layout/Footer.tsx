"use client"

import Link from "next/link"
import { Mountain, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
              <Mountain className="w-6 h-6" />
              <span>Tucumán Inmuebles</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              El portal inmobiliario que conecta a las mejores agencias de Tucumán
              con quienes buscan su próximo hogar.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-700 flex items-center justify-center transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs font-bold text-white uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Propiedades</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Casas", href: "/propiedades?tipo=casa" },
                { label: "Departamentos", href: "/propiedades?tipo=departamento" },
                { label: "Dúplex", href: "/propiedades?tipo=d%C3%BAplex" },
                { label: "Terrenos", href: "/propiedades?tipo=terreno" },
                { label: "En Venta", href: "/propiedades?operacion=venta" },
                { label: "En Alquiler", href: "/propiedades?operacion=alquiler" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Zonas</h3>
            <ul className="space-y-3 text-sm">
              {["Yerba Buena", "Barrio Norte", "Tafí Viejo", "El Corte", "Lomas de Tafí", "San Pablo"].map(
                (zona) => (
                  <li key={zona}>
                    <Link
                      href={`/propiedades?ubicacion=${encodeURIComponent(zona.toLowerCase())}`}
                      className="hover:text-white transition-colors"
                    >
                      {zona}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-teal-400" />
                <span>San Miguel de Tucumán, Tucumán, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-teal-400" />
                <a href="tel:+543815555555" className="hover:text-white transition-colors">
                  381 555-5555
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-teal-400" />
                <a href="mailto:info@tucumaninmuebles.com" className="hover:text-white transition-colors">
                  info@tucumaninmuebles.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-2">Newsletter</h4>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Tucumán Inmuebles. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/inmobiliarias" className="hover:text-white transition-colors">
              Agencias
            </Link>
            <span>&middot;</span>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
