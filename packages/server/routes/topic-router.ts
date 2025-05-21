import { Router } from 'express'
import topicController from '../controllers/TopicController'

export const routerTopic = Router()

/**
 * @swagger
 * /topic:
 *   get:
 *     summary: Получить список топиков
 *     tags:
 *       - Топики
 *     description: Возвращает список топиков с возможностью пагинации.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Странице
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Количество топиков на странице
 *     responses:
 *       200:
 *         description: Список сообщений
 */
routerTopic.get('/', topicController.getAll)
/**
 * @swagger
 * /topic:
 *   post:
 *     summary: Добавить топик
 *     tags:
 *       - Топики
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ownerId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Топик создан
 */
routerTopic.post('/', topicController.create)

/**
 * @swagger
 * /topic/{idTopic}:
 *   get:
 *     summary: Получить топик
 *     tags:
 *       - Топики
 *     parameters:
 *       - in: path
 *         name: idTopic
 *         required: true

 *     responses:
 *       201:
 *         description: Топик получен
 */
routerTopic.get('/:idTopic', topicController.getById)
