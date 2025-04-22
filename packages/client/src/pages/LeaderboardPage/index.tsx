import { FC } from 'react'
import { useInitStatePage } from '@/shared/hooks/useInitStatePage'

export const LeaderboardPage: FC = () => {
  useInitStatePage({ initPage: initLeaderboardPage })

  return <div>Leaderboard Page</div>
}

export const initLeaderboardPage = () => Promise.resolve()
