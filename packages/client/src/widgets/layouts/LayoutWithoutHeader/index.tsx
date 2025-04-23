import type { FC } from 'react'
import { Layout } from 'antd'
import { ContentContainer } from '@/features/ContentContainer'

export const LayoutWithoutHeader: FC = () => {
  return (
    <Layout className="layout">
      <ContentContainer />
    </Layout>
  )
}
