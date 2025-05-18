import { UserTopic } from '@/entities/types/UserTopic'

export type Topic = {
  id: number
  title: string
  description: string
  ownerId: 1
  createdAt: string
  updatedAt: string
  messageCount: string
  userEntity: UserTopic
}
