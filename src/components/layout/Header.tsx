"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Mountain, Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/inmobiliarias", label: "Inmobiliarias" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/publicar", label: "Publicar" },
]

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-teal-800 font-bold text-xl shrink-0">
            <Mountain className="w-7 h-7" />
            <span>Tucumán Inmuebles</span>
          </Link>

          <nav className="hidden md:flex nav-tabs">
            {navLinks.map((link) => (
              <span key={link.href} className="nav-tab">
                <Link
                  href={link.href}
                  className={`${pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="px-4 py-2 border border-teal-800 text-teal-800 rounded-lg hover:bg-teal-50 font-medium text-sm transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/contacto"
              className="btn-pill text-sm px-5 py-2"
            >
              Contacto
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-teal-800"
            aria-label="Menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4">
            <div className="bg-gray-100 rounded-xl p-1.5 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-slate-800 shadow-sm font-semibold"
                        : "text-slate-600 hover:bg-white/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
            <hr className="border-gray-200 my-3" />
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-center border border-teal-800 text-teal-800 font-medium rounded-xl hover:bg-teal-800 hover:text-white transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className="btn-pill w-full justify-center"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
