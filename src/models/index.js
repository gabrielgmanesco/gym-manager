import User from './User.js'
import Plan from './Plan.js'
import Member from './Member.js'
import Exercise from './Exercise.js'
import WorkoutSheet from './WorkoutSheet.js'
import WorkoutExercise from './WorkoutExercise.js'
import Payment from './Payment.js'
import CheckIn from './CheckIn.js'

Plan.hasMany(Member, { foreignKey: 'plan_id', as: 'members' })
Member.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' })

Member.hasMany(WorkoutSheet, { foreignKey: 'member_id', as: 'workoutSheets' })
WorkoutSheet.belongsTo(Member, { foreignKey: 'member_id', as: 'member' })

WorkoutSheet.belongsToMany(Exercise, {
  through: WorkoutExercise,
  foreignKey: 'workout_sheet_id',
  otherKey: 'exercise_id',
  as: 'exercises'
})

Exercise.belongsToMany(WorkoutSheet, {
  through: WorkoutExercise,
  foreignKey: 'exercise_id',
  otherKey: 'workout_sheet_id',
  as: 'workoutSheets'
})

Member.hasMany(Payment, { foreignKey: 'member_id', as: 'payments' })
Payment.belongsTo(Member, { foreignKey: 'member_id', as: 'member' })

Plan.hasMany(Payment, { foreignKey: 'plan_id', as: 'payments' })
Payment.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' })

Member.hasMany(CheckIn, { foreignKey: 'member_id', as: 'checkins' })
CheckIn.belongsTo(Member, { foreignKey: 'member_id', as: 'member' })

export {
  User,
  Plan,
  Member,
  Exercise,
  WorkoutSheet,
  WorkoutExercise,
  Payment,
  CheckIn
}
