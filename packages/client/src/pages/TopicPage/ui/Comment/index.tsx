import { CalendarOutlined } from '@ant-design/icons'
import { Avatar, Card, Flex, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import { FC } from 'react'
import { IComment } from '../..'
import styles from './Comment.module.css'

const { Text } = Typography

export const Comment: FC<IComment> = props => {
  const { author, content, date } = props

  return (
    <Card size="small">
      <Meta
        avatar={<Avatar size={'large'} src={author.avatar} />}
        title={author.name}
        description={content}
      />
      <Flex justify="flex-end" className={styles['footer']} gap={20}>
        <Text type="secondary">
          <CalendarOutlined /> {date}
        </Text>
      </Flex>
    </Card>
  )
}
