import {
  Avatar,
  Divider,
  Flex,
  Skeleton,
  Space,
  Button,
  Typography,
} from 'antd'
import { FC, useState } from 'react'
import { Comment } from './ui/Comment'
import { ReplyForm } from './ui/ReplyForm'
import styles from './TopicPage.module.css'
import { IComment } from '@/pages/TopicPage/model/IComment'
import { useInitStatePage } from '@/shared/hooks/useInitStatePage'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { useAppSelector } from '@/shared/hooks'

const { Text, Title } = Typography

export const TopicPage: FC = () => {
  useInitStatePage({ initPage: initTopicPage })
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const topics = useAppSelector(state => state.topic)
  const { comments } = useAppSelector(state => state.comment)
  const [thisTopic] = topics.topics.filter(
    topic => topic.id === topics.currentTopic
  )

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

  const goToForumPage = () => {
    navigate(RouterPaths.FORUM)
  }

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
      <Space direction="vertical" size="small" className={styles.w100}>
        <Flex gap={30} align="center" wrap justify="space-between">
          <Flex gap={5} vertical align="flex-start">
            <Text type="secondary">
              Автор:{' '}
              <Avatar size={'small'} src={thisTopic.author.avatar}></Avatar>{' '}
              {thisTopic.author.name}
            </Text>
            <Text type="secondary">Опубликовано: {thisTopic.date}</Text>
          </Flex>

          <Flex gap={30} align="center">
            <Title level={3} className={styles.title}>
              {thisTopic.title}
            </Title>
          </Flex>

          <Button type="default" shape="round" onClick={() => goToForumPage()}>
            К топикам
          </Button>
        </Flex>
        <Text>{thisTopic.content}</Text>
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

export const initTopicPage = () => Promise.resolve()
