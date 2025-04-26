import type { NextFunction, Request, Response } from 'express'
import { MessageEntity } from '../entity/MessageEntity'
import { TopicEntity } from '../entity/TopicEntity'
import { UserEntity } from '../entity/UserEntity'

class MessageController {
  async getMessageByIdTopic(req: Request, res: Response, next: NextFunction) {
    const { idTopic } = req.params
    try {
      const topics = await MessageEntity.findAll({
        where: {
          topicId: idTopic,
        },
        include: {
          model: UserEntity,
          attributes: [
            'id',
            'first_name',
            'second_name',
            'display_name',
            'avatar',
          ],
        },
      })
      res.status(200).json(topics)
    } catch (e) {
      next(e)
    }
  }

  async createMessageByTopic(req: Request, res: Response, next: NextFunction) {
    const message = req.body
    try {
      const topic = await TopicEntity.findByPk(message.topicId)
      if (!topic) {
        throw new Error('По данному id топик не был найден')
      }
      const newMessage = await MessageEntity.create(message)
      res.status(201).json(newMessage)
    } catch (e) {
      next(e)
    }
  }
}

export default new MessageController()
