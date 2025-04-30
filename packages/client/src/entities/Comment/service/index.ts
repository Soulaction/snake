import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicController } from '@/shared/controllers/topic-controller'
import { IComment } from '@/pages/TopicPage/model/IComment'

export const getComments = createAsyncThunk(
  'forum/get_comment_list',
  async (id: number, { rejectWithValue }) => {
    try {
      return topicController.getComments(id)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const addComment = createAsyncThunk(
  'forum/add_comment',
  async (newComment: IComment, { rejectWithValue }) => {
    try {
      return topicController.addComment(newComment)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
