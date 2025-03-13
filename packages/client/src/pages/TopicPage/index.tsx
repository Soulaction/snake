import { Avatar, Divider, Flex, Skeleton, Space, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Comment } from './ui/Comment'
import { ReplyForm } from './ui/ReplyForm'
import styles from './TopicPage.module.css'
import { mockData } from './model/topicConstant'

const { Text, Title } = Typography

export interface IComment {
  author: {
    avatar: string
    name: string
  }
  content: string
  date: string
}

export const TopicPage: FC = () => {
  const [comments, setComments] = useState<IComment[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      console.log('здесь могло быть ваше API на get комментов')
      setLoading(false)
      setComments(mockData)
    }, 1000)
  }, [comments])

  const commentsList = comments?.map((comment: IComment, index) => {
    return (
      <Comment
        key={index}
        author={comment.author}
        content={comment.content}
        date={comment.date}
      />
    )
  })

  const skeleton = (
    <>
      <Skeleton avatar loading={loading} paragraph={{ rows: 1 }} active />
      <Divider />
      <Skeleton avatar loading={loading} paragraph={{ rows: 1 }} active />
      <Divider />
      <Skeleton avatar loading={loading} paragraph={{ rows: 1 }} active />
    </>
  )

  return (
    <>
      <Space direction="vertical" size="small">
        <Flex gap={30} align="center" wrap justify="space-between">
          <Flex gap={30} align="center">
            <Title level={3} className={styles.title}>
              Some Topics Title
            </Title>
          </Flex>

          <Flex gap={15} align="center">
            <Text type="secondary">
              Автор:{' '}
              <Avatar
                size={'small'}
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"></Avatar>{' '}
              Kolya
            </Text>
            <Text type="secondary">Опубликовано: 05.03.25</Text>
          </Flex>
        </Flex>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Divider variant="solid" className={styles.divider} />

        <Title level={4}>Комментарии</Title>
        {commentsList ? commentsList : skeleton}

        <Divider
          variant="solid"
          className={styles.divider}
          orientation="start"></Divider>
        <Text>Оставить комментарий</Text>
        <ReplyForm />
      </Space>
    </>
  )
}
