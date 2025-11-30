import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = process.env.DB_STORAGE || path.join(__dirname, '../../database/database.sqlite')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
  define: {
    underscored: true
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
