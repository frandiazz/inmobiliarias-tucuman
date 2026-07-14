import { getProperties } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const properties = await getProperties()
  return NextResponse.json(properties)
}
