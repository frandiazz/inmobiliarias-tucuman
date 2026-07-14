import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface AgencyCardProps {
  name: string
  count: number
}

export default function AgencyCard({ name, count }: AgencyCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md card-hover p-6 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
        <span className="text-2xl font-bold text-teal-800">{initials}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-800">{name}</h3>

      <p className="mt-1.5 text-sm text-slate-500">
        {count} {count === 1 ? "propiedad publicada" : "propiedades publicadas"}
      </p>

      <div className="mt-auto pt-5 w-full">
        <Link
          href={`/inmobiliarias/${encodeURIComponent(name)}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-teal-800 text-teal-800 font-semibold hover:bg-teal-50 transition-colors"
        >
          Ver su catálogo
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
