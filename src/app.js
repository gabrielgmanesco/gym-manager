import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

const app = express()

app.use(express.json())

// Health check simples
app.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development'
  })
})

// Rotas principais
app.use('/api', routes)

// Middleware global de erro (sempre por último)
app.use(errorHandler)

export default app
