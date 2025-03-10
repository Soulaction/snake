import { SmileOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Form } from 'antd'
import { FC, useState, ChangeEvent } from 'react'

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
        <Button shape="circle" variant="text">
          <SmileOutlined />
        </Button>
      </Flex>
    </Form>
  )
}
