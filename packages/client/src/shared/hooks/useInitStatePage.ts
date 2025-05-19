import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { useEffect } from 'react'
import { AppDispatch } from '@/app/store'
import { setPageHasBeenInitializedOnServer } from '@/entities/Application/slice'
import { useAppSelector } from '@/shared/hooks/useAppSelector'

export type CtxContext = {
  cooke: string
}

export type PageInitArgs<T> = {
  dispatch: AppDispatch
  data?: T
  ctx?: CtxContext
}

export type PageInitFunc<T = any> = (data: PageInitArgs<T>) => Promise<unknown>

type PageProps<T> = {
  initPage: PageInitFunc<T>
}

export const useInitStatePage = <T = object>(
  { initPage }: PageProps<T>,
  data?: T
) => {
  const { pageHasBeenInitializedOnServer } = useAppSelector(
    state => state.application
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }

    void initPage({ dispatch, data })
  }, [])
}
