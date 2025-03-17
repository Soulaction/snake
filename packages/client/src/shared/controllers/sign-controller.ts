import type { NavigateFunction } from 'react-router-dom'
import { SignApp } from '../api/sign-api'
import type { ISigninDTO, ISignupDTO } from '../api/sign-api'
import { RouterPaths } from '../router'
import type { AxiosError } from 'axios'

const signAppApi = new SignApp()

export class SignController {
  public async login(data: ISigninDTO, navigateCallBack: NavigateFunction) {
    try {
      await signAppApi.signin(data)
      navigateCallBack(RouterPaths.main)
    } catch (error) {
      const { status } = error as AxiosError
      console.error('Ошибка входа', { error })
      if (status) this.redirectByStatus(status, navigateCallBack)
    }
  }

  public async logout(navigateCallBack: NavigateFunction) {
    try {
      await signAppApi.logout()
      navigateCallBack(RouterPaths.login)
    } catch (error) {
      console.error('Ошибка выхода', { error })
    }
  }

  public async createAccount(
    data: ISignupDTO,
    navigateCallBack: NavigateFunction
  ) {
    try {
      await signAppApi.createAccount(data)
      navigateCallBack(RouterPaths.main)
    } catch (error) {
      console.error('Ошибка создания аккаунта', { error })
    }
  }

  public async getUserData() {
    try {
      const response = await signAppApi.getUserData()
      console.log({ response })
    } catch (error) {
      console.error('Ошибка получения данных пользователя', { error })
    }
  }

  public redirectByStatus(status: number, navigate: NavigateFunction) {
    if (status === 401) {
      navigate(RouterPaths.login)
    } else if (status === 400) {
      navigate(RouterPaths.main)
    } else if (status === 404) {
      navigate(RouterPaths['not-found'])
    } else if (status === 500) {
      navigate(RouterPaths.error)
    }
  }
}

export const signController = new SignController()
