import type { RouteProps } from 'react-router-dom'

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
} from '@/pages'

export const AppRoutes = {
  MAIN: 'main',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  PROFILE: 'profile',
  LEADERBOARD: 'leaderboard',
  GAME: 'game',
  FORUM: 'forum',
  TOPIC: 'topic',
  NOTFOUND: 'not-found',
} as const

type AppRoutesKeys = keyof typeof AppRoutes
type AppRoutesValues = (typeof AppRoutes)[AppRoutesKeys]

export const RouterPaths: Record<AppRoutesValues, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/sign-in',
  [AppRoutes.REGISTRATION]: '/sign-up',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.GAME]: '/game',
  [AppRoutes.LEADERBOARD]: '/leaderboard',
  [AppRoutes.FORUM]: '/forum',
  [AppRoutes.NOTFOUND]: '*',
  [AppRoutes.TOPIC]: '/topic/:topicId',
}

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
}
