"use client"

import { useState, useEffect } from "react"
import { STORAGE_CHANGE_EVENT } from "@/utils/storageEvents"

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
    window.addEventListener(STORAGE_CHANGE_EVENT, update)
    window.addEventListener("storage", update)
    return () => {
      window.removeEventListener(STORAGE_CHANGE_EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [])

  return { favorites, compare }
}
