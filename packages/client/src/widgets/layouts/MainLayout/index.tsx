import type { FC } from 'react'
import { Layout } from 'antd'
import { Header } from '@/widgets/Header'
import styles from './MainLayout.module.css'
import { Outlet, useLocation } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'

const { Content } = Layout

export const MainLayout: FC = () => {
  const { pathname } = useLocation()
  const isShowHeader =
    pathname !== RouterPaths.login && pathname !== RouterPaths.registration

  return (
    <Layout className={styles.layout}>
      {isShowHeader && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}
      <Content className={styles.content}>
        <div className={styles.card}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </Content>
    </Layout>
  )
}
