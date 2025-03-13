import {
  CalendarOutlined,
  EyeOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Avatar, Flex, Typography } from 'antd'
import { FC, CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ITopics } from '../..'

const { Meta } = Card
const { Text } = Typography

const footerStyles: CSSProperties = {
  marginTop: 10,
}

export const TopicCard: FC<ITopics> = props => {
  const { id, title, author, date, commentsCount, viewsCount, content } = props

  return (
    <Link to={`/topic/${id}`}>
      <Card hoverable={true}>
        <Meta
          avatar={<Avatar size={'large'} src={author.avatar} />}
          title={title}
          description={content}
        />

        <Flex justify="flex-end" style={footerStyles} wrap gap={20}>
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
