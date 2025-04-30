import { mockData } from '@/pages/TopicPage/model/emojiConstant'
import { IReaction } from '@/pages/TopicPage/model/IReaction'

class ReactionController {
  private readonly contextPath: string

  constructor() {
    this.contextPath = 'reaction'
  }

  public async getReactions(commentId: number): Promise<IReaction[]> {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData.filter(reaction => reaction.commentId === commentId))
      }, 1000)
    })
  }

  public async addReaction(newReaction: IReaction): Promise<IReaction[]> {
    newReaction.id = Math.round(Math.random() * 1000)
    const newMock = [...mockData, newReaction]
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(
          newMock.filter(
            reaction => reaction.commentId === newReaction.commentId
          )
        )
      }, 250)
    })
  }
}

export const reactionController = new ReactionController()
