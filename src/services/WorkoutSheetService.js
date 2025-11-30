import Member from '../models/Member.js'  
import WorkoutSheet from '../models/WorkoutSheet.js'
import WorkoutExercise from '../models/WorkoutExercise.js'
import Exercise from '../models/Exercise.js'

class WorkoutSheetService {
  static async listByMember (memberId) {
    const member = await Member.findByPk(memberId)
    if (!member) {
      const err = new Error('Member not found')
      err.status = 404
      throw err
    }

    const sheets = await WorkoutSheet.findAll({
      where: { memberId },
      include: [
        {
          model: Exercise,
          as: 'exercises',
          through: {
            attributes: ['id', 'sets', 'reps', 'restSeconds', 'observation']
          }
        }
      ],
      order: [['name', 'ASC']]
    })

    return sheets
  }

  static async getWithExercises (id) {
    const sheet = await WorkoutSheet.findByPk(id, {
      include: [
        {
          model: Exercise,
          as: 'exercises',
          through: {
            attributes: ['id', 'sets', 'reps', 'restSeconds', 'observation']
          }
        }
      ]
    })

    if (!sheet) {
      const err = new Error('Workout sheet not found')
      err.status = 404
      throw err
    }

    return sheet
  }

  static async createForMember (memberId, { name, exercises = [] }) {
    const member = await Member.findByPk(memberId)
    if (!member) {
      const err = new Error('Member not found')
      err.status = 404
      throw err
    }

    if (!name) {
      const err = new Error('name is required')
      err.status = 400
      throw err
    }

    const sheet = await WorkoutSheet.create({
      memberId,
      name
    })

    if (Array.isArray(exercises) && exercises.length > 0) {
      for (const item of exercises) {
        const { exerciseId, sets, reps, restSeconds, observation } = item

        const exercise = await Exercise.findByPk(exerciseId)
        if (!exercise) {
          const err = new Error(`Exercise not found: ${exerciseId}`)
          err.status = 404
          throw err
        }

        await WorkoutExercise.create({
          workoutSheetId: sheet.id,
          exerciseId,
          sets,
          reps,
          restSeconds,
          observation
        })
      }
    }

    return this.getWithExercises(sheet.id)
  }

  static async update (id, data) {
    const sheet = await WorkoutSheet.findByPk(id)

    if (!sheet) {
      const err = new Error('Workout sheet not found')
      err.status = 404
      throw err
    }

    const { name, exercises } = data

    if (name !== undefined) {
      sheet.name = name
      await sheet.save()
    }

    if (Array.isArray(exercises)) {
      await WorkoutExercise.destroy({ where: { workoutSheetId: id } })

      for (const item of exercises) {
        const { exerciseId, sets, reps, restSeconds, observation } = item

        const exercise = await Exercise.findByPk(exerciseId)
        if (!exercise) {
          const err = new Error(`Exercise not found: ${exerciseId}`)
          err.status = 404
          throw err
        }

        await WorkoutExercise.create({
          workoutSheetId: id,
          exerciseId,
          sets,
          reps,
          restSeconds,
          observation
        })
      }
    }

    return this.getWithExercises(id)
  }

  static async delete (id) {
    const sheet = await WorkoutSheet.findByPk(id)
    if (!sheet) {
      const err = new Error('Workout sheet not found')
      err.status = 404
      throw err
    }

    await sheet.destroy()
  }
}

export default WorkoutSheetService
