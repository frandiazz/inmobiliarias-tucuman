import { NextResponse } from "next/server"
import { addAgency } from "@/lib/db"

export async function POST(request: Request) {
  const body = await request.json()
  const agency = await addAgency(body)
  if (!agency) return NextResponse.json({ error: "Error al crear agencia" }, { status: 500 })
  return NextResponse.json(agency, { status: 201 })
}
