import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserReducer from '@/entities/User/slice'

const reducer = combineReducers({
  user: UserReducer,
})

// @ts-expect-error типы any
const rootReducer = (state, action) => {
  if (action.type === 'reset') {
    state = undefined
  }
  return reducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
