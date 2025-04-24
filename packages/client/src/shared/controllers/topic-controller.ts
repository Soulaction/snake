import { mockData } from '@/pages/ForumPage/model/forumConstant'
import { ITopic } from '@/pages/ForumPage/model/ITopic'

export class TopicController {
  private readonly contextPath: string

  constructor() {
    this.contextPath = 'topic'
  }

  public async getTopics(): Promise<ITopic[]> {
    return await new Promise(resolve => {
      setTimeout(() => {
        console.log('здесь могло быть ваше API на get комментов')
        resolve(mockData)
      }, 1000)
    })
  }
}

export const topicController = new TopicController()
