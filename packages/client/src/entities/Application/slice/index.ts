import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ApplicationState {
  pageHasBeenInitializedOnServer: boolean
}

const initialState: ApplicationState = {
  pageHasBeenInitializedOnServer: false,
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setPageHasBeenInitializedOnServer: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.pageHasBeenInitializedOnServer = payload
    },
  },
})

export const { setPageHasBeenInitializedOnServer } = applicationSlice.actions
export const applicationReducer = applicationSlice.reducer
