import { Route, Routes } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import {
  EditPasswordPage,
  ErrorPage,
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  TopicPage,
} from '@/pages'
import { FC } from 'react'
import { PrivateLayout } from '@/widgets/layouts/PrivateLayout'
import { useAuth } from '@/shared/hooks'
import { Spin } from 'antd'
import style from './AppRouter.module.css'
import { PublicLayout } from '@/widgets/layouts/PublicLayout'

export const AppRouter: FC = () => {
  const { isAuth, userLoading } = useAuth()

  return userLoading ? (
    <Spin className={style.spin} size="large" />
  ) : (
    <Routes>
      <Route
        key={RouterPaths.main}
        path={RouterPaths.main}
        element={<MainPage />}
      />
      <Route key="layout" element={<PublicLayout isAuth={isAuth} />}>
        <Route
          key={RouterPaths.login}
          path={RouterPaths.login}
          element={<LoginPage />}
        />
        <Route
          key={RouterPaths.registration}
          path={RouterPaths.registration}
          element={<RegistrationPage />}
        />
        <Route
          key={RouterPaths['not-found']}
          path={RouterPaths['not-found']}
          element={<NotFoundPage />}
        />
        <Route
          key={RouterPaths.error}
          path={RouterPaths.error}
          element={<ErrorPage />}
        />
      </Route>
      <Route key="private" element={<PrivateLayout isAuth={isAuth} />}>
        <Route
          key={RouterPaths.game}
          path={RouterPaths.game}
          element={<GamePage />}
        />
        <Route
          key={RouterPaths.leaderboard}
          path={RouterPaths.leaderboard}
          element={<LeaderboardPage />}
        />
        <Route
          key={RouterPaths.forum}
          path={RouterPaths.forum}
          element={<ForumPage />}
        />
        <Route
          key={RouterPaths.profile}
          path={RouterPaths.profile}
          element={<ProfilePage />}
        />
        <Route
          key={RouterPaths['edit-password']}
          path={RouterPaths['edit-password']}
          element={<EditPasswordPage />}
        />
        <Route
          key={RouterPaths.topic}
          path={RouterPaths.topic}
          element={<TopicPage />}
        />
      </Route>
    </Routes>
  )
}
