import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { UserEntity } from '../entity/UserEntity'
import { TopicEntity } from '../entity/TopicEntity'
import { MessageEntity } from '../entity/MessageEntity'

const sequelizeOptions: SequelizeOptions = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT!),
  username: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
  dialect: 'postgres',
  models: [UserEntity, TopicEntity, MessageEntity],
  logging: console.log,
}

export const sequelize = new Sequelize(sequelizeOptions)
