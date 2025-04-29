import {
  CalendarOutlined,
  EyeOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Avatar, Flex, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ITopic } from '@/pages/ForumPage/model/ITopic'
import styles from './TopicCard.module.css'
import { useAppDispatch } from '@/shared/hooks'
import { setCurrentTopic } from '@/entities/Topic/slice'
import { getComments } from '@/entities/Comment/service'

const { Meta } = Card
const { Text } = Typography

export const TopicCard: FC<ITopic> = props => {
  const { id, title, author, date, commentsCount, viewsCount, content } = props

  const dispatch = useAppDispatch()

  const setCurrent = (id: number) => {
    dispatch(setCurrentTopic(id))
    dispatch(getComments(id))
  }

  return (
    <Link to={`/topic/${id}`} onClick={() => setCurrent(id)}>
      <Card hoverable={true}>
        <Meta
          avatar={<Avatar size={'large'} src={author.avatar} />}
          title={title}
          description={content}
        />

        <Flex justify="flex-end" className={styles.footer} wrap gap={20}>
          <Text type="secondary">
            <UserOutlined /> {author.name}
          </Text>
          <Text type="secondary">
            <CalendarOutlined /> {date}
          </Text>
          <Text type="secondary">
            <MessageOutlined /> {commentsCount}
          </Text>
          <Text type="secondary">
            <EyeOutlined /> {viewsCount}
          </Text>
        </Flex>
      </Card>
    </Link>
  )
}
