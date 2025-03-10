import { CalendarOutlined } from '@ant-design/icons'
import { Avatar, Card, Flex, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import { CSSProperties, FC } from 'react'
import { IComment } from '../..'

const { Text } = Typography

const footerStyles: CSSProperties = {
  marginTop: 0,
}

export const Comment: FC<IComment> = props => {
  const { author, content, date } = props

  return (
    <Card size="small">
      <Meta
        avatar={<Avatar size={'large'} src={author.avatar} />}
        title={author.name}
        description={content}
      />
      <Flex justify="flex-end" style={footerStyles} gap={20}>
        <Text type="secondary">
          <CalendarOutlined /> {date}
        </Text>
      </Flex>
    </Card>
  )
}
