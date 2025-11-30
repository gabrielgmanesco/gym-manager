import DashboardService from '../services/DashboardService.js'

class DashboardController {
  static async summary (req, res, next) {
    try {
      const data = await DashboardService.getSummary()
      return res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

export default DashboardController
