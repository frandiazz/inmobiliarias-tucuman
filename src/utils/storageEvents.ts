"use client"

export const STORAGE_CHANGE_EVENT = "tucuman-storage-change"

export function emitStorageChange() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT))
}
