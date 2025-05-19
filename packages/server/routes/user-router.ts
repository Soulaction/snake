import { Router } from 'express'
import userController from '../controllers/UserController'
import authMiddleware from '../middleware/AuthMiddleware'

export const routerUser = Router()

/**
 * @swagger
 * /user/auth:
 *   post:
 *    summary: Авторизоваться
 *    tags:
 *       - Авторизация
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *    responses:
 *       201:
 *         description: Авторизован
 */
routerUser.post('/auth', userController.auth)

/**
 * @swagger
 * /user:
 *   post:
 *    summary: Создать пользователя
 *    tags:
 *       - Авторизация
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               first_name:
 *                 type: string
 *               secondName:
 *                 type: string
 *               display_name:
 *                  type: string
 *               phone:
 *                  type: string
 *               avatar:
 *                  type: string
 *               email:
 *                  type: string
 *    responses:
 *       201:
 *         description: Пользователь создан
 */
routerUser.post('/', authMiddleware, userController.create)
/**
 * @swagger
 * /user:
 *   put:
 *    summary: Обновить информацию о пользователе
 *    tags:
 *       - Авторизация
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               firstName:
 *                 type: string
 *               secondName:
 *                 type: string
 *               displayName:
 *                  type: string
 *               phone:
 *                  type: string
 *               avatar:
 *                  type: string
 *               email:
 *                  type: string
 *    responses:
 *       201:
 *         description: Информация о пользователе обновлена
 */
routerUser.put('/', authMiddleware, userController.update)
