import {
  combineReducers,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit'
import UserReducer from '@/entities/User/slice'
import { gameReducer } from '@/widgets/Game/model/gemeSlice'

export type RootState = {
  user: ReturnType<typeof UserReducer>
  game: ReturnType<typeof gameReducer>
}

const reducer = combineReducers({
  user: UserReducer,
  game: gameReducer,
})

type RootAction = PayloadAction<any> | { type: 'reset' }

const rootReducer = (state: RootState | undefined, action: RootAction) =>
  reducer(state, action)

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
