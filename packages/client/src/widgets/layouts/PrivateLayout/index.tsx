import type { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'

interface IPrivateLayoutProps {
  isAuth: boolean
}

export const PrivateLayout: FC<IPrivateLayoutProps> = ({ isAuth }) => {
  const location = useLocation()

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={RouterPaths.login} state={{ from: location }} />
  )
}
