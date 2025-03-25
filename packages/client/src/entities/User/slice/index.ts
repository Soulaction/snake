import { Notification } from '@/shared/lib'
import { createSlice } from '@reduxjs/toolkit'
import { UserModel } from '@/shared/types/model'
import { userInitial } from '../mock'
import {
  changeAvatar,
  changeUser,
  changeUserPassword,
  getUserData,
  logout,
} from '../service'

const initialState = {
  user: { ...userInitial } as UserModel,
  userLoading: true,
  avatarLoading: false,
  passwordChanging: false,
  isAuth: false,
}

export type UserState = Readonly<typeof initialState>

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {},
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
      .addCase(getUserData.pending, state => {
        state.userLoading = true
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.userLoading = false
        state.isAuth = true
      })
      .addCase(getUserData.rejected, state => {
        state.isAuth = false
        state.userLoading = false
      })
      .addCase(logout.pending, state => {
        state.userLoading = true
      })
      .addCase(logout.fulfilled, state => {
        state.user = userInitial
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
        console.log({ action })
        state.passwordChanging = false
        const errorMessage =
          action.error?.message || 'Не удалось поменять пароль'
        Notification.error(errorMessage)
      })
  },
})

export default UserSlice.reducer
