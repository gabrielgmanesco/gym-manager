import validator from 'validator'
import { randomUUID } from 'crypto'
import Member from '../models/Member.js'
import Plan from '../models/Plan.js'

class MemberService {
  static async listAll () {
    const members = await Member.findAll({
      include: [
        {
          model: Plan,
          as: 'plan'
        }
      ],
      order: [['name', 'ASC']]
    })

    return members
  }

  static async getById (id) {
    const member = await Member.findByPk(id, {
      include: [
        {
          model: Plan,
          as: 'plan'
        }
      ]
    })

    if (!member) {
      const err = new Error('Member not found')
      err.status = 404
      throw err
    }

    return member
  }

  static async create (data) {
    const {
      name,
      email,
      cpf,
      birthDate,
      phone,
      status = 'active',
      planId
    } = data

    if (!name || !email) {
      const err = new Error('name and email are required')
      err.status = 400
      throw err
    }

    if (!validator.isEmail(email)) {
      const err = new Error('Invalid email')
      err.status = 400
      throw err
    }

    if (cpf && !validator.isLength(cpf, { min: 11, max: 14 })) {
      const err = new Error('Invalid CPF format')
      err.status = 400
      throw err
    }

    if (planId) {
      const plan = await Plan.findByPk(planId)
      if (!plan) {
        const err = new Error('Plan not found')
        err.status = 404
        throw err
      }
    }

    const existingEmail = await Member.findOne({ where: { email } })
    if (existingEmail) {
      const err = new Error('Email already in use')
      err.status = 409
      throw err
    }

    if (cpf) {
      const existingCpf = await Member.findOne({ where: { cpf } })
      if (existingCpf) {
        const err = new Error('CPF already in use')
        err.status = 409
        throw err
      }
    }

    const qrCode = randomUUID()

    const member = await Member.create({
      name,
      email,
      cpf,
      birthDate,
      phone,
      status,
      planId,
      qrCode
    })

    return member
  }

  static async update (id, data) {
    const member = await this.getById(id)

    const {
      name,
      email,
      cpf,
      birthDate,
      phone,
      status,
      planId
    } = data

    if (email && !validator.isEmail(email)) {
      const err = new Error('Invalid email')
      err.status = 400
      throw err
    }

    if (cpf && !validator.isLength(cpf, { min: 11, max: 14 })) {
      const err = new Error('Invalid CPF format')
      err.status = 400
      throw err
    }

    if (planId) {
      const plan = await Plan.findByPk(planId)
      if (!plan) {
        const err = new Error('Plan not found')
        err.status = 404
        throw err
      }
    }

    if (name !== undefined) member.name = name
    if (email !== undefined) member.email = email
    if (cpf !== undefined) member.cpf = cpf
    if (birthDate !== undefined) member.birthDate = birthDate
    if (phone !== undefined) member.phone = phone
    if (status !== undefined) member.status = status
    if (planId !== undefined) member.planId = planId

    await member.save()
    return member
  }

  static async delete (id) {
    const member = await this.getById(id)
    await member.destroy()
  }

  static async regenerateQrCode (id) {
    const member = await this.getById(id)
    member.qrCode = randomUUID()
    await member.save()
    return member
  }

  static async findByQrCode (qrCode) {
    const member = await Member.findOne({
      where: { qrCode },
      include: [{ model: Plan, as: 'plan' }]
    })

    return member
  }
}

export default MemberService
