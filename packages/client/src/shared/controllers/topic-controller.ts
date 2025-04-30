import { mockData } from '@/pages/ForumPage/model/forumConstant'
import { mockData as topicMock } from '@/pages/TopicPage/model/topicConstant'
import { ITopic } from '@/pages/ForumPage/model/ITopic'
import { IComment } from '@/pages/TopicPage/model/IComment'

export class TopicController {
  private readonly contextPath: string

  constructor() {
    this.contextPath = 'topic'
  }

  public async getTopics(): Promise<ITopic[]> {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData)
      }, 1000)
    })
  }

  public async addTopic(newTopic: ITopic): Promise<ITopic[]> {
    newTopic.id = Math.round(Math.random() * 1000)
    const newMock = [newTopic, ...mockData]
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(newMock)
      }, 250)
    })
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
