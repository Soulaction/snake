import { FC } from 'react'

interface IEmoji {
  name: string
  onClick?: () => void
}

const emojiHexCodes: Record<string, string> = {
  // Позитивные эмодзи
  grinning_face: '1F600',
  smiling_face_with_sunglasses: '1F60E',
  winking_face: '1F609',
  face_with_tears_of_joy: '1F602',
  thumbs_up: '1F44D',
  red_heart: '2764',
  fire: '1F525',
  star: '2B50',
  sparkles: '2728',
  party_popper: '1F389',
  clapping_hands: '1F44F',
  smiling_face_with_hearts: '1F970',
  alien: '1F47D',
  robot_face: '1F916',

  // Негативные эмодзи
  pensive_face: '1F614',
  crying_face: '1F622',
  angry_face: '1F620',
  face_with_symbols_on_mouth: '1F92C',
  disappointed_face: '1F61E',
  weary_face: '1F629',
  face_with_steam_from_nose: '1F624',
  nauseated_face: '1F922',
  sleepy_face: '1F62A',
  face_with_medical_mask: '1F637',

  // Нейтральные эмодзи
  neutral_face: '1F610',
  expressionless_face: '1F611',
  face_without_mouth: '1F636',
  thinking_face: '1F914',
  face_with_rolling_eyes: '1F926',
  sunglasses_face: '1F60E',
  'zipper-mouth_face': '1F910',
  face_with_monocle: '1F9D0',
  smirking_face: '1F60F',
  face_with_hand_over_mouth: '1F92B',
}

export const Emoji: FC<IEmoji> = props => {
  const { name } = props

  const parseEmoji = (hexCode: string) => {
    return String.fromCodePoint(parseInt(hexCode, 16))
  }

  return <span>{parseEmoji(emojiHexCodes[name])}</span>
}
