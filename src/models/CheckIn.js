import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class CheckIn extends Model {}

CheckIn.init(
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
    }
  },
  {
    sequelize,
    modelName: 'CheckIn',
    tableName: 'checkins',
    timestamps: true,
    underscored: true
  }
)

export default CheckIn
