import { Route, Routes } from 'react-router-dom'
import { privateRouters, publicRouters, RouterPaths } from '@/shared/router'
import { MainPage } from '@/pages'
import { FC } from 'react'
import { PrivateLayout } from '@/widgets/layouts/PrivateLayout'
import { useAuth } from '@/shared/hooks'
import { Spin } from 'antd'
import style from './AppRouter.module.css'
import { PublicLayout } from '@/widgets/layouts/PublicLayout'

export const AppRouter: FC = () => {
  const { isAuth, userLoading } = useAuth()

  return userLoading ? (
    <Spin className={style.spin} size="large" />
  ) : (
    <Routes>
      <Route
        key={RouterPaths.MAIN}
        path={RouterPaths.MAIN}
        element={<MainPage />}
      />
      <Route key="layout" element={<PublicLayout isAuth={isAuth} />}>
        {publicRouters.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route key="private" element={<PrivateLayout isAuth={isAuth} />}>
        {privateRouters.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}
