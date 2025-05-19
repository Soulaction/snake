import { Topic } from '@/entities/Topic/types/Topic'

export type PageableTopic = {
  data: Topic[]
  total: number
}
