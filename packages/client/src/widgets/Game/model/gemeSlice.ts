import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatusGame } from '@/widgets/Game/model/types/StatusGame'
import { GameStore } from '@/widgets/Game/model/types'

const initialState: GameStore = {
  // @TODO заменить на StatusGame.Start, когда будет функционал по началу игры
  statusGame: StatusGame.Process,
  scope: 0,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatusGame: (state: GameStore, action: PayloadAction<StatusGame>) => {
      state.statusGame = action.payload
    },
    setScope: (state: GameStore, action: PayloadAction<number>) => {
      state.scope = action.payload
    },
  },
})

export const gameReducer = gameSlice.reducer
export const setStatusGame = gameSlice.actions.setStatusGame
export const setScope = gameSlice.actions.setScope
