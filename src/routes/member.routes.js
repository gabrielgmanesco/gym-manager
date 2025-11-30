import { Router } from 'express'
import MemberController from '../controllers/MemberController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', MemberController.index)
router.get('/:id', MemberController.show)
router.post('/', MemberController.store)
router.put('/:id', MemberController.update)
router.delete('/:id', MemberController.destroy)

// Regenerar QR Code de um membro
router.post('/:id/regenerate-qrcode', MemberController.regenerateQrCode)

export default router
