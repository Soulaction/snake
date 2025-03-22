import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ChangeUserResponse,
  AvatarResponse,
  ChangeUserRequest,
  AvatarRequest,
  IChangePasswordDTO,
} from '@/shared/types/api'
import { getAxiosInstance } from '@/shared/api/axios-transport'
import { UserModel } from '@/shared/types/model'

const { axios: axiosAuth } = getAxiosInstance('/auth')
const { axios: axiosUser } = getAxiosInstance('/user')

const userUrls = {
  avatar: '/profile/avatar',
  user: '/profile',
  data: '/user',
  password: '/password',
} as const

export const changeAvatar = createAsyncThunk(
  'user/change_avatar',
  async (body: AvatarRequest) => {
    const requestUrl = userUrls.avatar
    return axiosUser.put<AvatarResponse>(requestUrl, body)
  }
)

export const changeUser = createAsyncThunk(
  'user/change_user',
  async (body: ChangeUserRequest) => {
    const requestUrl = userUrls.user
    return axiosUser.put<ChangeUserResponse>(requestUrl, body)
  }
)

export const getUserData = createAsyncThunk('user/get_user_data', async () => {
  return axiosAuth.get<UserModel>(userUrls.data)
})

export const changeUserPassword = createAsyncThunk(
  'user/change_user_password',
  async (body: IChangePasswordDTO) => {
    const requestUrl = userUrls.password
    return axiosUser.put(requestUrl, body)
  }
)
