import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/index.js'

class User extends Model {}

User.init(
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
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'admin'
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        underscored: true
    }
)

export default User