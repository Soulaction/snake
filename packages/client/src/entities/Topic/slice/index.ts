import { Notification } from '@/shared/lib'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITopic } from '@/pages/ForumPage/model/ITopic'
import { addTopic, getTopics } from '@/entities/Topic/service'

export type TopicState = {
  topics: ITopic[]
  currentTopic: number
  isLoading: boolean
}

const initialState: TopicState = {
  topics: [],
  currentTopic: 0,
  isLoading: false,
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setCurrentTopic: (state: TopicState, action: PayloadAction<number>) => {
      state.currentTopic = action.payload
    },
  },
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
      .addCase(addTopic.pending, state => {
        state.isLoading = true
      })
      .addCase(addTopic.fulfilled, (state, action) => {
        state.topics = action.payload
        state.isLoading = false
      })
      .addCase(addTopic.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage =
          action.error?.message || 'Не удалось добавить топик'
        Notification.error(errorMessage)
      })
  },
})

export const topicReducer = topicSlice.reducer

export const { setCurrentTopic } = topicSlice.actions
