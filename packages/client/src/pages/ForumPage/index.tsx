import { MainLayout } from '@/widgets'
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
import { FC, useState, useEffect, CSSProperties } from 'react'

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

const formStyles: CSSProperties = {
  paddingTop: 25,
}

const contentFlexboxStyles: CSSProperties = {
  width: '100%',
}

const mockData: ITopics[] = [
  {
    id: 123123,
    title: 'Немного о змейке',
    author: {
      name: 'Vasya',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    },
    date: '04.03.25',
    commentsCount: 150,
    viewsCount: 200,
    content: 'SampleText',
  },
  {
    id: 321321,
    title: 'Много о змейке',
    author: {
      name: 'Petya',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    },
    date: '06.03.25',
    commentsCount: 123,
    viewsCount: 300,
    content: 'Text Sample',
  },
  {
    id: 231132,
    title: 'Ничего о змейке',
    author: {
      name: 'Kolya',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    },
    date: '08.03.25',
    commentsCount: 170,
    viewsCount: 400,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

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
    <MainLayout>
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
        <Space direction="vertical" size="middle" style={contentFlexboxStyles}>
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
        <Form name="create_topic" style={formStyles} preserve={false}>
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
    </MainLayout>
  )
}
