import { Notification } from '@/shared/lib'
import { createSlice } from '@reduxjs/toolkit'
import { UserModel } from '@/shared/types/model'
import {
  changeAvatar,
  changeUser,
  changeUserPassword,
  getUserData,
  logout,
} from '../service'

export type UserState = Readonly<{
  user: UserModel | null
  userLoading: boolean
  avatarLoading: boolean
  passwordChanging: boolean
  isAuth: boolean
  theme: 'light' | 'dark'
}>

const initialState: UserState = {
  user: null,
  userLoading: true,
  avatarLoading: false,
  passwordChanging: false,
  isAuth: false,
  theme: 'light',
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleTheme(state) {
      console.log('toggleTheme')
      if (state.theme === 'light') state.theme = 'dark'
      else state.theme = 'light'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(changeUser.pending, state => {
        state.userLoading = true
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.userLoading = false
        Notification.success('Профиль изменен')
      })
      .addCase(changeUser.rejected, (state, action) => {
        state.userLoading = false
        const errorMessage =
          action.error?.message || 'Не удалось изменить профиль'
        Notification.error(errorMessage)
      })
      .addCase(changeAvatar.pending, state => {
        state.avatarLoading = true
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload.data
        Notification.success('Новый аватар сохранен')
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.avatarLoading = false
        const errorMessage =
          action.error?.message || 'Не удалось изменить аватар'
        Notification.error(errorMessage)
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isAuth = true
      })
      .addCase(getUserData.rejected, state => {
        state.isAuth = false
      })
      .addCase(logout.pending, state => {
        state.userLoading = true
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
        state.userLoading = false
        state.isAuth = false
      })
      .addCase(changeUserPassword.pending, state => {
        state.passwordChanging = true
      })
      .addCase(changeUserPassword.fulfilled, state => {
        state.passwordChanging = false
        Notification.success('Новый пароль сохранен')
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.passwordChanging = false
        const errorMessage =
          action.error?.message || 'Не удалось поменять пароль'
        Notification.error(errorMessage)
      })
  },
})

export const { toggleTheme } = UserSlice.actions
export default UserSlice.reducer
