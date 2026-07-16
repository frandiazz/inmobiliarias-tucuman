import Link from "next/link"
import { LayoutDashboard, Home, Building2, PlusCircle, Inbox } from "lucide-react"
import { getLeads } from "@/lib/db"

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { href: "/admin/propiedades", label: "Propiedades", icon: Home },
  { href: "/admin/propiedades/nueva", label: "Nueva Propiedad", icon: PlusCircle },
  { href: "/admin/agencias", label: "Agencias", icon: Building2 },
  { href: "/admin/agencias/nueva", label: "Nueva Agencia", icon: PlusCircle },
  { href: "/admin/leads", label: "Consultas", icon: Inbox },
]

export default async function Sidebar({ pathname }: { pathname: string }) {
  let unread = 0
  try {
    const leads = await getLeads()
    unread = leads.filter((l) => !l.read).length
  } catch {
    unread = 0
  }

  return (
    <>
      {sidebarLinks.map((link) => {
        const Icon = link.icon
        const active = link.end
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(link.href + "/")
        const showBadge = link.href === "/admin/leads" && unread > 0
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors ${
              active
                ? "bg-teal-700 text-white"
                : "text-slate-600 hover:bg-teal-50 hover:text-teal-800"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="flex-1">{link.label}</span>
            {showBadge && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800">
                {unread}
              </span>
            )}
          </Link>
        )
      })}
    </>
  )
}
