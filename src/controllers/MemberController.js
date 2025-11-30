import MemberService from '../services/MemberService.js'

class MemberController {
  static async index (req, res, next) {
    try {
      const members = await MemberService.listAll()
      return res.json(members)
    } catch (error) {
      next(error)
    }
  }

  static async show (req, res, next) {
    try {
      const { id } = req.params
      const member = await MemberService.getById(id)
      return res.json(member)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const member = await MemberService.create(req.body)
      return res.status(201).json(member)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const member = await MemberService.update(id, req.body)
      return res.json(member)
    } catch (error) {
      next(error)
    }
  }

  static async destroy (req, res, next) {
    try {
      const { id } = req.params
      await MemberService.delete(id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  static async regenerateQrCode (req, res, next) {
    try {
      const { id } = req.params
      const member = await MemberService.regenerateQrCode(id)
      return res.json({
        id: member.id,
        qrCode: member.qrCode
      })
    } catch (error) {
      next(error)
    }
  }
}

export default MemberController
