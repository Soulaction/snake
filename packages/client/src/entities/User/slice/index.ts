import { Notification } from '@/shared/lib'
import { createSlice } from '@reduxjs/toolkit'
import { UserModel } from '@/shared/types/model'
import { userInitial } from '../mock'
import { changeAvatar, changeUser } from '../service'

const initialState = {
  user: { ...userInitial } as UserModel,
  userLoading: false,
  avatarLoading: false,
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
        Notification.success('Профиль изменен')
      })
      .addCase(changeUser.rejected, state => {
        state.userLoading = false
        Notification.error('Не удалось изменить профиль')
      })
      .addCase(changeAvatar.pending, state => {
        state.avatarLoading = true
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload.data
        Notification.success('Новый аватар сохранен')
      })
      .addCase(changeAvatar.rejected, state => {
        state.avatarLoading = false
        Notification.error('Аватар не изменен')
      })
  },
})

export default UserSlice.reducer
