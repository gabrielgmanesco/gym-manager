import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class WorkoutExercise extends Model {}

WorkoutExercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    workoutSheetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'workout_sheet_id'
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'exercise_id'
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reps: {
      type: DataTypes.STRING,
      allowNull: false
    },
    restSeconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'rest_seconds'
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'WorkoutExercise',
    tableName: 'workout_exercises',
    timestamps: true,
    underscored: true
  }
)

export default WorkoutExercise
