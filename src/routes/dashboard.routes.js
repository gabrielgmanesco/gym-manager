import { Router } from 'express'
import DashboardController from '../controllers/DashboardController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/summary', DashboardController.summary)

export default router
