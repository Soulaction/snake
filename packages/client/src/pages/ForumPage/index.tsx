import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import { TopicCard } from './ui/TopicCard'
import { ForumPagination } from './ui/ForumPagination'
import { FC, useState } from 'react'
import styles from './ForumPage.module.css'
import { ITopic } from '@/pages/ForumPage/model/ITopic'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { PageInitArgs, useInitStatePage } from '@/shared/hooks/useInitStatePage'
import { getTopics, addTopic } from '@/entities/Topic/service'

const { Title } = Typography

export const ForumPage: FC = () => {
  useInitStatePage({ initPage: initForumPage })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const { topics, isLoading } = useAppSelector(state => state.topic)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3
  const [form] = Form.useForm()
  const user = useAppSelector(state => state.user.user)

  const dispatch = useAppDispatch()

  const toggleModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen)
  }

  const onSubmit = async () => {
    setIsSending(true)
    const { topic_name, topic_description } = form.getFieldsValue([
      ['topic_name'],
      ['topic_description'],
    ])
    const newTopic: ITopic = {
      id: 0,
      title: topic_name,
      author: {
        name: user?.display_name ?? 'Guest',
        avatar:
          user?.avatar ?? 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      },
      date: new Date().toDateString(),
      commentsCount: 0,
      viewsCount: 0,
      content: topic_description,
    }
    await dispatch(addTopic(newTopic)).then(() => toggleModal(false))
  }

  const topicsList = topics
    .slice(pageSize * (currentPage - 1), pageSize * currentPage)
    .map((topic: ITopic) => {
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
      <Skeleton avatar loading={isLoading} paragraph={{ rows: 2 }} active />
      <Divider />
      <Skeleton avatar loading={isLoading} paragraph={{ rows: 2 }} active />
      <Divider />
      <Skeleton avatar loading={isLoading} paragraph={{ rows: 2 }} active />
    </>
  )

  const goToPage = (num: number): void => {
    setCurrentPage(num)
  }

  return (
    <div className={styles.wrap}>
      <Flex justify="flex-start" align="center" className={styles.w100}>
        <Title className={styles.h1forum}>Форум</Title>
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            toggleModal(true)
          }}>
          Создать топик
        </Button>
      </Flex>

      <Flex className={styles.w100}>
        <Space direction="vertical" size="middle" className={styles.space}>
          {topicsList ? topicsList : skeleton}
        </Space>
      </Flex>

      {topics.length / pageSize > 1 && (
        <ForumPagination
          current={1}
          total={topics.length}
          defaultPageSize={pageSize}
          changePage={goToPage}></ForumPagination>
      )}

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
        <Form
          name="create_topic"
          className={styles.form}
          preserve={false}
          form={form}>
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

export const initForumPage = async ({ dispatch }: PageInitArgs) => {
  return dispatch(getTopics())
}
