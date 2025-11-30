import { Router } from 'express'
import authRoutes from './auth.routes.js'
import planRoutes from './plan.routes.js'
import memberRoutes from './member.routes.js'
import checkinRoutes from './checkin.routes.js'
import dashboardRoutes from './dashboard.routes.js'
import exerciseRoutes from './exercise.routes.js'
import workoutRoutes from './workout.routes.js'
import paymentRoutes from './payment.routes.js'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'GymManager API v1' })
})

router.use('/auth', authRoutes)
router.use('/plans', planRoutes)
router.use('/members', memberRoutes)
router.use('/checkins', checkinRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/exercises', exerciseRoutes)
router.use('/workouts', workoutRoutes)
router.use('/payments', paymentRoutes)

export default router
