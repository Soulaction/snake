import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  AvatarRequest,
  AvatarResponse,
  ChangeUserRequest,
  ChangeUserResponse,
  IChangePasswordDTO,
} from '@/shared/types/api'
import { axiosInstance, axiosSnakeInstance } from '@/shared/api/axios-transport'
import { UserModel } from '@/shared/types/model'
import { signController } from '@/shared/controllers/sign-controller'

const contextPathAuth = '/auth'
const contextPathUser = '/user'

export const changeAvatar = createAsyncThunk(
  'user/change_avatar',
  async (body: AvatarRequest) => {
    const requestUrl = contextPathUser + '/profile/avatar'
    return axiosInstance.put<AvatarResponse>(requestUrl, body)
  }
)

export const changeUser = createAsyncThunk(
  'user/change_user',
  async (body: ChangeUserRequest) => {
    const requestUrl = contextPathUser + '/profile'
    return axiosInstance.put<ChangeUserResponse>(requestUrl, body)
  }
)

export const changeUserSnakeServer = createAsyncThunk(
  'user/change_user_snake_server',
  async (body: UserModel) => {
    const requestUrl = contextPathUser
    return axiosSnakeInstance.put<ChangeUserResponse>(requestUrl, body)
  }
)

export const getUserData = createAsyncThunk('user/get_user_data', async () => {
  const requestUrl = contextPathAuth + '/user'
  return axiosInstance.get<UserModel>(requestUrl)
})

export const logout = createAsyncThunk('user/logout', async () => {
  return signController.logout()
})

export const changeUserPassword = createAsyncThunk(
  'user/change_user_password',
  async (body: IChangePasswordDTO) => {
    const requestUrl = contextPathUser + '/password'
    return axiosInstance.put(requestUrl, body)
  }
)
