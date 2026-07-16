"use client"

import { useState } from "react"

export default function ConfirmDelete({
  action,
  message = "¿Estás seguro? Esta acción no se puede deshacer.",
  className,
  children,
}: {
  action: (formData: FormData) => void
  message?: string
  className?: string
  children: React.ReactNode
}) {
  const [pending, setPending] = useState(false)

  return (
    <button
      type="submit"
      formAction={(formData) => {
        if (typeof window !== "undefined" && !window.confirm(message)) return
        setPending(true)
        action(formData)
      }}
      disabled={pending}
      className={className}
    >
      {children}
    </button>
  )
}
