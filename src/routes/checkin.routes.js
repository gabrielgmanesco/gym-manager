import { Router } from 'express'
import CheckInController from '../controllers/CheckInController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

// Check-in via QR Code não precisa necessariamente do admin logado.
// Mas vamos exigir auth pra simplificar por enquanto:
router.use(authMiddleware)

// Faz check-in (simulação de leitura do QR)
router.post('/', CheckInController.store)

// Lista check-ins de hoje
router.get('/today', CheckInController.today)

export default router
