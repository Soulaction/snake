import type { RouteProps } from 'react-router-dom'
import { AppRoutes, RouterPaths, type AppRoutesValues } from './RouterPaths'

import {
  NotFoundPage,
  ForumPage,
  TopicPage,
  GamePage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  LeaderboardPage,
  MainPage,
  ErrorPage,
  EditPasswordPage,
} from '@/pages'

export const router: Record<AppRoutesValues, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPaths.main,
    element: <MainPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RouterPaths.login,
    element: <LoginPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: RouterPaths.registration,
    element: <RegistrationPage />,
  },
  [AppRoutes.PROFILE]: {
    path: RouterPaths.profile,
    element: <ProfilePage />,
  },
  [AppRoutes.PASSWORD]: {
    path: RouterPaths['edit-password'],
    element: <EditPasswordPage />,
  },
  [AppRoutes.LEADERBOARD]: {
    path: RouterPaths.leaderboard,
    element: <LeaderboardPage />,
  },
  [AppRoutes.GAME]: {
    path: RouterPaths.game,
    element: <GamePage />,
  },
  [AppRoutes.FORUM]: {
    path: RouterPaths.forum,
    element: <ForumPage />,
  },
  [AppRoutes.TOPIC]: {
    path: RouterPaths.topic,
    element: <TopicPage />,
  },
  [AppRoutes.NOTFOUND]: {
    path: RouterPaths['not-found'],
    element: <NotFoundPage />,
  },
  [AppRoutes.ERROR]: {
    path: RouterPaths['error'],
    element: <ErrorPage />,
  },
}
