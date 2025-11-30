import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class Exercise extends Model {}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    muscleGroup: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'muscle_group'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Exercise',
    tableName: 'exercises',
    timestamps: true,
    underscored: true
  }
)

export default Exercise
