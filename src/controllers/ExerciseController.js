import ExerciseService from '../services/ExerciseService.js'

class ExerciseController {
  static async index (req, res, next) {
    try {
      const exercises = await ExerciseService.listAll()
      return res.json(exercises)
    } catch (error) {
      next(error)
    }
  }

  static async show (req, res, next) {
    try {
      const { id } = req.params
      const exercise = await ExerciseService.getById(id)
      return res.json(exercise)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const { name, muscleGroup, description } = req.body
      const exercise = await ExerciseService.create({ name, muscleGroup, description })
      return res.status(201).json(exercise)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const exercise = await ExerciseService.update(id, req.body)
      return res.json(exercise)
    } catch (error) {
      next(error)
    }
  }

  static async destroy (req, res, next) {
    try {
      const { id } = req.params
      await ExerciseService.delete(id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default ExerciseController
