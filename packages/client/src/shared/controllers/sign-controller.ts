import type { AxiosError } from 'axios'
import { Notification } from '@/shared/lib'
import { axiosInstance } from '../api/axios-transport'

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

interface IServiceDTO {
  redirect_uri: string
}

interface IOauthSignInRequest {
  code: string
  redirect_uri: string
}

export class SignController {
  private readonly contextPath: string
  private readonly contextOAuth: string

  constructor() {
    ;(this.contextPath = 'auth'), (this.contextOAuth = 'oauth/yandex')
  }

  public async login(data: ISigninDTO, callBack?: () => void) {
    try {
      await axiosInstance.post(this.contextPath + '/signin', data)
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
      await axiosInstance.post(this.contextPath + '/logout')
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }

  public async createAccount(data: ISignupDTO, callBack?: () => void) {
    try {
      await axiosInstance.post(this.contextPath + '/signup', data)
      callBack?.()
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }

  public async getServiceId(
    data: IServiceDTO,
    callBack?: (service_id: string) => void
  ) {
    try {
      const response = await axiosInstance.get(
        this.contextOAuth + '/service-id',
        { params: data }
      )
      const { service_id } = response.data
      callBack?.(service_id)
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }

  public async loginOAuth(data: IOauthSignInRequest, callBack?: () => void) {
    try {
      const response = await axiosInstance.post(this.contextOAuth, data)
      callBack?.()
    } catch (error) {
      const { response } = error as AxiosError
      const { reason } = response?.data as IData
      Notification.error(reason)
    }
  }
}

export const signController = new SignController()
