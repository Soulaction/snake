import type { AxiosError } from 'axios'
import { Notification } from '@/shared/lib'
import { getAxiosInstance } from '../api/axios-transport'

export interface ISigninDTO {
  login: string
  password: string
}

export interface ISignupDTO {
  email: string
  first_name: string
  login: string
  password: string
  phone: string
  second_name: string
}

export interface IData {
  reason: string
}

const { axios } = getAxiosInstance('/auth')

export class SignController {
  public async login(data: ISigninDTO, callBack?: () => void) {
    try {
      const response = await axios.post('/signin', data)
      console.log({ response })
      callBack?.()
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData

      if (reason === 'User already in system') {
        callBack?.()
      } else {
        Notification.error(reason)
      }
    }
  }

  public async logout() {
    try {
      await axios.post('/logout')
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }

  public async createAccount(data: ISignupDTO, callBack?: () => void) {
    try {
      const response = await axios.post('/signup', data)
      console.log({ response })
      callBack?.()
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }
}

export const signController = new SignController()
