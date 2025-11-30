import Plan from '../models/Plan.js'

class PlanService {
  static async listAll () {
    const plans = await Plan.findAll({
      order: [['durationMonths', 'ASC']]
    })

    return plans
  }

  static async getById (id) {
    const plan = await Plan.findByPk(id)
    if (!plan) {
      const err = new Error('Plan not found')
      err.status = 404
      throw err
    }

    return plan
  }

  static async create ({ name, durationMonths, price }) {
    if (!name || !durationMonths || !price) {
      const err = new Error('name, durationMonths and price are required')
      err.status = 400
      throw err
    }

    const plan = await Plan.create({ name, durationMonths, price })
    return plan
  }

  static async update (id, data) {
    const plan = await this.getById(id)

    const { name, durationMonths, price } = data

    if (name !== undefined) plan.name = name
    if (durationMonths !== undefined) plan.durationMonths = durationMonths
    if (price !== undefined) plan.price = price

    await plan.save()
    return plan
  }

  static async delete (id) {
    const plan = await this.getById(id)
    await plan.destroy()
  }
}

export default PlanService
