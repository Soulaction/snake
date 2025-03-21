import { RouterPaths } from '@/shared/router'

export interface NavbarItemType {
  path: string
  title: string
}

export const NavbarItemsList: NavbarItemType[] = [
  {
    path: RouterPaths.main,
    title: 'Главная',
  },
  {
    path: RouterPaths.game,
    title: 'Играть',
  },
  {
    path: RouterPaths.leaderboard,
    title: 'Лидеры',
  },
  {
    path: RouterPaths.forum,
    title: 'Форум',
  },
]
