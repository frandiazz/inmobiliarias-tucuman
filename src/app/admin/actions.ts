"use server"

import { cookies } from "next/headers"
import crypto from "crypto"
import { redirect } from "next/navigation"

const COOKIE_NAME = "admin_auth"
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 horas

function getSecret(): string {
  return process.env.ADMIN_COOKIE_SECRET || process.env.ADMIN_PASSWORD || "cambiar-este-secreto"
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex")
}

function createToken(): string {
  const payload = Date.now().toString()
  return `${payload}.${sign(payload)}`
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return false
  const expected = sign(payload)
  // comparación de tiempo constante
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  if (!crypto.timingSafeEqual(a, b)) return false
  const issued = Number(payload)
  if (!Number.isFinite(issued)) return false
  if (Date.now() - issued > COOKIE_MAX_AGE * 1000) return false
  return true
}

export async function loginAction(password: string) {
  const valid = process.env.ADMIN_PASSWORD ?? "admin123"
  // comparación de tiempo constante para no filtrar la longitud
  const a = Buffer.from(password)
  const b = Buffer.from(valid)
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b)

  if (!ok) {
    return { ok: false }
  }

  const store = await cookies()
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })

  return { ok: true }
}

export async function logoutAction() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
  redirect("/admin/login")
}
