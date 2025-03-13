import { SmileOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Popover } from 'antd'
import { FC, useState, ChangeEvent, CSSProperties, useRef } from 'react'
import { EmojiPicker } from '../EmojiPicker'

const textareaStyles: CSSProperties = {
  maxWidth: '100%',
  width: '100%',
  borderRadius: 4,
  borderColor: '#d9d9d9',
  minHeight: 32,
  lineHeight: 1.6,
  verticalAlign: 'bottom',
  resize: 'vertical',
  padding: '4px 11px',
  outline: 'none',
}

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
      const position = inputRef.current.selectionStart // Получаем позицию курсора
      setCursorPosition(position)
    }
  }

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    setValue(target?.value)
    watchCursor()
  }

  return (
    <Form name="comment_form">
      <Flex gap={20}>
        <textarea
          style={textareaStyles}
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
    </Form>
  )
}
