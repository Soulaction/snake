import type { FC } from 'react'
import { Layout } from 'antd'
import { ContentContainer } from '@/features/ContentContainer'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import { Header } from '@/widgets/Header'

export const LayoutWithHeader: FC = () => {
  return (
    <Layout className="layout">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ContentContainer />
    </Layout>
  )
}
