import React from 'react'
import ReactDOM from 'react-dom/server'
import './index.css'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { Provider } from 'react-redux'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import { createFetchRequest, createUrl } from '@/entry-server.utils'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import {
  privateRouters,
  publicRoutersWithAuth,
  RouterPaths,
  routs,
} from '@/shared/router'
import { store } from '@/app/store'
import { getUserData } from '@/entities/User/service'
import { publicRouters } from '@/shared/router/router'
import { axiosInstance } from '@/shared/api/axios-transport'
import { setPageHasBeenInitializedOnServer } from '@/entities/Application/slice'

export const render = async (req: ExpressRequest, res: ExpressResponse) => {
  const { query, dataRoutes } = createStaticHandler(routs)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  let isAuth: boolean
  axiosInstance.defaults.headers.common['cookie'] = req.headers.cookie

  try {
    await store.dispatch(getUserData()).unwrap()
    isAuth = true
  } catch (e) {
    isAuth = false
  }

  const url = createUrl(req)
  const foundRoutes = [
    ...publicRouters,
    ...publicRoutersWithAuth,
    ...(isAuth ? privateRouters : []),
  ].find(el => el.path === url.pathname)

  if (!foundRoutes && !isAuth) {
    return res.redirect(RouterPaths.LOGIN)
  } else if (!foundRoutes && isAuth) {
    return res.redirect(RouterPaths.NOTFOUND)
  } else if (
    foundRoutes &&
    isAuth &&
    (RouterPaths.LOGIN === foundRoutes.path ||
      RouterPaths.REGISTRATION === foundRoutes.path)
  ) {
    return res.redirect(RouterPaths.GAME)
  } else if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const { initFunc } = foundRoutes
  try {
    await initFunc({
      dispatch: store.dispatch,
    })
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }
  store.dispatch(setPageHasBeenInitializedOnServer(true))

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
