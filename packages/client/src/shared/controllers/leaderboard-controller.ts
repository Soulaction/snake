import { AxiosError } from 'axios'
import { getAxiosInstance } from '../api/axios-transport'
import { Notification } from '../lib'
import { IData } from './sign-controller'

export interface INewLeader {
  name: string
  score: number
}

const TEAM_NAME = 'ypgang'
const RATING_FIELD_NAME = 'score'

const transformData = (data: INewLeader) => {
  return {
    data,
    ratingFiledName: RATING_FIELD_NAME,
    teamName: TEAM_NAME,
  }
}

const { axios } = getAxiosInstance('/leaderboard')

export class LeaderboardController {
  public async createLeader(data: INewLeader) {
    try {
      console.log(transformData(data))
      await axios.post('', transformData(data)).then(data => console.log(data))
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }

  public async getLeaders(currentPage = 0) {
    try {
      return await axios.post(`/${TEAM_NAME}`, {
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
