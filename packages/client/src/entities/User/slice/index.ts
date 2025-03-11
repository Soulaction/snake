import { notification } from 'antd'
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
        notification.success({
          message: 'Успех',
          description: 'Профиль изменен',
          placement: 'topRight',
          showProgress: true,
        })
      })
      .addCase(changeUser.rejected, state => {
        state.userLoading = false
        notification.error({
          message: 'Ошибка',
          description: 'Не удалось изменить профиль',
          placement: 'topRight',
          showProgress: true,
        })
      })
      .addCase(changeAvatar.pending, state => {
        state.avatarLoading = true
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload.data
        notification.success({
          message: 'Успешно',
          description: 'Новый аватар успешно сохранен',
          placement: 'topRight',
          showProgress: true,
        })
      })
      .addCase(changeAvatar.rejected, state => {
        state.avatarLoading = false
        notification.error({
          message: 'Ошибка',
          description: 'Аватар не изменен',
          placement: 'topRight',
          showProgress: true,
        })
      })
  },
})

export default UserSlice.reducer
