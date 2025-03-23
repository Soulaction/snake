export type AppRoutesKeys = keyof typeof AppRoutes
export type AppRoutesValues = typeof AppRoutes[AppRoutesKeys]

export const AppRoutes = {
  MAIN: 'main',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  PASSWORD: 'edit-password',
  PROFILE: 'profile',
  LEADERBOARD: 'leaderboard',
  GAME: 'game',
  FORUM: 'forum',
  TOPIC: 'topic',
  NOTFOUND: 'not-found',
  ERROR: 'error',
}

export const RouterPaths: Record<AppRoutesValues, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/sign-in',
  [AppRoutes.REGISTRATION]: '/sign-up',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.PASSWORD]: '/edit-password',
  [AppRoutes.GAME]: '/game',
  [AppRoutes.LEADERBOARD]: '/leaderboard',
  [AppRoutes.FORUM]: '/forum',
  [AppRoutes.NOTFOUND]: '*',
  [AppRoutes.TOPIC]: '/topic/:topicId',
  [AppRoutes.ERROR]: '/error',
}
