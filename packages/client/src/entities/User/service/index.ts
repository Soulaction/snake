import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  changeUserResponse,
  avatarResponse,
  changeUserRequest,
  avatarRequest,
} from '@/shared/types/api'
import { apiYandex } from '@/shared/constants/api'

const userUrls = {
  avatar: apiYandex + '/user/profile/avatar',
  user: apiYandex + '/user/profile',
} as const

export const changeAvatar = createAsyncThunk(
  'user/change_avatar',
  async (body: avatarRequest) => {
    const requestUrl = userUrls.avatar
    return axios.put<avatarResponse>(requestUrl, body)
  }
)

export const changeUser = createAsyncThunk(
  'user/change_user',
  async (body: changeUserRequest) => {
    const requestUrl = userUrls.user
    return axios.put<changeUserResponse>(requestUrl, body)
  }
)
