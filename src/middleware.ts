import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const COOKIE_NAME = "admin_auth"
const PUBLIC_PATHS = ["/admin/login"]

function getSecret(): string {
  return process.env.ADMIN_COOKIE_SECRET || process.env.ADMIN_PASSWORD || "cambiar-este-secreto"
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex")
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return false
  const expected = sign(payload)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  if (!crypto.timingSafeEqual(a, b)) return false
  const issued = Number(payload)
  if (!Number.isFinite(issued)) return false
  if (Date.now() - issued > 60 * 60 * 8 * 1000) return false
  return true
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith("/admin")) return NextResponse.next()

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next()
  }

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (verifyToken(token)) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = "/admin/login"
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/admin/:path*"],
}
