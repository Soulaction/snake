import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useEffect } from 'react'
import { getUserData } from '@/entities/User/service'

export const useAuth = () => {
  const { isAuth, userLoading } = useAppSelector(store => store.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  return { isAuth, userLoading }
}
