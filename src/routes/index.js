import { Router } from 'express'
import authRoutes from './auth.routes.js'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'GymManager API v1' })
})

router.use('/auth', authRoutes)

export default router
