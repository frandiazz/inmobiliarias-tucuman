import Link from "next/link"
import { Mountain, Mail, Phone, MapPin } from "lucide-react"
import SocialButtons from "@/components/ui/SocialButtons"
import { siteConfig } from "@/lib/site"
import { getZones } from "@/lib/db"
import NewsletterForm from "@/components/layout/NewsletterForm"

export default async function Footer() {
  const zones = await getZones()

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
            <div className="mt-4">
              <SocialButtons
                facebook={siteConfig.social.facebook}
                twitter={siteConfig.social.twitter}
                instagram={siteConfig.social.instagram}
              />
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
                  <Link href={link.href} className="hover:text-white transition-colors link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Zonas</h3>
            <ul className="space-y-3 text-sm">
              {(zones.length > 0
                ? zones
                : ["Yerba Buena", "Barrio Norte", "Tafí Viejo", "El Corte", "Lomas de Tafí", "San Pablo"]
              ).map((zona) => (
                <li key={zona}>
                  <Link
                    href={`/propiedades?ubicacion=${encodeURIComponent(zona.toLowerCase())}`}
                    className="hover:text-white transition-colors link-underline"
                  >
                    {zona}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-teal-400" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-teal-400" />
                <a href={`tel:+${siteConfig.phoneHref}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-teal-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-2">Newsletter</h4>
              <NewsletterForm />
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
            <Link href="/publicar" className="hover:text-white transition-colors">
              Publicá tu inmobiliaria
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
