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
        console.log('здесь могло быть ваше API на get топиков')
        resolve(mockData)
      }, 1000)
    })
  }

  public async addTopic(): Promise<number> {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.round(Math.random() * 1000))
      }, 250)
    })
  }

  public async getComments(): Promise<IComment[]> {
    return await new Promise(resolve => {
      setTimeout(() => {
        console.log('здесь могло быть ваше API на get комментов')
        resolve(topicMock)
      }, 1000)
    })
  }

  public async addComment(): Promise<number> {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.round(Math.random() * 1000))
      }, 250)
    })
  }
}

export const topicController = new TopicController()
