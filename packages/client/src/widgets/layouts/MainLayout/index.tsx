import type { PropsWithChildren } from 'react'
import { Layout } from 'antd'
import { Header } from '@/widgets/Header'
import styles from './MainLayout.module.css'

const { Content } = Layout

interface MainLayoutProps {
  isHeader?: boolean
}

export function MainLayout({
  isHeader = true,
  children,
}: PropsWithChildren<MainLayoutProps>) {
  return (
    <Layout className={styles['layout']}>
      {isHeader && <Header />}
      <Content className={styles['content']}>
        <div className={styles['card']}>{children}</div>
      </Content>
    </Layout>
  )
}
