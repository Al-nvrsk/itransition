import { sequelize } from '../../../task4/server/db/db.js'
import DataTypes from 'sequelize'

export const Message = sequelize.define( 'message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true , unique: true},
    addressName: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    messageText: {type: DataTypes.STRING},
    from: {type: DataTypes.STRING},
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
},)
