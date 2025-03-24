import { Notification } from '@/shared/lib'
import { createSlice } from '@reduxjs/toolkit'
import { UserModel } from '@/shared/types/model'
import { userInitial } from '../mock'
import { changeAvatar, changeUser, changeUserPassword, getUserData } from '../service'

const initialState = {
  user: { ...userInitial } as UserModel,
  userLoading: false,
  avatarLoading: false,
  passwordChanging: false,
  isAuth: false,
}

export type UserState = Readonly<typeof initialState>

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload.isAuth
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
      .addCase(getUserData.pending, state => {
        state.userLoading = true
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.userLoading = false
      })
      .addCase(getUserData.rejected, (state, action) => {
        const errorMessage =
          action.error?.message || 'Не удалось получить данные пользователя'
        Notification.error(errorMessage)
      })
      .addCase(changeUserPassword.pending, state => {
        state.passwordChanging = true
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.passwordChanging = false
        Notification.success('Новый пароль сохранен')
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        console.log({ action });
        state.passwordChanging = false
        const errorMessage =
          action.error?.message || 'Не удалось поменять пароль'
        Notification.error(errorMessage)
      })
  },
})

export default UserSlice.reducer
export const { setAuth } = UserSlice.actions
