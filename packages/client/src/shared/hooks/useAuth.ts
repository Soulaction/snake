import { setAuth } from '@/entities/User/slice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useCallback } from 'react'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(store => store.user.isAuth)
  const setAuthStatus = useCallback(
    (isAuth: boolean) => {
      dispatch(setAuth({ isAuth }))
    },
    [dispatch, setAuth]
  )

  return { isAuth, setAuth: setAuthStatus }
}
