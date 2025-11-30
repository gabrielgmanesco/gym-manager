import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class WorkoutSheet extends Model {}

WorkoutSheet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'member_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'WorkoutSheet',
    tableName: 'workout_sheets',
    timestamps: true,
    underscored: true
  }
)

export default WorkoutSheet
