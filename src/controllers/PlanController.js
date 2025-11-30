import PlanService from '../services/PlanService.js'

class PlanController {
  static async index (req, res, next) {
    try {
      const plans = await PlanService.listAll()
      return res.json(plans)
    } catch (error) {
      next(error)
    }
  }

  static async show (req, res, next) {
    try {
      const { id } = req.params
      const plan = await PlanService.getById(id)
      return res.json(plan)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const { name, durationMonths, price } = req.body
      const plan = await PlanService.create({ name, durationMonths, price })
      return res.status(201).json(plan)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const plan = await PlanService.update(id, req.body)
      return res.json(plan)
    } catch (error) {
      next(error)
    }
  }

  static async destroy (req, res, next) {
    try {
      const { id } = req.params
      await PlanService.delete(id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default PlanController
