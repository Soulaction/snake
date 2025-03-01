export interface NavbarItemType {
  path: string
  title: string
}

export const NavbarItemsList: NavbarItemType[] = [
  {
    path: '/',
    title: 'Главная',
  },
  {
    path: '/game',
    title: 'Играть',
  },
  {
    path: '/leaderboard',
    title: 'Лидеры',
  },
  {
    path: '/forum',
    title: 'Форум',
  },
]
