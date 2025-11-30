import { Op } from 'sequelize'
import Member from '../models/Member.js'
import CheckIn from '../models/CheckIn.js'

class DashboardService {
  static async getSummary () {
    const totalMembers = await Member.count()
    const activeMembers = await Member.count({ where: { status: 'active' } })
    const inactiveMembers = await Member.count({ where: { status: 'inactive' } })

    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const end = new Date()
    end.setHours(23, 59, 59, 999)

    const todayCheckIns = await CheckIn.count({
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      }
    })

    return {
      totalMembers,
      activeMembers,
      inactiveMembers,
      todayCheckIns
    }
  }
}

export default DashboardService
