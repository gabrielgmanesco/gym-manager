import Exercise from '../models/Exercise.js'

class ExerciseService {
  static async listAll () {
    const exercises = await Exercise.findAll({
      order: [['muscleGroup', 'ASC'], ['name', 'ASC']]
    })

    return exercises
  }

  static async getById (id) {
    const exercise = await Exercise.findByPk(id)
    if (!exercise) {
      const err = new Error('Exercise not found')
      err.status = 404
      throw err
    }

    return exercise
  }

  static async create ({ name, muscleGroup, description }) {
    if (!name || !muscleGroup) {
      const err = new Error('name and muscleGroup are required')
      err.status = 400
      throw err
    }

    const exercise = await Exercise.create({ name, muscleGroup, description })
    return exercise
  }

  static async update (id, data) {
    const exercise = await this.getById(id)
    const { name, muscleGroup, description } = data

    if (name !== undefined) exercise.name = name
    if (muscleGroup !== undefined) exercise.muscleGroup = muscleGroup
    if (description !== undefined) exercise.description = description

    await exercise.save()
    return exercise
  }

  static async delete (id) {
    const exercise = await this.getById(id)
    await exercise.destroy()
  }
}

export default ExerciseService
