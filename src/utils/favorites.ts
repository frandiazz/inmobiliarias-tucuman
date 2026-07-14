"use client"

import { useState, useCallback } from "react"
import type { Property } from "@/utils/types"

const STORAGE_KEY = "tucuman-favoritos"

function readIds(): number[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeIds(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function useFavorites() {
  const [ids, setIds] = useState<number[]>(() => readIds())

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      writeIds(next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: number) => ids.includes(id),
    [ids]
  )

  return { ids, toggle, isFavorite }
}

export function getFavoriteIds(): number[] {
  return readIds()
}

export function getFavoriteProperties(allProperties: Property[]): Property[] {
  const ids = readIds()
  return allProperties.filter((p) => ids.includes(p.id))
}
