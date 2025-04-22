import { Notification } from '@/shared/lib'
import { createSlice } from '@reduxjs/toolkit'
import { ITopic } from '@/pages/ForumPage/model/ITopic'
import { getTopics } from '@/entities/Topic/service'

export type TopicState = Readonly<{
  topics: ITopic[]
  isLoading: boolean
}>

const initialState: TopicState = {
  topics: [],
  isLoading: false,
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTopics.pending, state => {
        state.isLoading = true
      })
      .addCase(getTopics.fulfilled, (state, action) => {
        state.topics = action.payload
        state.isLoading = false
      })
      .addCase(getTopics.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage =
          action.error?.message || 'Не удалось загрузить комментарии'
        Notification.error(errorMessage)
      })
  },
})

export const topicReducer = topicSlice.reducer
