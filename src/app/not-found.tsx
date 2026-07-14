import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative mx-auto w-40 h-40 mb-8">
          <div className="absolute inset-0 rounded-full bg-teal-100 animate-float" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-bold text-teal-800">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Página no encontrada
        </h1>
        <p className="text-slate-500 mb-8">
          La página que buscás no existe o fue movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-pill"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-slate-600 font-medium hover:bg-slate-100 transition-colors"
          >
            <Search className="w-4 h-4" />
            Explorar propiedades
          </Link>
        </div>
      </div>
    </main>
  )
}
