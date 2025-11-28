import { verifyToken } from '../helpers/auth.js'

export function authMiddleware (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid token format' })
  }

  try {
    const decoded = verifyToken(token)

    req.userId = decoded.id
    req.userRole = decoded.role

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
