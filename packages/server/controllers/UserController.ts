import type { NextFunction, Request, Response } from 'express'

class UserController {
  async auth(req: Request, res: Response) {
    const userAuth = req.body
    const resAuth = await fetch(`${process.env.YANDEX_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAuth),
    })
    res.setHeader('set-cookie', resAuth.headers.get('set-cookie') || '')
    res.status(200).json()
  }

  create(req: Request, res: Response, next: NextFunction) {
    const user = req.body
    console.log(user)
    try {
      res.status(200).json()
    } catch (e) {
      next(e)
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    const user = req.body
    console.log(user)
    try {
      res.status(200).json()
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
