import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Banco na raiz do projeto (fora do src) para evitar conflito com volumes Docker
const storage = process.env.DB_STORAGE || path.join(__dirname, '../../database/database.sqlite')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
  define: {
    underscored: true // created_at / updated_at
  }
})

async function connectDatabase () {
  try {
    await sequelize.authenticate()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error
  }
}

export { sequelize, connectDatabase }
