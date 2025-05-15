// @ts-ignore
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
// @ts-ignore
import type { OpenAPIV3 } from 'openapi-types'
import * as path from 'path'

const isDev = process.env.NODE_ENV === 'dev'

const options: {
  definition: OpenAPIV3.Document
  apis: string[]
} = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Snake API',
      version: '1.0.0',
      description: 'Документация приложения snake',
    },
    servers: [
      {
        url: process.env.INTERNAL_SERVER_URL + '/snake-api/v2',
      },
    ],
  },
  apis: [path.resolve(__dirname, `../routes/*.${isDev ? 'ts' : 'js'}`)],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerUi, swaggerSpec }
