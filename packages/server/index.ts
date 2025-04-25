import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { router } from './routes'
import { sequelize } from './config/db'
import errorHandlerMiddleware from './middleware/ErrorHandlerMiddleware'
import { swaggerSpec, swaggerUi } from './config/swagger'

const port = process.env.SERVER_PORT || 3001

const app = express()
// @ts-ignore
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.json())
app.use('/api/v2', router)

app.use(errorHandlerMiddleware)

app.listen(port, async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log(`➜ 🎸 Server is listening on port: ${port}`)
  } catch (e) {
    console.log(e)
  }
})
