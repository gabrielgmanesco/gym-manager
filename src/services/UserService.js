import validator from 'validator'
import User from '../models/User.js'
import { hashPassword, comparePassword, generateToken } from '../helpers/auth.js'

class UserService {
  static async register ({ name, email, password, role = 'admin' }) {
    if (!name || !email || !password) {
      const error = new Error('Name, email and password are required')
      error.status = 400
      throw error
    }

    if (!validator.isEmail(email)) {
      const error = new Error('Invalid email')
      error.status = 400
      throw error
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      const error = new Error('Email already in use')
      error.status = 409
      throw error
    }

    if (!validator.isLength(password, { min: 6 })) {
      const error = new Error('Password must be at least 6 characters long')
      error.status = 400
      throw error
    }

    const passwordHash = await hashPassword(password)

    const user = await User.create({
      name,
      email,
      password_hash: passwordHash,
      role
    })

    return user
  }

  static async login ({ email, password }) {
    if (!email || !password) {
      const error = new Error('Email and password are required')
      error.status = 400
      throw error
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      const error = new Error('Invalid credentials')
      error.status = 401
      throw error
    }

    const isValidPassword = await comparePassword(password, user.password_hash)

    if (!isValidPassword) {
      const error = new Error('Invalid credentials')
      error.status = 401
      throw error
    }

    const token = generateToken({ id: user.id, role: user.role })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  }

  static async getById (id) {
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    })

    return user
  }
}

export default UserService
