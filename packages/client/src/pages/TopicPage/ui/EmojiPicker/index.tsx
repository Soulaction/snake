import { Flex } from 'antd'
import { CSSProperties, FC } from 'react'
import { Emoji } from '../Emoji'

const emojiPickerStyles: CSSProperties = {
  maxWidth: 140,
}

export const EmojiPicker: FC = () => {
  return (
    <Flex gap={10} wrap style={emojiPickerStyles}>
      <Emoji name="party_popper" />
    </Flex>
  )
}
