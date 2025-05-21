import {
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Flex, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './TopicCard.module.css'
import { Topic } from '@/entities/Topic/types/Topic'
import { dateFormater } from '@/shared/lib/utils'

const { Meta } = Card
const { Text } = Typography

export const TopicCard: FC<{ topic: Topic }> = ({ topic }) => {
  const { id, title, userEntity, createdAt, messageCount, description } = topic

  return (
    <Link to={`/topic/${id}`}>
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
            <CalendarOutlined /> {dateFormater(createdAt)}
          </Text>
          <Text type="secondary">
            <MessageOutlined /> {messageCount}
          </Text>
        </Flex>
      </Card>
    </Link>
  )
}
