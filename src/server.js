import app from './app.js'
import dotenv from 'dotenv'
import { connectDatabase } from './database/index.js'
import './models/index.js'

dotenv.config()

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await connectDatabase()

    app.listen(PORT, () => {
      console.log(`GymManager API is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server')
    process.exit(1)
  }
}

startServer()