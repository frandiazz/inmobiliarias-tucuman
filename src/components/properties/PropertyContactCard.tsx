import { MessageCircle, Mail, Building2 } from "lucide-react"
import type { Property } from "./types"

interface ContactCardProps {
  property: Property
  whatsapp?: string
  email?: string
  phone?: string
}

export default function ContactCard({ property, whatsapp, email, phone }: ContactCardProps) {
  const whatsappNumber = whatsapp ?? "5493815555555"
  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa la propiedad: ${property.title} (${property.price})`
  )

  return (
    <aside className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
          <Building2 className="w-6 h-6 text-teal-800" />
        </div>
        <div>
          <p className="text-sm text-slate-500">Publicado por</p>
          <p className="font-semibold text-slate-800">{property.agency}</p>
          {phone && <p className="text-xs text-slate-400">{phone}</p>}
        </div>
      </div>

      <hr className="my-5 border-gray-100" />

      <p className="text-2xl font-bold text-teal-800">{property.price}</p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold transition-colors hover:opacity-90"
          style={{ backgroundColor: "#25D366" }}
        >
          <MessageCircle className="w-5 h-5" />
          Contactar por WhatsApp
        </a>

        {email && (
          <a
            href={`mailto:${email}?subject=Consulta: ${property.title}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
          >
            <Mail className="w-5 h-5" />
            Enviar Mensaje
          </a>
        )}
      </div>
    </aside>
  )
}
