import { Flex } from 'antd'
import { CSSProperties, FC } from 'react'
import { Emoji } from '../Emoji'

const emojiPickerStyles: CSSProperties = {
  maxWidth: 140,
}

export interface IEmojiPicker {
  onChooseEmoji: (emoji: string) => void
}

export const EmojiPicker: FC<IEmojiPicker> = props => {
  const { onChooseEmoji } = props
  return (
    <Flex gap={10} wrap style={emojiPickerStyles}>
      <Emoji onClick={onChooseEmoji} name="grinning_face" />
      <Emoji onClick={onChooseEmoji} name="smiling_face_with_sunglasses" />
      <Emoji onClick={onChooseEmoji} name="face_with_tears_of_joy" />
      <Emoji onClick={onChooseEmoji} name="thumbs_up" />
      <Emoji onClick={onChooseEmoji} name="red_heart" />
      <Emoji onClick={onChooseEmoji} name="fire" />
      <Emoji onClick={onChooseEmoji} name="star" />
      <Emoji onClick={onChooseEmoji} name="sparkles" />
      <Emoji onClick={onChooseEmoji} name="party_popper" />
      <Emoji onClick={onChooseEmoji} name="clapping_hands" />
      <Emoji onClick={onChooseEmoji} name="smiling_face_with_hearts" />
      <Emoji onClick={onChooseEmoji} name="alien" />
      <Emoji onClick={onChooseEmoji} name="robot_face" />
      <Emoji onClick={onChooseEmoji} name="pensive_face" />
      <Emoji onClick={onChooseEmoji} name="crying_face" />
      <Emoji onClick={onChooseEmoji} name="angry_face" />
      <Emoji onClick={onChooseEmoji} name="face_with_symbols_on_mouth" />
      <Emoji onClick={onChooseEmoji} name="disappointed_face" />
      <Emoji onClick={onChooseEmoji} name="weary_face" />
      <Emoji onClick={onChooseEmoji} name="face_with_steam_from_nose" />
      <Emoji onClick={onChooseEmoji} name="nauseated_face" />
      <Emoji onClick={onChooseEmoji} name="sleepy_face" />
      <Emoji onClick={onChooseEmoji} name="neutral_face" />
      <Emoji onClick={onChooseEmoji} name="expressionless_face" />
      <Emoji onClick={onChooseEmoji} name="face_without_mouth" />
      <Emoji onClick={onChooseEmoji} name="face_with_rolling_eyes" />
      <Emoji onClick={onChooseEmoji} name="face_with_hand_over_mouth" />
    </Flex>
  )
}
