import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://icdmbqcokjrkiyrnyooc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZG1icWNva2pya2l5cm55b29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5OTg3OTEsImV4cCI6MjA5OTU3NDc5MX0.12T7kOrqXcodE77jHVolPPMbWOuS2-0c6PfGfU-pvkU'

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: { get: () => undefined } },
})

// ── Agencias originales ──
const agencias = [
  { name: 'Inmobiliaria Aconquija', phone: '381 555-0101', whatsapp: '5493815550101', email: 'info@aconquija.com', description: 'Más de 15 años de experiencia en el mercado inmobiliario tucumano.' },
  { name: 'Tucumán Propiedades', phone: '381 555-0102', whatsapp: '5493815550102', email: 'contacto@tucumanpropiedades.com', description: 'Especialistas en propiedades residenciales y comerciales.' },
  { name: 'Norte Raíces', phone: '381 555-0103', whatsapp: '5493815550103', email: 'info@norteraices.com', description: 'Tu conexión con las mejores propiedades del norte argentino.' },
  { name: 'San Miguel Inmuebles', phone: '381 555-0104', whatsapp: '5493815550104', email: 'ventas@santiguelinmuebles.com', description: 'Compromiso y transparencia en cada operación.' },
  { name: 'Citrus Propiedades', phone: '381 555-0105', whatsapp: '5493815550105', email: 'info@citrusprop.com', description: 'Propiedades con estilo y calidad de vida.' },
  { name: 'Lomas Negocio Inmobiliario', phone: '381 555-0106', whatsapp: '5493815550106', email: 'contacto@lomasnegocio.com', description: 'Expertos en el mercado de Lomas de Tafí.' },
  { name: 'Sierras del Norte', phone: '381 555-0107', whatsapp: '5493815550107', email: 'info@sierrasdelnorte.com', description: 'Viví la experiencia de las sierras tucumanas.' },
  { name: 'Portal Inmobiliario Tucumán', phone: '381 555-0108', whatsapp: '5493815550108', email: 'info@portaltucuman.com', description: 'El portal que conecta personas con su hogar ideal.' },
  { name: 'Alto Verde Propiedades', phone: '381 555-0109', whatsapp: '5493815550109', email: 'ventas@altoverde.com', description: 'Calidad y confianza en bienes raíces.' },
  { name: 'Soler Bienes Raíces', phone: '381 555-0110', whatsapp: '5493815550110', email: 'info@solerbienes.com', description: 'Tradición y profesionalismo en el mercado inmobiliario.' },
]

const zonas = ['Yerba Buena', 'Barrio Norte', 'Barrio Sur', 'Tafí Viejo', 'El Corte', 'Lomas de Tafí', 'San Pablo']
const tipos = ['Casa', 'Departamento', 'Dúplex', 'Terreno']

const imagenes = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb4b3f2?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600563442515-1f1f0c0b5e5a?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
]

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

async function seed() {
  // 1. Insertar agencias
  const { data: agencies, error: errA } = await supabase.from('agencies').insert(agencias).select()
  if (errA) { console.error('Error al insertar agencias:', errA); return }
  console.log(`${agencies.length} agencias insertadas`)

  // 2. Generar 500 propiedades
  const properties = []
  const titulos = {
    Casa: ['Casa de {dorm} dormitorios en {zona}', 'Casa con pileta en {zona}', 'Casa familiar en {zona}', 'Casa moderna en {zona}', 'Casa con jardín en {zona}', 'Casa quinta en {zona}', 'Casa en {zona} a estrenar'],
    Departamento: ['Departamento de {dorm} ambientes en {zona}', 'PH en {zona}', 'Departamento luminoso en {zona}', 'Monoambiente en {zona}', 'Departamento céntrico en {zona}', 'Departamento con balcón en {zona}', 'Departamento a estrenar en {zona}'],
    Dúplex: ['Dúplex de {dorm} dormitorios en {zona}', 'Dúplex con cochera en {zona}', 'Dúplex en {zona}', 'Dúplex moderno en {zona}'],
    Terreno: ['Terreno en {zona}', 'Lote en {zona}', 'Terreno con vista a las sierras en {zona}', 'Terreno urbano en {zona}', 'Lote con servicios en {zona}'],
  }

  function genTitle(tipo, dorm, zona) {
    const t = titulos[tipo] ?? titulos.Casa
    return pick(t).replace('{dorm}', String(dorm)).replace('{zona}', zona)
  }

  function daysAgo(n) {
    const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString()
  }

  for (let i = 0; i < 500; i++) {
    const zona = pick(zonas)
    const tipo = pick(tipos)
    const operation = Math.random() < 0.7 ? 'Venta' : 'Alquiler'
    const isTerreno = tipo === 'Terreno'
    const agency = pick(agencies)

    let price, beds, baths, area

    if (operation === 'Venta') {
      price = `USD ${rand(40_000, 350_000).toLocaleString('es-AR')}`
    } else {
      price = `$ ${rand(150_000, 600_000).toLocaleString('es-AR')}/mes`
    }

    if (isTerreno) {
      beds = 0; baths = 0; area = rand(250, 1200)
    } else if (tipo === 'Departamento') {
      beds = rand(1, 3); baths = rand(1, 2); area = rand(30, 120)
    } else if (tipo === 'Dúplex') {
      beds = rand(2, 4); baths = rand(1, 3); area = rand(80, 200)
    } else {
      beds = rand(2, 5); baths = rand(1, 3); area = rand(80, 400)
    }

    properties.push({
      agency_id: agency.id,
      image: pick(imagenes),
      images: [pick(imagenes), pick(imagenes), pick(imagenes)],
      operation,
      price,
      title: genTitle(tipo, beds, zona),
      beds,
      baths,
      area,
      agency_name: agency.name,
      created_at: daysAgo(rand(0, 90)),
      zona,
      tipo,
      published: true,
    })
  }

  // Insertar en lotes de 50
  for (let i = 0; i < properties.length; i += 50) {
    const batch = properties.slice(i, i + 50)
    const { error: errP } = await supabase.from('properties').insert(batch)
    if (errP) { console.error(`Error lote ${i}:`, errP); return }
    console.log(`Propiedades ${i + 1}-${Math.min(i + 50, properties.length)} insertadas`)
  }

  console.log('Seed completado exitosamente!')
  process.exit(0)
}

seed().catch(e => { console.error(e); process.exit(1) })
