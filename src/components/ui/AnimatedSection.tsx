"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setArmed(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`${className} ${armed && !visible ? "opacity-0" : "animate-fade-in-up"}`}
    >
      {children}
    </div>
  )
}
