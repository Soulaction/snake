import type { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { useAuth } from '@/shared/hooks'

export const PrivateLayout: FC = () => {
  const { pathname } = useLocation()
  const { isAuth } = useAuth()

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={RouterPaths.login} state={{ from: pathname }} />
  )
}
