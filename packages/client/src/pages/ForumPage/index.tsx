import {
  Button,
  Flex,
  Modal,
  Space,
  Typography,
  Form,
  Input,
  Skeleton,
  Divider,
} from 'antd'
import { TopicCard } from './ui/TopicCard'
import { ForumPagination } from './ui/ForumPagination'
import { FC, useState, useEffect } from 'react'
import styles from './ForumPage.module.css'
import { mockData } from './model/forumConstant'

export interface ITopics {
  id: number
  title: string
  author: {
    name: string
    avatar: string
  }
  date: string
  commentsCount: number
  viewsCount: number
  content: string
}

const { Title } = Typography

export const ForumPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [topics, setTopics] = useState<ITopics[] | null>(null)

  useEffect(() => {
    setTimeout(() => {
      console.log('здесь могло быть ваше API на get топиков')
      setLoading(false)
      setTopics(mockData)
    }, 1000)
  }, [topics])

  const toggleModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen)
  }

  const onSubmit = () => {
    setIsSending(true)
    setTimeout(() => {
      console.log('здесь могло быть ваше API на post топика')
      toggleModal(false)
      setIsSending(false)
    }, 2000)
  }

  const topicsList = topics?.map((topic: ITopics) => {
    return (
      <TopicCard
        id={topic.id}
        key={topic.id}
        title={topic.title}
        author={topic.author}
        date={topic.date}
        commentsCount={topic.commentsCount}
        viewsCount={topic.viewsCount}
        content={topic.content}></TopicCard>
    )
  })

  const skeleton = (
    <>
      <Skeleton avatar loading={loading} paragraph={{ rows: 2 }} active />
      <Divider />
      <Skeleton avatar loading={loading} paragraph={{ rows: 2 }} active />
      <Divider />
      <Skeleton avatar loading={loading} paragraph={{ rows: 2 }} active />
    </>
  )

  return (
    <div className={styles.wrap}>
      <Flex justify="space-between" align="center">
        <Title>Форум</Title>
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            toggleModal(true)
          }}>
          Создать топик
        </Button>
      </Flex>

      <Flex>
        <Space direction="vertical" size="middle" className={styles.space}>
          {topicsList ? topicsList : skeleton}
        </Space>
      </Flex>

      <ForumPagination></ForumPagination>

      <Modal
        okText="Создать топик"
        cancelText="Отмена"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={() => {
          toggleModal(false)
        }}
        confirmLoading={isSending}
        destroyOnClose={true}>
        <Title level={4}>Создать топик</Title>
        <Form name="create_topic" className={styles.form} preserve={false}>
          <Form.Item
            name="topic_name"
            label="Название топика"
            rules={[{ required: true }]}>
            <Input name="topic_name" />
          </Form.Item>
          <Form.Item
            name="topic_description"
            label="Описание топика"
            rules={[{ required: true }]}>
            <Input.TextArea name="topic_description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
