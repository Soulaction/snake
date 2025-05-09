import { EndGame, Game, StartGame } from '@/widgets'
import type { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { StatusGame } from '@/widgets/Game/model/types'
import { setStatusGame } from '@/widgets/Game/model/gemeSlice'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import { useInitStatePage } from '@/shared/hooks/useInitStatePage'

export const GamePage: FC = () => {
  useInitStatePage({ initPage: initGamePage })
  const { statusGame, score } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  const startNewGame = () => {
    dispatch(setStatusGame(StatusGame.Start))
  }

  const playGame = () => {
    dispatch(setStatusGame(StatusGame.Process))
  }

  return (
    <ErrorBoundary>
      {statusGame === StatusGame.Start && <StartGame playGame={playGame} />}
      {[StatusGame.Process, StatusGame.Pause].includes(statusGame) && <Game />}
      {statusGame === StatusGame.End && (
        <EndGame score={score} startNewGame={startNewGame} />
      )}
    </ErrorBoundary>
  )
}

export const initGamePage = () => Promise.resolve()
