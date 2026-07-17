export interface Agency {
  id: number
  name: string
  phone: string
  whatsapp: string
  email: string
  description: string
  logoUrl?: string | null
}

export interface Property {
  id: number
  agencyId: number
  image: string
  images?: string[]
  operation: "Venta" | "Alquiler"
  price: string
  title: string
  beds: number
  baths: number
  area: number
  agency: string
  createdAt: string
  zona: string
  tipo: string
  description?: string | null
  latitude?: number | null
  longitude?: number | null
  antiguedad?: string | null
  estado?: string | null
  published?: boolean
}
