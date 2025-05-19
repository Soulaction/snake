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
import { Pageable } from '@/entities/Topic/types/Pageable'
import { AddTopic } from '@/entities/Topic/types/AddTopic'

const { Title } = Typography

export const ForumPage: FC = () => {
  useInitStatePage<Pageable>({ initPage: initForumPage }, { page: 1, limit: 5 })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const { topics, isLoading } = useAppSelector(state => state.topic)
  const [form] = Form.useForm()

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
      ownerId: -1,
    }
    await dispatch(addTopic(newTopic)).then(() => toggleModal(false))
  }

  const topicsList = topics?.data.map(topic => {
    return <TopicCard key={topic.id} topic={topic}></TopicCard>
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
    dispatch(getTopics({ page: num, limit: 5 }))
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

      {topics && topics.total / 5 > 1 && (
        <ForumPagination
          current={1}
          total={topics.total}
          defaultPageSize={5}
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
        destroyOnHidden={true}>
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

export const initForumPage = async ({
  data,
  dispatch,
}: PageInitArgs<Pageable>) => {
  if (data) {
    return dispatch(getTopics(data))
  } else {
    return Promise.resolve()
  }
}
