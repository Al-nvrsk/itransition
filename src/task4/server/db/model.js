import { sequelize } from './db.js'
import DataTypes from 'sequelize'

export const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true , unique: true},
    name: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
    // loginName: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'Active'},
})
