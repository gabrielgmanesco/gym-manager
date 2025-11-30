import { Op } from 'sequelize'
import CheckIn from '../models/CheckIn.js'
import Member from '../models/Member.js'
import MemberService from './MemberService.js'

class CheckInService {
  static async createFromQrCode (qrCode) {
    if (!qrCode) {
      const err = new Error('qrCode is required')
      err.status = 400
      throw err
    }

    const member = await MemberService.findByQrCode(qrCode)

    if (!member) {
      const err = new Error('Member not found for this QR Code')
      err.status = 404
      throw err
    }

    if (member.status !== 'active') {
      const err = new Error('Member is not active')
      err.status = 403
      throw err
    }

    const checkIn = await CheckIn.create({
      memberId: member.id
    })

    return {
      member,
      checkIn
    }
  }

  static async listToday () {
    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const end = new Date()
    end.setHours(23, 59, 59, 999)

    const checkins = await CheckIn.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      include: [
        {
          model: Member,
          as: 'member'
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    return checkins
  }
}

export default CheckInService
