import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { router } from './routes'
import { sequelize } from './config/db'
import errorHandlerMiddleware from './middleware/ErrorHandlerMiddleware'
import { swaggerSpec, swaggerUi } from './config/swagger'

const port = process.env.SERVER_PORT || 3001

const app = express()
const contextPath = '/snake-api/v2'

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || '*')
    },
    credentials: true,
  })
)
app.use(
  contextPath + '/api-docs',
  // @ts-ignore
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      withCredentials: true,
    },
  })
)
app.use(express.json())
app.use(contextPath, router)

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
