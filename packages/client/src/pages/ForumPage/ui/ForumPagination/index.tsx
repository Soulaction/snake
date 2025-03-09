import { Pagination } from 'antd'
import { FC, CSSProperties } from 'react'

const forumPaginationStyles: CSSProperties = {
  margin: 30,
}

export const ForumPagination: FC = () => {
  return (
    <Pagination
      align="center"
      style={forumPaginationStyles}
      defaultCurrent={1}
      total={50}
    />
  )
}
