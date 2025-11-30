import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class Plan extends Model {}

Plan.init(
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
    durationMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'duration_months'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
    timestamps: true,
    underscored: true
  }
)

export default Plan
