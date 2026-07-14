"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Home, Building2, PlusCircle, LogOut } from "lucide-react"

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/propiedades", label: "Propiedades", icon: Home },
  { href: "/admin/propiedades/nueva", label: "Nueva Propiedad", icon: PlusCircle },
  { href: "/admin/agencias", label: "Agencias", icon: Building2 },
  { href: "/admin/agencias/nueva", label: "Nueva Agencia", icon: PlusCircle },
]

function getInitialAuth(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("admin-auth") === "true"
  }
  return false
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authed] = useState(getInitialAuth)
  const redirected = useRef(false)

  useEffect(() => {
    if (!authed && pathname !== "/admin/login" && !redirected.current) {
      redirected.current = true
      router.replace("/admin/login")
    }
  }, [authed, pathname, router])

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-8 h-8 border-4 border-teal-800 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r border-gray-200 shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin" className="text-lg font-bold text-teal-800">
            Admin Panel
          </Link>
          <p className="text-xs text-slate-400 mt-0.5">Portal Tucumán Inmuebles</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-teal-50 hover:text-teal-800 font-medium transition-colors"
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Ver sitio público
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin-auth")
              router.push("/admin/login")
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-lg font-bold text-teal-800">Admin</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={() => {
                sessionStorage.removeItem("admin-auth")
                router.push("/admin/login")
              }}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors lg:hidden"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-teal-800 transition-colors"
            >
              ← Volver al sitio
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
