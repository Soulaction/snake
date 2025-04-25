import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/ApiError'

export default async function (
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const res = await fetch(process.env.YANDEX_URL! + '/auth/user', {
    method: 'GET',
    headers: {
      cookie: req.headers.cookie ?? '',
    },
  })

  if (res.ok) {
    next()
  }
  next(ApiError.unauthorized('Пользователь не авторизован'))
}
