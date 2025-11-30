import PaymentService from '../services/PaymentService.js'

class PaymentController {
  static async index (req, res, next) {
    try {
      const { memberId, status } = req.query
      const payments = await PaymentService.listAll({ memberId, status })
      return res.json(payments)
    } catch (error) {
      next(error)
    }
  }

  static async show (req, res, next) {
    try {
      const { id } = req.params
      const payment = await PaymentService.getById(id)
      return res.json(payment)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const payment = await PaymentService.create(req.body)
      return res.status(201).json(payment)
    } catch (error) {
      next(error)
    }
  }

  static async markAsPaid (req, res, next) {
    try {
      const { id } = req.params
      const payment = await PaymentService.markAsPaid(id)
      return res.json(payment)
    } catch (error) {
      next(error)
    }
  }
}

export default PaymentController
