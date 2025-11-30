import CheckInService from '../services/CheckInService.js'

class CheckInController {
  static async store (req, res, next) {
    try {
      const { qrCode } = req.body
      const result = await CheckInService.createFromQrCode(qrCode)

      return res.status(201).json({
        member: {
          id: result.member.id,
          name: result.member.name,
          email: result.member.email,
          status: result.member.status
        },
        checkIn: {
          id: result.checkIn.id,
          createdAt: result.checkIn.createdAt
        }
      })
    } catch (error) {
      next(error)
    }
  }

  static async today (req, res, next) {
    try {
      const checkins = await CheckInService.listToday()
      return res.json(checkins)
    } catch (error) {
      next(error)
    }
  }
}

export default CheckInController
