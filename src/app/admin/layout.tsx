import { redirect } from "next/navigation"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { logoutAction, checkAuth } from "@/app/admin/actions"
import Sidebar from "@/components/admin/Sidebar"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const ok = await checkAuth()
  if (!ok) {
    redirect("/admin/login")
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
          <Sidebar />
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Ver sitio público
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 lg:px-8">
          <div className="ml-auto flex items-center gap-4">
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
