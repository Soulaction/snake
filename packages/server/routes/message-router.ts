import { Router } from 'express'
import messageController from '../controllers/MessageController'

export const routerMessage = Router()

/**
 * @swagger
 *  /message/{idTopic}:
 *   get:
 *     summary: Получить сообщения по теме
 *     tags:
 *        - Сообщения
 *     parameters:
 *       - in: path
 *         name: idTopic
 *         required: true
 *     responses:
 *       200:
 *         description: Список сообщений
 */
routerMessage.get('/:idTopic', messageController.getMessageByIdTopic)
/**
 * @swagger
 * /message:
 *   get:
 *     summary: Добавить сообщение к топику
 *     tags:
 *         - Сообщения
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               ownerId:
 *                 type: number
 *               topicId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Сообщение создано
 */
routerMessage.post('/', messageController.createMessageByTopic)
