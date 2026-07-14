"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [display, setDisplay] = useState(children)
  const [transitioning, setTransitioning] = useState(false)
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPath.current) {
      setTransitioning(true)
      const timer = setTimeout(() => {
        setDisplay(children)
        setTransitioning(false)
        prevPath.current = pathname
      }, 200)
      return () => clearTimeout(timer)
    } else {
      setDisplay(children)
    }
  }, [pathname, children])

  return (
    <div className={`transition-all duration-300 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
      {display}
    </div>
  )
}
