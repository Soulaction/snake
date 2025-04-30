import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicController } from '@/shared/controllers/topic-controller'
import { ITopic } from '@/pages/ForumPage/model/ITopic'

export const getTopics = createAsyncThunk(
  'forum/get_topic_list',
  async (_, { rejectWithValue }) => {
    try {
      return topicController.getTopics()
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const addTopic = createAsyncThunk(
  'forum/add_topic',
  async (newTopic: ITopic, { rejectWithValue }) => {
    try {
      return topicController.addTopic(newTopic)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
