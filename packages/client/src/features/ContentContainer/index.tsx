import React, { FC } from 'react'
import styles from './ContentContainer.module.css'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

const { Content } = Layout

export const ContentContainer: FC = () => {
  return (
    <Content className={styles.content}>
      <div className={styles.card}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </Content>
  )
}
