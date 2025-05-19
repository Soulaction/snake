import { UserTopic } from '@/entities/Topic/types/UserTopic'

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
