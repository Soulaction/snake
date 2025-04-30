import { Notification } from '@/shared/lib'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IComment } from '@/pages/TopicPage/model/IComment'
import { addComment, getComments } from '@/entities/Comment/service'

export type CommentState = {
  comments: IComment[]
  isLoading: boolean
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getComments.pending, state => {
        state.isLoading = true
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload
        state.isLoading = false
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage =
          action.error?.message || 'Не удалось загрузить комментарии'
        Notification.error(errorMessage)
      })
      .addCase(addComment.pending, state => {
        state.isLoading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = action.payload
        state.isLoading = false
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage =
          action.error?.message || 'Не удалось добавить топик'
        Notification.error(errorMessage)
      })
  },
})

export const commentReducer = commentSlice.reducer
