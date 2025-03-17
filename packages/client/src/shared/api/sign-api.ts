import { AxiosTransport } from './axios-transport'

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

const signAPIInstance = new AxiosTransport('/auth')

export class SignApp {
  createAccount(data?: ISignupDTO) {
    return signAPIInstance.post('/signup', { ...data })
  }

  signin(data?: ISigninDTO) {
    return signAPIInstance.post('/signin', { ...data })
  }

  logout() {
    return signAPIInstance.post('/logout')
  }

  getUserData() {
    return signAPIInstance.get('/user')
  }
}
