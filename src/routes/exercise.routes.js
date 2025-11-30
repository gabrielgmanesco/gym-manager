import { Router } from 'express'
import ExerciseController from '../controllers/ExerciseController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', ExerciseController.index)
router.get('/:id', ExerciseController.show)
router.post('/', ExerciseController.store)
router.put('/:id', ExerciseController.update)
router.delete('/:id', ExerciseController.destroy)

export default router
