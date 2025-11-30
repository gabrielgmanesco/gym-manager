import { Router } from 'express'
import PlanController from '../controllers/PlanController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', PlanController.index)
router.get('/:id', PlanController.show)
router.post('/', PlanController.store)
router.put('/:id', PlanController.update)
router.delete('/:id', PlanController.destroy)

export default router
