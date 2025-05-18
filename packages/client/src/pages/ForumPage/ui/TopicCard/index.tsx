import {
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Flex, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './TopicCard.module.css'
import { useAppDispatch } from '@/shared/hooks'
import { setCurrentTopic } from '@/entities/Topic/slice'
import { getComments } from '@/entities/Comment/service'
import { Topic } from '@/entities/types/Topic'

const { Meta } = Card
const { Text } = Typography

export const TopicCard: FC<{ topic: Topic }> = ({ topic }) => {
  const { id, title, userEntity, createdAt, messageCount, description } = topic

  const dispatch = useAppDispatch()

  const setCurrent = (id: number) => {
    dispatch(setCurrentTopic(id))
    dispatch(getComments(id))
  }

  return (
    <Link to={`/topic/${id}`} onClick={() => setCurrent(id)}>
      <Card hoverable={true}>
        <Meta
          avatar={<Avatar size={'large'} src={userEntity.avatar} />}
          title={title}
          description={description}
        />

        <Flex justify="flex-end" className={styles.footer} wrap gap={20}>
          <Text type="secondary">
            <UserOutlined /> {userEntity.first_name}
          </Text>
          <Text type="secondary">
            <CalendarOutlined /> {createdAt}
          </Text>
          <Text type="secondary">
            <MessageOutlined /> {messageCount}
          </Text>
        </Flex>
      </Card>
    </Link>
  )
}
