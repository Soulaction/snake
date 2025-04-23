import { RootState } from '@/app/store'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}
declare const __EXTERNAL_SERVER_URL__: string
declare const __INTERNAL_SERVER_URL__: string
