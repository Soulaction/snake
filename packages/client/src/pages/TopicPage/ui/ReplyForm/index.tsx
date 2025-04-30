import { SmileOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Popover, Input } from 'antd'
import { FC, useState } from 'react'
import { EmojiPicker } from '../EmojiPicker'
import styles from './ReplyForm.module.css'
import { IComment } from '../../model/IComment'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { addComment } from '@/entities/Comment/service'

export const ReplyForm: FC = () => {
  const currentTopic = useAppSelector(state => state.topic.currentTopic)
  const user = useAppSelector(state => state.user.user)
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
    console.log(form.getFieldsValue(), comment)
    const newComment: IComment = {
      id: 0,
      parent_id: currentTopic,
      author: {
        name: user?.display_name ?? 'Guest',
        avatar:
          user?.avatar ?? 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      },
      date: new Date().toLocaleDateString(),
      topic: currentTopic,
      content: comment,
    }
    await dispatch(addComment(newComment)).then(() => {
      // dispatch(getComments(currentTopic))
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
