"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mountain, Lock } from "lucide-react"
import Link from "next/link"

const ADMIN_PASSWORD = "admin123"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true")
      router.push("/admin")
    } else {
      setError(true)
      setPassword("")
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 text-white mb-10">
          <Mountain className="w-8 h-8" />
          <span className="text-xl font-bold">Tucumán Inmuebles</span>
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-teal-800" />
            </div>
            <h1 className="mt-4 text-xl font-bold text-slate-800">Acceso restringido</h1>
            <p className="mt-1 text-sm text-slate-500">Ingresá la contraseña de administrador</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  error ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
                autoFocus
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-500">Contraseña incorrecta</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-semibold rounded-xl transition-colors"
            >
              Ingresar
            </button>
          </form>

          <Link
            href="/"
            className="block mt-6 text-center text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Portal Tucumán Inmuebles — Panel de administración
        </p>
      </div>
    </div>
  )
}
