import { AxiosError } from 'axios'
import { axiosInstance } from '../api/axios-transport'
import { Notification } from '../lib'
import { IData } from './sign-controller'

export interface INewLeader {
  name: string
  score_ypgang: number
}

const TEAM_NAME = 'ypgang'
const RATING_FIELD_NAME = 'score_ypgang'

const transformData = (data: INewLeader) => {
  return {
    data,
    ratingFieldName: RATING_FIELD_NAME,
    teamName: TEAM_NAME,
  }
}

class LeaderboardController {
  private readonly contextPath: string

  constructor() {
    this.contextPath = 'leaderboard'
  }
  public async createLeader(data: INewLeader) {
    try {
      console.log(transformData(data))
      await axiosInstance.post(this.contextPath, transformData(data))
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }

  public async getLeaders(currentPage = 0) {
    try {
      return await axiosInstance.post(`${this.contextPath}/all`, {
        ratingFieldName: RATING_FIELD_NAME,
        cursor: currentPage,
        limit: 10,
      })
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }
}

export const leaderboardController = new LeaderboardController()
