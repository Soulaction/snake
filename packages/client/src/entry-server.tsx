import React from 'react'
import ReactDOM from 'react-dom/server'
import './index.css'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import { createFetchRequest } from '@/entry-server.utils'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { getRouts } from '@/shared/router'
import { store } from '@/app/store'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(getRouts(false))
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <ErrorBoundary>
          <StaticRouterProvider router={router} context={context} />
        </ErrorBoundary>
      </Provider>
    ),
    initialState: store.getState(),
  }
}
