import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10

export function generateToken (payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken (token) {
  return jwt.verify(token, JWT_SECRET)
}

export async function hashPassword (password) {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
}

export async function comparePassword (password, hash) {
  return bcrypt.compare(password, hash)
}
