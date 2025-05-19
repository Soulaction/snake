import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicController } from '@/shared/controllers/topic-controller'
import { AddComment } from '@/entities/Topic/types/AddComment'
import { Comment } from '@/entities/Topic/types/Comment'
import { RootState } from '@/app/store'

export const getComments = createAsyncThunk<
  Comment[],
  string,
  {
    rejectValue: string
  }
>('forum/get_comment_list', async (id, { rejectWithValue }) => {
  try {
    const { data } = await topicController.getComments(id)
    return data
  } catch (e) {
    return rejectWithValue(e as string)
  }
})

export const addComment = createAsyncThunk<
  Comment[],
  AddComment,
  {
    state: RootState
    rejectValue: string
  }
>(
  'forum/add_comment',
  async (newComment: AddComment, { dispatch, getState, rejectWithValue }) => {
    try {
      newComment.ownerId = getState().user.user?.id ?? -1
      await topicController.addComment(newComment)
      return dispatch(getComments(String(newComment.topicId))).unwrap()
    } catch (e) {
      return rejectWithValue(e as string)
    }
  }
)
