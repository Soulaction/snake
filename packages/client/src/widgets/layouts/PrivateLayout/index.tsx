import type { FC } from 'react'
import { Layout } from 'antd'
import { ContentContainer } from '@/features/ContentContainer'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import { Header } from '@/widgets/Header'
import { RouterPaths } from '@/shared/router'
import { Navigate } from 'react-router-dom'

interface IPrivateLayoutProps {
  isAuth: boolean
}

export const PrivateLayout: FC<IPrivateLayoutProps> = ({ isAuth }) => {
  return (
    <>
      {isAuth ? (
        <Layout className="layout">
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
          <ContentContainer />
        </Layout>
      ) : (
        <Navigate to={RouterPaths.login} replace />
      )}
    </>
  )
}
