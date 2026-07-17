"use client"

import { useState, useCallback, useEffect } from "react"
import type { Property } from "@/utils/types"
import { emitStorageChange } from "@/utils/storageEvents"

const STORAGE_KEY = "tucuman-comparar"
const MAX_COMPARE = 4

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

export function useCompare() {
  const [ids, setIds] = useState<number[]>(() => readIds())

  useEffect(() => {
    writeIds(ids)
    emitStorageChange()
  }, [ids])

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id)
      }
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, id]
    })
  }, [])

  const isSelected = useCallback((id: number) => ids.includes(id), [ids])
  const canSelect = ids.length < MAX_COMPARE

  return { ids, toggle, isSelected, canSelect }
}

export async function getCompareProperties(): Promise<Property[]> {
  const ids = readIds()
  if (ids.length === 0) return []
  const res = await fetch("/api/properties")
  const all: Property[] = await res.json()
  return all.filter((p) => ids.includes(p.id))
}
