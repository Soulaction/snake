import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicController } from '@/shared/controllers/topic-controller'
import { Pageable } from '@/entities/Topic/types/Pageable'
import { AddTopic } from '@/entities/Topic/types/AddTopic'
import { PageableTopic } from '@/entities/Topic/types/PageableTopic'
import { RootState } from '@/app/store'
import { Topic } from '@/entities/Topic/types/Topic'

export const getTopics = createAsyncThunk<
  PageableTopic,
  Pageable,
  {
    rejectValue: string
  }
>('forum/get_topic_list', async (pageable, { rejectWithValue }) => {
  try {
    const { data } = await topicController.getTopics(pageable)
    return data
  } catch (e) {
    return rejectWithValue(e as string)
  }
})

export const addTopic = createAsyncThunk<
  PageableTopic,
  AddTopic,
  {
    state: RootState
    rejectValue: string
  }
>('forum/add_topic', async (newTopic, { getState, rejectWithValue }) => {
  try {
    newTopic.ownerId = getState().user.user?.id ?? -1
    await topicController.addTopic(newTopic)
    const { data } = await topicController.getTopics({ page: 1, limit: 5 })
    return data
  } catch (e) {
    return rejectWithValue(e as string)
  }
})

export const getTopic = createAsyncThunk<
  Topic,
  string,
  {
    state: RootState
    rejectValue: string
  }
>('forum/get_topic', async (idTopic, { rejectWithValue }) => {
  try {
    const { data } = await topicController.getTopicsById(idTopic)
    return data
  } catch (e) {
    return rejectWithValue(e as string)
  }
})
