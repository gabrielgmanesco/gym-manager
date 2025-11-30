import { Router } from 'express'
import CheckInController from '../controllers/CheckInController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.post('/', CheckInController.store)

router.get('/today', CheckInController.today)

export default router
