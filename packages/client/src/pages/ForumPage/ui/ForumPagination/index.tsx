import { Pagination } from 'antd'
import { FC } from 'react'
import styles from './ForumPagination.module.css'

interface IFPagination {
  current: number
  total: number
  defaultPageSize: number
  changePage: (arg: number) => void
}

export const ForumPagination: FC<IFPagination> = props => {
  const { current, total, defaultPageSize, changePage } = props

  return (
    <Pagination
      align="center"
      className={styles.pagination}
      defaultCurrent={current}
      total={total}
      defaultPageSize={defaultPageSize}
      onChange={(page, pageSize) => changePage(page)}
    />
  )
}
