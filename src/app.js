import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { sequelize } from './database/index.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './docs/swagger.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development'
  })
})

app.get('/health/db', async (req, res) => {
  try {
    await sequelize.authenticate()
    return res.status(200).json({ database: 'ok' })
  } catch (error) {
    return res.status(500).json({ database: 'error', message: error.message })
  }
})

app.use('/api', routes)

app.use(errorHandler)

export default app
