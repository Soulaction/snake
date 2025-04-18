import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { getRouter } from '@/shared/router'
import { useAppSelector } from '@/shared/hooks'

export const AppRouter: FC = () => {
  const { isAuth } = useAppSelector(store => store.user)
  return <RouterProvider router={getRouter(isAuth)} />
}
