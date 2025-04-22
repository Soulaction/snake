import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { useEffect } from 'react'
import { AppDispatch } from '@/app/store'
import { setPageHasBeenInitializedOnServer } from '@/entities/Application/slice'
import { useAppSelector } from '@/shared/hooks/useAppSelector'

export type CtxContext = {
  cooke: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  ctx?: CtxContext
}

export type PageInitFunc = (data: PageInitArgs) => Promise<unknown>

type PageProps = {
  initPage: PageInitFunc
}

export const useInitStatePage = ({ initPage }: PageProps) => {
  const { pageHasBeenInitializedOnServer } = useAppSelector(
    state => state.application
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }

    void initPage({ dispatch })
  }, [])
}
