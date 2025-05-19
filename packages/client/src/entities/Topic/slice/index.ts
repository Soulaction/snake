import { Notification } from '@/shared/lib'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTopic, getTopics } from '@/entities/Topic/service'
import { PageableTopic } from '@/entities/Topic/types/PageableTopic'
import { Topic } from '@/entities/Topic/types/Topic'

export type TopicState = {
  topics: PageableTopic | null
  currentTopic: Topic | null
  isLoading: boolean
}

const initialState: TopicState = {
  topics: null,
  currentTopic: null,
  isLoading: false,
}

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setCurrentTopic: (state: TopicState, action: PayloadAction<Topic>) => {
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
