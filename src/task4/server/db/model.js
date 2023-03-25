import { sequelize } from './db.js'
import DataTypes from 'sequelize'

export const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true , unique: true},
    firstName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
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
    role: {type: DataTypes.STRING, defaultValue: 'Active'},
  },{
    hooks: {
      beforeUpdate: (user) => {
        user.lastLoginAt = new Date();
      }
    }
  })
