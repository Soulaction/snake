import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicController } from '@/shared/controllers/topic-controller'

export const getTopics = createAsyncThunk(
  'forum/topic/list',
  async (_, { rejectWithValue }) => {
    try {
      return topicController.getTopics()
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const addTopic = createAsyncThunk(
  'forum/topic/add',
  async (_, { rejectWithValue }) => {
    try {
      return topicController.addTopic()
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
export const getComments = createAsyncThunk(
  'forum/comment/list',
  async (_, { rejectWithValue }) => {
    try {
      return topicController.getComments()
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const addComment = createAsyncThunk(
  'forum/comment/add',
  async (_, { rejectWithValue }) => {
    try {
      return topicController.addComment()
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
