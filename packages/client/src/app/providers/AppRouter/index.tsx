import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { getRouter } from '@/shared/router'

export const AppRouter: FC = () => {
  return <RouterProvider router={getRouter(false)} />
}
