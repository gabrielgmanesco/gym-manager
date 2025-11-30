import { Router } from 'express'
import WorkoutSheetController from '../controllers/WorkoutSheetController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

// Fichas do membro (Treino A/B/C)
router.get('/members/:memberId', WorkoutSheetController.listByMember)
router.post('/members/:memberId', WorkoutSheetController.storeForMember)

// Ficha específica
router.get('/:id', WorkoutSheetController.show)
router.put('/:id', WorkoutSheetController.update)
router.delete('/:id', WorkoutSheetController.destroy)

export default router
