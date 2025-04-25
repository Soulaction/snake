import type { NextFunction, Request, Response } from 'express'

class MessageController {
  getMessageByIdTopic(req: Request, res: Response, next: NextFunction) {
    const { idTopic } = req.params
    console.log(idTopic)
    try {
      res.status(200).json()
    } catch (e) {
      next(e)
    }
  }

  createMessageByTopic(req: Request, res: Response, next: NextFunction) {
    const message = req.body
    console.log(message)
    try {
      res.status(201).json()
    } catch (e) {
      next(e)
    }
  }
}

export default new MessageController()
