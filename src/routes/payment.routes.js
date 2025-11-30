import { Router } from 'express'
import PaymentController from '../controllers/PaymentController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', PaymentController.index)
router.get('/:id', PaymentController.show)
router.post('/', PaymentController.store)
router.patch('/:id/pay', PaymentController.markAsPaid)

export default router
