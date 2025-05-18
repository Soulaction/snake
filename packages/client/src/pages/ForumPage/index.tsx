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
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { PageInitArgs, useInitStatePage } from '@/shared/hooks/useInitStatePage'
import { addTopic, getTopics } from '@/entities/Topic/service'
import { Pageable } from '@/entities/types/Pageable'
import { AddTopic } from '@/entities/types/AddTopic'

const { Title } = Typography

export const ForumPage: FC = () => {
  useInitStatePage({ initPage: initForumPage({ page: 1, limit: 10 }) })
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
    const newTopic: AddTopic = {
      title: topic_name,
      description: topic_description,
      ownerId: 0,
    }
    await dispatch(addTopic(newTopic)).then(() => toggleModal(false))
  }

  const topicsList = topics.map(topic => {
    return <TopicCard topic={topic}></TopicCard>
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

export const initForumPage = (pageable: Pageable) => {
  return async ({ dispatch }: PageInitArgs) => {
    return dispatch(getTopics(pageable))
  }
}
