import { Pagination } from 'antd'
import { FC } from 'react'
import styles from './ForumPagination.module.css'

export const ForumPagination: FC = () => {
  return (
    <Pagination
      align="center"
      className={styles.pagination}
      defaultCurrent={1}
      total={50}
    />
  )
}
