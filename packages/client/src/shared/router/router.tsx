import { RouterPaths } from './router-paths'

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
import { ReactNode } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { PageInitFunc } from '@/shared/hooks/useInitStatePage'
import { initLoginPage } from '@/pages/LoginPage'
import { initRegistrationPage } from '@/pages/RegistrationPage'
import { initNotFoundPage } from '@/pages/NotFoundPage'
import { initErrorPage } from '@/pages/ErrorPage'
import { initProfilePage } from '@/pages/ProfilePage'
import { initEditPasswordPage } from '@/pages/EditPasswordPage'
import { initLeaderboardPage } from '@/pages/LeaderboardPage'
import { initGamePage } from '@/pages/GamePage'
import { initForumPage } from '@/pages/ForumPage'
import { initTopicPage } from '@/pages/TopicPage'
import { initMainPage } from '@/pages/MainPage'
import { LayoutWithHeader } from '@/widgets/layouts/LayoutWithHeader'
import { LayoutWithoutHeader } from '@/widgets/layouts/LayoutWithoutHeader'

type RouterInfo = {
  path: (typeof RouterPaths)[keyof typeof RouterPaths]
  element: ReactNode
  initFunc: PageInitFunc
  data?: unknown
}

export const publicRouters: RouterInfo[] = [
  {
    path: RouterPaths.MAIN,
    element: <MainPage />,
    initFunc: initMainPage,
  },
]

export const publicRoutersWithAuth: RouterInfo[] = [
  {
    path: RouterPaths.LOGIN,
    element: <LoginPage />,
    initFunc: initLoginPage,
  },
  {
    path: RouterPaths.REGISTRATION,
    element: <RegistrationPage />,
    initFunc: initRegistrationPage,
  },
  {
    path: RouterPaths.NOTFOUND,
    element: <NotFoundPage />,
    initFunc: initNotFoundPage,
  },
  {
    path: RouterPaths.ERROR,
    element: <ErrorPage />,
    initFunc: initErrorPage,
  },
]

export const privateRouters: RouterInfo[] = [
  {
    path: RouterPaths.PROFILE,
    element: <ProfilePage />,
    initFunc: initProfilePage,
  },
  {
    path: RouterPaths.PASSWORD,
    element: <EditPasswordPage />,
    initFunc: initEditPasswordPage,
  },
  {
    path: RouterPaths.LEADERBOARD,
    element: <LeaderboardPage />,
    initFunc: initLeaderboardPage,
  },
  {
    path: RouterPaths.GAME,
    element: <GamePage />,
    initFunc: initGamePage,
  },
  {
    path: RouterPaths.FORUM,
    element: <ForumPage />,
    data: { page: 1, limit: 5 },
    initFunc: initForumPage,
  },
  {
    path: RouterPaths.TOPIC,
    element: <TopicPage />,
    initFunc: initTopicPage,
  },
]

export const routs: RouteObject[] = [
  ...publicRouters.map(route => ({
    path: route.path,
    element: route.element,
  })),
  {
    path: '/',
    element: <LayoutWithoutHeader />,
    children: publicRoutersWithAuth.map(route => ({
      path: route.path,
      element: route.element,
    })),
  },
  {
    path: '/',
    element: <LayoutWithHeader />,
    children: privateRouters.map(route => ({
      path: route.path,
      element: route.element,
    })),
  },
]

export const getRouter = () =>
  createBrowserRouter(routs, {
    future: {
      v7_relativeSplatPath: true,
    },
  })
