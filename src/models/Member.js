import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class Member extends Model {}

Member.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'birth_date'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active'
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'qr_code'
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'plan_id'
    }
  },
  {
    sequelize,
    modelName: 'Member',
    tableName: 'members',
    timestamps: true,
    underscored: true
  }
)

export default Member
