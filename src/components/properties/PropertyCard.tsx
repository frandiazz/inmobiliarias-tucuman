import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Ruler, ArrowRight } from "lucide-react"
import type { Property } from "./types"
import FavoriteButton from "./FavoriteButton"
import CompareCheckbox from "./CompareCheckbox"

interface PropertyCardProps {
  property: Property
  isNew?: boolean
}

export default function PropertyCard({ property, isNew }: PropertyCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md card-hover flex flex-col">
      <Link href={`/propiedades/${property.id}`} className="relative h-56 block img-zoom">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-semibold text-white ${
            property.operation === "Venta" ? "bg-teal-800" : "bg-teal-600"
          }`}
        >
          {property.operation}
        </span>
        {isNew && (
          <span className="absolute top-3 right-14 px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-600 text-white animate-pulse-dot">
            Nuevo
          </span>
        )}
        <FavoriteButton
          propertyId={property.id}
          className="absolute top-3 right-3"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">{property.zona}</span>
          <CompareCheckbox propertyId={property.id} />
        </div>
        <p className="text-2xl font-bold text-teal-800">{property.price}</p>
        <h3 className="mt-1 text-base font-semibold text-slate-800 leading-snug">
          {property.title}
        </h3>

        <div className="mt-3 flex items-center gap-3 text-sm text-slate-500 flex-wrap">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 shrink-0" /> {property.beds} Dorm
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4 shrink-0" /> {property.baths} Baños
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="w-4 h-4 shrink-0" /> {property.area}m²
          </span>
        </div>

        <div className="mt-auto pt-4">
          <hr className="border-gray-100 mb-4" />
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-sm font-medium text-slate-600 truncate min-w-0">
              {property.agency}
            </span>
            <Link
              href={`/propiedades/${property.id}`}
              className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors shrink-0"
            >
              Ver detalles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
