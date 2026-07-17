"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { subscribeNewsletter } from "@/app/actions"

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "exists" | "error">("idle")

  async function handleSubmit(formData: FormData) {
    setStatus("loading")
    const res = await subscribeNewsletter(formData)
    setStatus(res.ok ? (res.exists ? "exists" : "ok") : "error")
  }

  if (status === "ok" || status === "exists") {
    return (
      <p className="flex items-center gap-2 text-sm text-teal-400">
        <Check className="w-4 h-4" /> {status === "ok" ? "¡Suscripto! Te avisamos novedades." : "Ya estás suscripto."}
      </p>
    )
  }

  return (
    <>
      <form action={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="tu@email.com"
          className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="p-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors disabled:opacity-60"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
      {status === "error" && <p className="mt-2 text-xs text-red-400">Ingresá un email válido.</p>}
    </>
  )
}
