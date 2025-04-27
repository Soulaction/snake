import { NextFunction, Request, Response } from 'express'
import { ReactionEntity } from '../entity/ReactionEntity'

export class ReactionController {
  static async saveReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = res.locals.user
      const { body } = req

      ReactionEntity.findOne({
        where: { userId: currentUser.id, commentId: body.commentId },
      }).then(async function (obj) {
        let reaction
        if (obj) {
          reaction = await ReactionEntity.update(
            { reaction: body.reaction },
            {
              where: { userId: currentUser.id, commentId: body.commentId },
              returning: true,
            }
          )
          reaction = reaction[1]
        } else {
          reaction = await ReactionEntity.create({
            userId: currentUser.id,
            commentId: body.commentId,
            reaction: body.reaction,
          })
        }
        res.status(200).send(reaction)
      })
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    } finally {
      next()
    }
  }

  static async getCommentReactions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } = req

      if (!params.commentId) {
        res.status(404).send('Не передан ID комментария')
      }

      const reactions = await ReactionEntity.findAll({
        where: { commentId: params.commentId },
      })

      res.status(200).send(reactions)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    } finally {
      next()
    }
  }
}
