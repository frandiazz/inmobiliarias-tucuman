"use client"

import { useState, useEffect } from "react"

function readIds(key: string): number[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as number[]) : []
  } catch {
    return []
  }
}

export function useStoredCounts() {
  const [favorites, setFavorites] = useState(0)
  const [compare, setCompare] = useState(0)

  useEffect(() => {
    const update = () => {
      setFavorites(readIds("tucuman-favoritos").length)
      setCompare(readIds("tucuman-comparar").length)
    }
    update()
    window.addEventListener("storage", update)
    const interval = setInterval(update, 500)
    return () => {
      window.removeEventListener("storage", update)
      clearInterval(interval)
    }
  }, [])

  return { favorites, compare }
}
