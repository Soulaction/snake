import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicController } from '@/shared/controllers/topic-controller'

export const getTopics = createAsyncThunk(
  'topic/comments',
  async (_, { rejectWithValue }) => {
    try {
      return topicController.getTopics()
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
