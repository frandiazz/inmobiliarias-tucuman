const { PrismaClient } = require('C:/Users/Usuario/Desktop/PROYECTOS/inmobiliarias_tucuman/src/generated/prisma')

const p = new PrismaClient({
  datasourceUrl: 'postgresql://postgres:45726894Fran@db.icdmbqcokjrkiyrnyooc.supabase.co:5432/postgres'
})

p.$queryRawUnsafe('SELECT 1 AS ok')
  .then(r => { console.log('OK', JSON.stringify(r)); process.exit(0) })
  .catch(e => { console.error(e.message); process.exit(1) })
