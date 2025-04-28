// @ts-ignore
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
// @ts-ignore
import type { OpenAPIV3 } from 'openapi-types'
import * as path from 'path'

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
        url: `http://localhost:${process.env.SERVER_PORT}/api/v2`,
      },
    ],
  },
  apis: [path.resolve(__dirname, '../routes/*.ts')],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerUi, swaggerSpec }
