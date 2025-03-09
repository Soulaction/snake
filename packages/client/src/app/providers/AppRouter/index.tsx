import { Routes, Route } from 'react-router-dom'
import { RouterPaths } from '@/shared/router'
import { MainLayout } from '@/widgets'
import {
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
import type { FC } from 'react'

export const AppRouter: FC = () => (
  <Routes>
    <Route key="layout" element={<MainLayout />}>
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
        key={RouterPaths.game}
        path={RouterPaths.game}
        element={<GamePage />}
      />
      <Route
        key={RouterPaths.main}
        path={RouterPaths.main}
        element={<MainPage />}
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
        key={RouterPaths.topic}
        path={RouterPaths.topic}
        element={<TopicPage />}
      />
    </Route>
  </Routes>
)
