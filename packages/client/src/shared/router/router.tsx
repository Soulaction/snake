import { RouterPaths } from './RouterPaths'

import {
  EditPasswordPage,
  ErrorPage,
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  TopicPage,
} from '@/pages'
import { ReactNode } from 'react'

type RouterInfo = {
  path: (typeof RouterPaths)[keyof typeof RouterPaths]
  element: ReactNode
}

export const publicRouters: RouterInfo[] = [
  {
    path: RouterPaths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RouterPaths.REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: RouterPaths.NOTFOUND,
    element: <NotFoundPage />,
  },
  {
    path: RouterPaths.ERROR,
    element: <ErrorPage />,
  },
]

export const privateRouters: RouterInfo[] = [
  {
    path: RouterPaths.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: RouterPaths.PASSWORD,
    element: <EditPasswordPage />,
  },
  {
    path: RouterPaths.LEADERBOARD,
    element: <LeaderboardPage />,
  },
  {
    path: RouterPaths.GAME,
    element: <GamePage />,
  },
  {
    path: RouterPaths.FORUM,
    element: <ForumPage />,
  },
  {
    path: RouterPaths.TOPIC,
    element: <TopicPage />,
  },
]
