"use server"

import { addSubscriber } from "@/lib/db"

export async function subscribeNewsletter(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const result = await addSubscriber(email)
  return { ok: result !== "error", exists: result === "exists" }
}
