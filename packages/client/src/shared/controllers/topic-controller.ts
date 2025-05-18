import { mockData as topicMock } from '@/pages/TopicPage/model/topicConstant'
import { IComment } from '@/pages/TopicPage/model/IComment'
import { Topic } from '@/entities/types/Topic'
import { Pageable } from '@/entities/types/Pageable'
import { AxiosResponse } from 'axios'
import { AddTopic } from '@/entities/types/AddTopic'
import { axiosSnakeInstance } from '@/shared/api/axios-transport'

export class TopicController {
  private readonly contextPath: string

  constructor() {
    this.contextPath = '/topic'
  }

  public async getTopics(pageable: Pageable): Promise<AxiosResponse<Topic[]>> {
    return axiosSnakeInstance.get(this.contextPath, { params: pageable })
  }

  public async addTopic(newTopic: AddTopic): Promise<AxiosResponse<void>> {
    return axiosSnakeInstance.post(this.contextPath, newTopic)
  }

  public async getComments(id: number): Promise<IComment[]> {
    const [arComments] = Object.entries(topicMock)
      .filter(([key, _]) => parseInt(key as unknown as string) === id)
      .map(element => element[1])
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(arComments as unknown as IComment[])
      }, 1000)
    })
  }

  public async addComment(comment: IComment): Promise<IComment[]> {
    const [arComments] = Object.entries(topicMock)
      .filter(
        ([key, _]) => parseInt(key as unknown as string) === comment.parent_id
      )
      .map(element => element[1])
    comment.id = Math.round(Math.random() * 1000)
    const newComments = [comment, ...arComments]
    console.log(comment, newComments)
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(newComments as unknown as IComment[])
      }, 250)
    })
  }
}

export const topicController = new TopicController()
