import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatusGame } from '@/widgets/Game/model/types/StatusGame'
import { GameStore } from '@/widgets/Game/model/types'

const initialState: GameStore = {
  statusGame: StatusGame.Start,
  score: 0,
  level: 1,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatusGame: (state: GameStore, action: PayloadAction<StatusGame>) => {
      state.statusGame = action.payload
    },
    setScore: (state: GameStore, action: PayloadAction<number>) => {
      state.score = action.payload
    },
    setLevel: (state: GameStore, action: PayloadAction<number>) => {
      state.level = action.payload
    },
  },
})

export const gameReducer = gameSlice.reducer
export const setStatusGame = gameSlice.actions.setStatusGame
export const setScore = gameSlice.actions.setScore
export const setLevel = gameSlice.actions.setLevel
