import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ChangeUserResponse,
  AvatarResponse,
  ChangeUserRequest,
  AvatarRequest,
} from '@/shared/types/api'
import { apiYandex } from '@/shared/constants/api'

const userUrls = {
  avatar: apiYandex + '/user/profile/avatar',
  user: apiYandex + '/user/profile',
} as const

export const changeAvatar = createAsyncThunk(
  'user/change_avatar',
  async (body: AvatarRequest) => {
    const requestUrl = userUrls.avatar
    return axios.put<AvatarResponse>(requestUrl, body)
  }
)

export const changeUser = createAsyncThunk(
  'user/change_user',
  async (body: ChangeUserRequest) => {
    const requestUrl = userUrls.user
    return axios.put<ChangeUserResponse>(requestUrl, body)
  }
)
