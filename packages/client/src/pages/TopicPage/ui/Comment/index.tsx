import { CalendarOutlined, SmileOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Popover, Typography } from 'antd'
import { FC, useCallback, useEffect, useState } from 'react'
import { IComment } from '@/pages/TopicPage/model/IComment'
import styles from './Comment.module.css'
import { EmojiPicker } from '../EmojiPicker'
import { IReaction } from '../../model/IReaction'
import { Emoji } from '../Emoji'
import { useAppSelector } from '@/shared/hooks'
import { reactionController } from '@/shared/controllers/reaction-controller'

interface TransformedReaction {
  reaction: string
  count: number
  isReacted: boolean
}

const { Text } = Typography
const { Meta } = Card

export const Comment: FC<IComment> = props => {
  const { id, author, content, date } = props
  const [reactions, setReactions] = useState<IReaction[]>([])

  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    reactionController.getReactions(id).then(data => {
      setReactions(data)
    })
  }, [])

  const onReaction = (reaction: string) => {
    const newReaction = {
      id: 111,
      userId: user?.id as number,
      commentId: id,
      reaction,
    }
    reactionController.addReaction(newReaction).then(data => {
      setReactions(data)
    })
  }

  const transformReactions = useCallback(
    (reactions: IReaction[]) => {
      return Object.values(
        reactions.reduce<Record<string, TransformedReaction>>(
          (acc, { reaction, userId }) => {
            if (!acc[reaction]) {
              acc[reaction] = { reaction, count: 0, isReacted: false }
            }
            acc[reaction].isReacted = userId === user?.id ? true : false
            acc[reaction].count += 1
            return acc
          },
          {}
        )
      )
    },
    [reactions]
  )

  const renderReactions = useCallback(
    (reactions: TransformedReaction[]) => {
      return reactions.map(({ reaction, count, isReacted }, index) => {
        return (
          <Flex
            className={isReacted ? styles.reacted : ''}
            key={index}
            align="center"
            gap={5}>
            <Emoji name={reaction} onClick={onReaction} />
            <Text type="secondary">{count}</Text>
          </Flex>
        )
      })
    },
    [reactions]
  )

  return (
    <Card size="small">
      <Meta
        avatar={<Avatar size={'large'} src={author.avatar} />}
        title={author.name}
        description={content}
      />
      <Flex
        justify="flex-end"
        align="center"
        className={styles.footer}
        gap={30}>
        <Flex align="center" gap={15}>
          {renderReactions(transformReactions(reactions))}
          <Popover
            content={<EmojiPicker onChooseEmoji={onReaction} />}
            trigger="click">
            <Button shape="circle" variant="text">
              <SmileOutlined />
            </Button>
          </Popover>
        </Flex>
        <Text type="secondary">
          <CalendarOutlined /> {date}
        </Text>
      </Flex>
    </Card>
  )
}
