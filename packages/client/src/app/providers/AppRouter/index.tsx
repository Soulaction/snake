import { FC, ReactNode, useMemo } from 'react'
import { App as AppAnt, ConfigProvider, theme } from 'antd'
import { useAppSelector } from '@/shared/hooks'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'

interface AppRouterProps {
  children: ReactNode
}

export const App: FC<AppRouterProps> = ({ children }: AppRouterProps) => {
  const currentTheme = useAppSelector(state => state.user.theme)

  const config = useMemo(() => {
    return {
      algorithm:
        currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    }
  }, [currentTheme])

  return (
    <ConfigProvider theme={config}>
      <ErrorBoundary>
        <AppAnt>{children}</AppAnt>
      </ErrorBoundary>
    </ConfigProvider>
  )
}
