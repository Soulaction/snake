import { FC, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { getRouter } from '@/shared/router'
import { App, ConfigProvider, theme } from 'antd'
import { useAppSelector } from '@/shared/hooks'

export const AppRouter: FC = () => {
  const currentTheme = useAppSelector(state => state.user.theme)

  const config = useMemo(() => {
    return {
      algorithm:
        currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    }
  }, [currentTheme])

  return (
    <ConfigProvider theme={config}>
      <App>
        <RouterProvider router={getRouter()} />
      </App>
    </ConfigProvider>
  )
}
