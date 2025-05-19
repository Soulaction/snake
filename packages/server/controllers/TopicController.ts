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
    try {
      const { limit = 10, page = 1 } = req.query
      const offset = +page * +limit - +limit
      const { count, rows } = await TopicEntity.findAndCountAll({
        attributes: {
          include: [
            [
              Sequelize.fn('COUNT', Sequelize.col('message.id')),
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
            attributes: [
              'id',
              'first_name',
              'second_name',
              'display_name',
              'avatar',
            ],
          },
        ],
        group: ['TopicEntity.id', 'userEntity.id'],
        limit: +limit,
        order: [['createdAt', 'DESC']],
        offset,
        subQuery: false,
      })

      const result = {
        data: rows,
        total: count.length,
      }
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }
}

export default new TopicController()
