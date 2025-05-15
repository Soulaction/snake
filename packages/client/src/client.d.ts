import { RootState } from '@/app/store'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}
