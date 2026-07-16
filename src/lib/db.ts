import { supabase } from "./supabase"
import type { Agency, Property } from "@/utils/types"

// ── Agency helpers ──

export async function getAgencies(): Promise<Agency[]> {
  const { data } = await supabase.from("agencies").select("*").order("name")
  return (data ?? []).map(mapAgency)
}

export async function getAgencyById(id: number): Promise<Agency | null> {
  const { data } = await supabase.from("agencies").select("*").eq("id", id).single()
  return data ? mapAgency(data) : null
}

// ── Property helpers ──

export async function getProperties(): Promise<Property[]> {
  const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false })
  return (data ?? []).map(mapProperty)
}

export async function getPropertyById(id: number): Promise<Property | null> {
  const { data } = await supabase.from("properties").select("*").eq("id", id).single()
  return data ? mapProperty(data) : null
}

export async function getPropertiesByAgency(agencyId: number): Promise<Property[]> {
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: false })
  return (data ?? []).map(mapProperty)
}

export interface PropertyFilters {
  q?: string
  operation?: string
  tipo?: string
  zona?: string
  priceMin?: number
  priceMax?: number
  beds?: number
  baths?: number
  sort?: string
  page?: number
  limit?: number
  agencyId?: number
}

export interface PaginatedResult {
  properties: Property[]
  total: number
  page: number
  totalPages: number
}

export async function getPropertiesFiltered(filters: PropertyFilters): Promise<PaginatedResult> {
  const page = filters.page ?? 1
  const limit = filters.limit ?? 12
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase.from("properties").select("*", { count: "exact" })

  if (filters.q) {
    query = query.ilike("title", `%${filters.q}%`)
  }
  if (filters.operation) {
    query = query.eq("operation", filters.operation)
  }
  if (filters.tipo) {
    query = query.eq("tipo", filters.tipo)
  }
  if (filters.zona) {
    query = query.eq("zona", filters.zona)
  }
  if (filters.beds) {
    query = query.gte("beds", filters.beds)
  }
  if (filters.baths) {
    query = query.gte("baths", filters.baths)
  }
  if (filters.agencyId) {
    query = query.eq("agency_id", filters.agencyId)
  }

  let sortColumn = "created_at"
  let ascending = false

  if (filters.sort === "price_asc") {
    sortColumn = "price"
    ascending = true
  } else if (filters.sort === "price_desc") {
    sortColumn = "price"
    ascending = false
  }

  query = query.order(sortColumn, { ascending }).range(from, to)

  const { data, count, error } = await query

  if (error) {
    console.error("Error fetching properties:", error)
    return { properties: [], total: 0, page, totalPages: 0 }
  }

  return {
    properties: (data ?? []).map(mapProperty),
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / limit),
  }
}

export async function getZones(): Promise<string[]> {
  const { data } = await supabase.from("properties").select("zona")
  if (!data) return []
  return [...new Set(data.map((r: any) => r.zona))].sort() as string[]
}

export async function getPropertyTypes(): Promise<string[]> {
  const { data } = await supabase.from("properties").select("tipo")
  if (!data) return []
  return [...new Set(data.map((r: any) => r.tipo))].sort() as string[]
}

export async function getLatestProperties(limit = 6): Promise<Property[]> {
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit)
  return (data ?? []).map(mapProperty)
}

export async function getPropertiesCount(): Promise<number> {
  const { count } = await supabase.from("properties").select("*", { count: "exact", head: true })
  return count ?? 0
}

export async function getAgenciesCount(): Promise<number> {
  const { count } = await supabase.from("agencies").select("*", { count: "exact", head: true })
  return count ?? 0
}

// ── Admin CRUD ──

export async function addAgency(data: Omit<Agency, "id">): Promise<Agency | null> {
  const { data: result, error } = await supabase.from("agencies").insert(data).select().single()
  if (error) { console.error(error); return null }
  return mapAgency(result)
}

export async function deleteAgency(id: number): Promise<boolean> {
  const { error } = await supabase.from("agencies").delete().eq("id", id)
  return !error
}

export async function addProperty(data: any): Promise<any | null> {
  const row = {
    agency_id: data.agencyId ?? data.agency_id,
    image: data.image ?? "",
    images: data.images ?? [],
    operation: data.operation,
    price: data.price,
    title: data.title,
    beds: data.beds ?? 0,
    baths: data.baths ?? 0,
    area: data.area ?? 0,
    agency_name: data.agency ?? data.agency_name ?? "",
    created_at: data.createdAt ?? data.created_at ?? new Date().toISOString(),
    zona: data.zona ?? "",
    tipo: data.tipo ?? "",
    description: data.description ?? null,
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
    published: data.published ?? true,
  }
  const { data: result, error } = await supabase.from("properties").insert(row).select().single()
  if (error) { console.error(error); return null }
  return result
}

export async function updateProperty(id: number, data: any): Promise<boolean> {
  const row: any = {}
  if (data.title !== undefined) row.title = data.title
  if (data.operation !== undefined) row.operation = data.operation
  if (data.price !== undefined) row.price = data.price
  if (data.beds !== undefined) row.beds = data.beds
  if (data.baths !== undefined) row.baths = data.baths
  if (data.area !== undefined) row.area = data.area
  if (data.image !== undefined) row.image = data.image
  if (data.images !== undefined) row.images = data.images
  if (data.zona !== undefined) row.zona = data.zona
  if (data.tipo !== undefined) row.tipo = data.tipo
  if (data.description !== undefined) row.description = data.description
  if (data.published !== undefined) row.published = data.published
  if (data.agencyId !== undefined) row.agency_id = data.agencyId
  if (data.agency !== undefined) row.agency_name = data.agency

  const { error } = await supabase.from("properties").update(row).eq("id", id)
  return !error
}

export async function deleteProperty(id: number): Promise<boolean> {
  const { error } = await supabase.from("properties").delete().eq("id", id)
  return !error
}

// ── Mappers ──

function mapAgency(row: any): Agency {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    description: row.description,
  }
}

function mapProperty(row: any): Property {
  return {
    id: row.id,
    agencyId: row.agency_id,
    image: row.image,
    operation: row.operation,
    price: row.price,
    title: row.title,
    beds: row.beds,
    baths: row.baths,
    area: row.area,
    agency: row.agency_name,
    createdAt: row.created_at,
    zona: row.zona,
    tipo: row.tipo,
    description: row.description ?? null,
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,
    antiguedad: row.antiguedad ?? null,
    estado: row.estado ?? null,
  }
}
