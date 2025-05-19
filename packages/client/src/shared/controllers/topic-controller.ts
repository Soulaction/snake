import { Pageable } from '@/entities/Topic/types/Pageable'
import { AxiosResponse } from 'axios'
import { AddTopic } from '@/entities/Topic/types/AddTopic'
import { axiosSnakeInstance } from '@/shared/api/axios-transport'
import { PageableTopic } from '@/entities/Topic/types/PageableTopic'
import { AddComment } from '@/entities/Topic/types/AddComment'
import { Comment } from '@/entities/Topic/types/Comment'

export class TopicController {
  private readonly contextPathTopic: string
  private readonly contextPathMessage: string

  constructor() {
    this.contextPathTopic = '/topic'
    this.contextPathMessage = '/message'
  }

  public async getTopics(
    pageable: Pageable
  ): Promise<AxiosResponse<PageableTopic>> {
    return axiosSnakeInstance.get(this.contextPathTopic, { params: pageable })
  }

  public async addTopic(newTopic: AddTopic): Promise<AxiosResponse<void>> {
    return axiosSnakeInstance.post(this.contextPathTopic, newTopic)
  }

  public async getComments(id: string): Promise<AxiosResponse<Comment[]>> {
    return axiosSnakeInstance.get(`${this.contextPathMessage}/${id}`)
  }

  public async addComment(comment: AddComment): Promise<void> {
    return axiosSnakeInstance.post(this.contextPathMessage, comment)
  }
}

export const topicController = new TopicController()
