import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { getRouter } from '@/shared/router'
import { App, ConfigProvider, theme } from 'antd'

export const AppRouter: FC = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <App>
        <RouterProvider router={getRouter()} />
      </App>
    </ConfigProvider>
  )
}
