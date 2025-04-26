import { Router } from 'express'
import { routerMessage } from './message-router'
import { routerTopic } from './topic-router'
import { routerUser } from './user-router'
import authMiddleware from '../middleware/AuthMiddleware'

export const router = Router()

router.use('/topic', authMiddleware, routerTopic)
router.use('/message', authMiddleware, routerMessage)
router.use('/user', routerUser)
