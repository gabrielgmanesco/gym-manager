import WorkoutSheetService from '../services/WorkoutSheetService.js'

class WorkoutSheetController {
  static async listByMember (req, res, next) {
    try {
      const { memberId } = req.params
      const sheets = await WorkoutSheetService.listByMember(memberId)
      return res.json(sheets)
    } catch (error) {
      next(error)
    }
  }

  static async storeForMember (req, res, next) {
    try {
      const { memberId } = req.params
      const sheet = await WorkoutSheetService.createForMember(memberId, req.body)
      return res.status(201).json(sheet)
    } catch (error) {
      next(error)
    }
  }

  static async show (req, res, next) {
    try {
      const { id } = req.params
      const sheet = await WorkoutSheetService.getWithExercises(id)
      return res.json(sheet)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const sheet = await WorkoutSheetService.update(id, req.body)
      return res.json(sheet)
    } catch (error) {
      next(error)
    }
  }

  static async destroy (req, res, next) {
    try {
      const { id } = req.params
      await WorkoutSheetService.delete(id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default WorkoutSheetController
