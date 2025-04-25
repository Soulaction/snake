import type { NextFunction, Request, Response } from 'express'
import { TopicEntity } from '../entity/TopicEntity'
import { Sequelize } from 'sequelize-typescript'
import { MessageEntity } from '../entity/MessageEntity'
import { UserEntity } from '../entity/UserEntity'

class TopicController {
  async create(req: Request, res: Response, next: NextFunction) {
    const topic = req.body
    try {
      const newTopic = await TopicEntity.create({
        ...topic,
      })
      res.status(200).json(newTopic.dataValues)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const { limit = 10, page = 1 } = req.query
    const offset = +page * +limit - +limit
    const chatsWithMessageCountAndCreator = await TopicEntity.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('MessageEntity.id')),
            'messageCount',
          ],
        ],
      },
      include: [
        {
          model: MessageEntity,
          attributes: [],
        },
        {
          model: UserEntity,
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
      group: ['TopicEntity.id', 'UserEntity.id', 'MessageEntity.id'],
      limit: +limit,
      offset,
      subQuery: false,
    })
    console.log(chatsWithMessageCountAndCreator)
    try {
      res.status(200).json()
    } catch (e) {
      next(e)
    }
  }
}

export default new TopicController()
