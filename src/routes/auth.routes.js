import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

// Criação de usuário (admin / staff)
// Em produção, isso costuma ser restrito
router.post('/register', AuthController.register)

// Login
router.post('/login', AuthController.login)

// Usuário logado (rota protegida)
router.get('/me', authMiddleware, AuthController.me)

export default router
