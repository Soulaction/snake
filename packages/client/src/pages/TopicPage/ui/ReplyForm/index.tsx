import { SmileOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Popover } from 'antd'
import { FC, useState, ChangeEvent, useRef } from 'react'
import { EmojiPicker } from '../EmojiPicker'
import styles from './ReplyForm.module.css'

export const ReplyForm: FC = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const [cursorPosition, setCursorPosition] = useState(0)

  const [value, setValue] = useState<string>('')

  const onChooseEmoji = (emoji: string) => {
    const lValue = value.slice(0, cursorPosition)
    const rValue = value.slice(cursorPosition)
    setValue(lValue + emoji + rValue)
  }

  const watchCursor = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart
      setCursorPosition(position)
    }
  }

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    setValue(target?.value)
    watchCursor()
  }

  const addComment = () => {
    console.log('New comment')
  }

  return (
    <Form name="comment_form">
      <Flex vertical gap={20}>
        <Flex gap={20}>
          <textarea
            className={styles.textarea}
            name="comment"
            value={value}
            ref={inputRef}
            onClick={watchCursor}
            onChange={onChange}
          />
          <Popover
            content={<EmojiPicker onChooseEmoji={onChooseEmoji} />}
            trigger="click">
            <Button shape="circle" variant="text">
              <SmileOutlined />
            </Button>
          </Popover>
        </Flex>

        <Flex>
          <Button type="default" shape="round" onClick={() => addComment()}>
            Отправить
          </Button>
        </Flex>
      </Flex>
    </Form>
  )
}
