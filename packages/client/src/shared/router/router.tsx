import { RouterPaths } from './RouterPaths'

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
import { createBrowserRouter } from 'react-router-dom'
import { PrivateLayout, PublicLayout } from '@/widgets'

type RouterInfo = {
  path: typeof RouterPaths[keyof typeof RouterPaths]
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

export const getRouts = (isAuth: boolean) => [
  {
    path: RouterPaths.MAIN,
    element: <MainPage />,
  },
  {
    path: '/',
    element: <PublicLayout isAuth={isAuth} />,
    children: publicRouters.map(route => ({
      path: route.path,
      element: route.element,
    })),
  },
  {
    path: '/',
    element: <PrivateLayout isAuth={isAuth} />,
    children: privateRouters.map(route => ({
      path: route.path,
      element: route.element,
    })),
  },
]

export const getRouter = (isAuth: boolean) =>
  createBrowserRouter(getRouts(isAuth), {
    future: {
      v7_relativeSplatPath: true,
    },
  })
