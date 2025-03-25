import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useEffect } from 'react'
import { getUserData } from '@/entities/User/service'
import { RouterPaths } from '@/shared/router'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const { isAuth, userLoading } = useAppSelector(store => store.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  useEffect(() => {
    if (isAuth) {
      navigate(RouterPaths.main)
    }
  }, [isAuth])

  return { isAuth, userLoading }
}
