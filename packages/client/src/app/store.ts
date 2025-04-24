import {
  combineReducers,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit'
import userReducer from '@/entities/User/slice'
import { topicReducer } from '@/entities/Topic/slice'
import { gameReducer } from '@/widgets/Game/model/gemeSlice'
import { applicationReducer } from '@/entities/Application/slice'

export type RootState = {
  application: ReturnType<typeof applicationReducer>
  user: ReturnType<typeof userReducer>
  game: ReturnType<typeof gameReducer>
  topic: ReturnType<typeof topicReducer>
}

const reducer = combineReducers({
  application: applicationReducer,
  user: userReducer,
  game: gameReducer,
  topic: topicReducer,
})

type RootAction = PayloadAction<unknown> | { type: 'reset' }

const rootReducer = (state: RootState | undefined, action: RootAction) =>
  reducer(state, action)

export const store = configureStore({
  reducer: rootReducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
