import { Mail } from "lucide-react"
import Link from "next/link"
import type { Property } from "./types"
import AgencyAvatar from "@/components/agencies/AgencyAvatar"

interface ContactCardProps {
  property: Property
  whatsapp?: string
  email?: string
  phone?: string
  agencyLogo?: string | null
}

export default function ContactCard({ property, whatsapp, email, phone, agencyLogo }: ContactCardProps) {
  const whatsappNumber = whatsapp ?? "5493815555555"
  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa la propiedad: ${property.title} (${property.price})`
  )
  const agencyHref = `/inmobiliarias/${encodeURIComponent(property.agency)}`

  return (
    <aside className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <Link href={agencyHref} className="flex items-center gap-3 group">
        <AgencyAvatar name={property.agency} logoUrl={agencyLogo} size={48} />
        <div>
          <p className="text-sm text-slate-500">Publicado por</p>
          <p className="font-semibold text-slate-800 group-hover:text-teal-800 transition-colors">
            {property.agency}
          </p>
          {phone && <p className="text-xs text-slate-400">{phone}</p>}
        </div>
      </Link>

      <hr className="my-5 border-gray-100" />

      <p className="text-2xl font-bold text-teal-800">{property.price}</p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22}>
            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        {email && (
          <a
            href={`mailto:${email}?subject=Consulta: ${property.title}`}
            className="btn-pill w-full justify-center"
          >
            <Mail className="w-5 h-5" />
            Enviar Mensaje
          </a>
        )}
      </div>
    </aside>
  )
}
