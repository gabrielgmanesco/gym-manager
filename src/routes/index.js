import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'GymManager API v1' })
})

export default router
