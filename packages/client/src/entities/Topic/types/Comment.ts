import { UserTopic } from '@/entities/Topic/types/UserTopic'

export type Comment = {
  id: number
  message: string
  ownerId: number
  topicId: number
  createdAt: string
  updatedAt: string
  userEntity: UserTopic
}
