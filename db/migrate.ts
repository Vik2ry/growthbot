import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

async function main() {
  console.log('⏳ Running migrations...')

  const start = Date.now()

  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' })
    console.log('✅ Migrations completed successfully')
  } catch (error) {
    console.error('❌ Migration failed')
    console.error(error)
    process.exit(1)
  }

  const end = Date.now()
  console.log(`✅ Migrations completed in ${end - start} ms`)

  await prisma.$disconnect()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })