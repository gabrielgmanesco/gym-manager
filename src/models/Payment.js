import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class Payment extends Model {}

Payment.init(
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
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'plan_id'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'paid'
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'due_date'
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'paid_at'
    }
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
    underscored: true
  }
)

export default Payment
