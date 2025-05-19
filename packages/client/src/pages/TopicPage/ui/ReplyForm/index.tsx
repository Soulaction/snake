import { SmileOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Popover } from 'antd'
import { FC, useState } from 'react'
import { EmojiPicker } from '../EmojiPicker'
import styles from './ReplyForm.module.css'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { addComment } from '@/entities/Comment/service'
import { AddComment } from '@/entities/Topic/types/AddComment'

export const ReplyForm: FC = () => {
  const currentTopic = useAppSelector(state => state.topic.currentTopic)
  const [form] = Form.useForm()
  const { TextArea } = Input

  const dispatch = useAppDispatch()

  const [cursorPosition, setCursorPosition] = useState(0)

  const [value, setValue] = useState<string>('')

  const onChooseEmoji = (emoji: string) => {
    const lValue = value.slice(0, cursorPosition)
    const rValue = value.slice(cursorPosition)
    setValue(lValue + emoji + rValue)
  }

  const addNewComment = async () => {
    const { comment } = form.getFieldsValue([['comment']])
    const newComment: AddComment = {
      topicId: currentTopic?.id ?? -1,
      ownerId: -1,
      message: comment,
    }
    await dispatch(addComment(newComment)).then(() => {
      form.setFieldValue('comment', '')
    })
  }

  return (
    <Form name="comment_form" form={form}>
      <Flex vertical gap={20}>
        <Flex gap={20}>
          <Form.Item name="comment" className={styles.w100}>
            <TextArea rows={4} name="comment" />
          </Form.Item>
          <Popover
            content={<EmojiPicker onChooseEmoji={onChooseEmoji} />}
            trigger="click">
            <Button shape="circle" variant="text">
              <SmileOutlined />
            </Button>
          </Popover>
        </Flex>

        <Flex>
          <Button type="default" shape="round" onClick={() => addNewComment()}>
            Отправить
          </Button>
        </Flex>
      </Flex>
    </Form>
  )
}
