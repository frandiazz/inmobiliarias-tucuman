import Link from "next/link"
import type { Metadata } from "next"
import { Mountain, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Página no encontrada",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto">
          <Mountain className="w-10 h-10 text-white/60" />
        </div>
        <h1 className="mt-6 text-6xl font-bold text-white">404</h1>
        <p className="mt-2 text-xl text-white/80">Página no encontrada</p>
        <p className="mt-2 text-white/50">
          La propiedad o página que buscás no existe o fue removida.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
          >
            Ver propiedades
          </Link>
        </div>
      </div>
    </main>
  )
}
