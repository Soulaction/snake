import { SmileOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Form, Popover } from 'antd'
import { FC, useState, ChangeEvent } from 'react'
import { EmojiPicker } from '../EmojiPicker'

export const ReplyForm: FC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Form name="comment_form">
      <Flex gap={20}>
        <Input.TextArea
          name="comment"
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            const target = e.target
            setValue(target?.value)
          }}
        />
        <Popover content={<EmojiPicker />} trigger="click">
          <Button shape="circle" variant="text">
            <SmileOutlined />
          </Button>
        </Popover>
      </Flex>
    </Form>
  )
}
