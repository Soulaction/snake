import { DataTypes } from 'sequelize-typescript'
import { sequelize } from './config/db'

export const ReactionEntity = sequelize.define('ReactionEntity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reaction: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'like',
  },
})
