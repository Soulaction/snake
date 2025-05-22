import {
  Avatar,
  Button,
  Divider,
  Flex,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import { FC, useState } from 'react'
import { Comment } from './ui/Comment'
import { ReplyForm } from './ui/ReplyForm'
import styles from './TopicPage.module.css'
import { PageInitArgs, useInitStatePage } from '@/shared/hooks/useInitStatePage'
import { useNavigate, useParams } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { useAppSelector } from '@/shared/hooks'
import { dateFormater } from '@/shared/lib/utils'
import { getComments } from '@/entities/Comment/service'
import { getTopic } from '@/entities/Topic/service'
import { resourcesYandex } from '@/shared/constants/api'

const { Text, Title } = Typography

export const TopicPage: FC = () => {
  const { topicId } = useParams()
  useInitStatePage({ initPage: initTopicPage }, topicId)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const topic = useAppSelector(state => state.topic.currentTopic)
  const { comments } = useAppSelector(state => state.comment)

  const commentsList = comments.map((comment, index) => {
    return <Comment key={index} comment={comment} />
  })

  const goToForumPage = () => {
    setLoading(true)
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
              <Avatar
                size={'small'}
                src={`${resourcesYandex}${topic?.userEntity.avatar}`}></Avatar>{' '}
              {topic?.userEntity.first_name}
            </Text>
            <Text type="secondary">
              Опубликовано: {dateFormater(topic?.createdAt ?? '')}
            </Text>
          </Flex>

          <Flex gap={30} align="center">
            <Title level={3} className={styles.title}>
              {topic?.title}
            </Title>
          </Flex>

          <Button type="default" shape="round" onClick={() => goToForumPage()}>
            К топикам
          </Button>
        </Flex>
        <Text>{topic?.description}</Text>
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

export const initTopicPage = async ({
  dispatch,
  data,
}: PageInitArgs<string>) => {
  if (data) {
    return Promise.all([dispatch(getComments(data)), dispatch(getTopic(data))])
  } else {
    return Promise.resolve()
  }
}
