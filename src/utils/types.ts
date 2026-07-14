export interface Agency {
  id: number
  name: string
  phone: string
  whatsapp: string
  email: string
  description: string
}

export interface Property {
  id: number
  agencyId: number
  image: string
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
}
