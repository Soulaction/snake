import type { NextFunction, Request, Response } from 'express'
import { UserEntity } from '../entity/UserEntity'

class UserController {
  async auth(req: Request, res: Response) {
    const userAuth = req.body
    const resAuth = await fetch(`${process.env.YANDEX_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAuth),
      credentials: 'include',
    })

    const cookies: string[] = []
    for (const header of (resAuth.headers as any).entries()) {
      if (header[0] === 'set-cookie') {
        const cookie = header[1].replace(/Domain=.+?;/g, '')
        cookies.push(cookie)
      }
    }
    res.setHeader('Set-Cookie', cookies)
    res.status(200).send('OK')
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        id,
        first_name,
        second_name,
        display_name = '',
        phone,
        avatar = '',
        email,
      } = req.body
      const user = await UserEntity.findByPk(id)
      if (user) {
        throw new Error('Такой пользователь уже существует')
      }

      const newUser = {
        id,
        first_name,
        second_name,
        display_name,
        phone,
        avatar,
        email,
      }

      await UserEntity.create(newUser as UserEntity)
      res.status(201).send('Полльзователь создан')
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = req.body
      const user = await UserEntity.findByPk(newUser.id)
      if (!user) {
        throw new Error('Пользователь не найден')
      }
      user.first_name = newUser.first_name ?? ''
      user.second_name = newUser.second_name ?? ''
      user.display_name = newUser.display_name ?? ''
      user.phone = newUser.phone ?? ''
      user.avatar = newUser.avatar ?? ''
      user.email = newUser.email ?? ''
      await user.save()
      res.status(200).json('Информация о пользователе обновлена')
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
