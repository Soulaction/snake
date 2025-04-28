import type { NextFunction, Response, Request } from 'express'
import { ApiError } from '../utils/ApiError'

export default function (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message })
    return
  }
  res
    .status(500)
    .json({ message: 'На сервере произошла ошибка: ' + err.message })
  next()
}
