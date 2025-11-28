import UserService from '../services/UserService.js'

class AuthController {
  static async register (req, res, next) {
    try {
      const { name, email, password, role } = req.body

      const user = await UserService.register({ name, email, password, role })

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      })
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body

      const result = await UserService.login({ email, password })

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async me (req, res, next) {
    try {
      const userId = req.userId

      const user = await UserService.getById(userId)

      if (!user) {
        const err = new Error('User not found')
        err.status = 404
        throw err
      }

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
