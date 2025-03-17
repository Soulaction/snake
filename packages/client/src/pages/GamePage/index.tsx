import { StartGame, Game, EndGame } from '@/widgets'
import type { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { StatusGame } from '@/widgets/Game/model/types'
import { setStatusGame } from '@/widgets/Game/model/gemeSlice'

export const GamePage: FC = () => {
  const { statusGame, score } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  const startNewGame = () => {
    dispatch(setStatusGame(StatusGame.Start))
  }

  const playGame = () => {
    dispatch(setStatusGame(StatusGame.Process))
  }

  return (
    <>
      {statusGame === StatusGame.Start && <StartGame playGame={startGame} />}
      {[StatusGame.Process, StatusGame.Pause].includes(statusGame) && <Game />}
      {statusGame === StatusGame.End && (
        <EndGame score={score} rating={14} startNewGame={startNewGame} />
      )}
    </>
  )
}
