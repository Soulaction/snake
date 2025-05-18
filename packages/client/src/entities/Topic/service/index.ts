import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicController } from '@/shared/controllers/topic-controller'
import { Pageable } from '@/entities/types/Pageable'
import { Topic } from '@/entities/types/Topic'
import { AddTopic } from '@/entities/types/AddTopic'

export const getTopics = createAsyncThunk<
  Topic[],
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
  void,
  AddTopic,
  {
    rejectValue: string
  }
>('forum/add_topic', async (newTopic, { rejectWithValue }) => {
  try {
    topicController.addTopic(newTopic)
  } catch (e) {
    return rejectWithValue(e as string)
  }
})
