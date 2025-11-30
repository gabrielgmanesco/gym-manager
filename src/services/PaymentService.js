import Payment from '../models/Payment.js'
import Member from '../models/Member.js'
import Plan from '../models/Plan.js'

class PaymentService {
  static async listAll (filters = {}) {
    const { memberId, status } = filters
    const where = {}

    if (memberId) where.memberId = memberId
    if (status) where.status = status

    const payments = await Payment.findAll({
      where,
      include: [
        { model: Member, as: 'member' },
        { model: Plan, as: 'plan' }
      ],
      order: [['dueDate', 'DESC']]
    })

    return payments
  }

  static async getById (id) {
    const payment = await Payment.findByPk(id, {
      include: [
        { model: Member, as: 'member' },
        { model: Plan, as: 'plan' }
      ]
    })

    if (!payment) {
      const err = new Error('Payment not found')
      err.status = 404
      throw err
    }

    return payment
  }

  static async create (data) {
    let {
      memberId,
      planId,
      amount,
      status = 'paid',
      dueDate,
      paidAt
    } = data

    if (!memberId || !planId) {
      const err = new Error('memberId and planId are required')
      err.status = 400
      throw err
    }

    const member = await Member.findByPk(memberId)
    if (!member) {
      const err = new Error('Member not found')
      err.status = 404
      throw err
    }

    const plan = await Plan.findByPk(planId)
    if (!plan) {
      const err = new Error('Plan not found')
      err.status = 404
      throw err
    }

    if (!amount) {
      amount = plan.price
    }

    if (!dueDate) {
      const today = new Date().toISOString().substring(0, 10)
      dueDate = today
    }

    if (status === 'paid' && !paidAt) {
      paidAt = new Date()
    }

    const payment = await Payment.create({
      memberId,
      planId,
      amount,
      status,
      dueDate,
      paidAt
    })

    return this.getById(payment.id)
  }

  static async markAsPaid (id) {
    const payment = await Payment.findByPk(id)
    if (!payment) {
      const err = new Error('Payment not found')
      err.status = 404
      throw err
    }

    payment.status = 'paid'
    payment.paidAt = new Date()
    await payment.save()

    return this.getById(id)
  }
}

export default PaymentService
