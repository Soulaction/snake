import { EndGame, Game } from '@/widgets'
import type { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { StatusGame } from '@/widgets/Game/model/types'
import { setStatusGame } from '@/widgets/Game/model/gemeSlice'

export const GamePage: FC = () => {
  const { statusGame, score } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  const startNewGame = () => {
    // @TODO с появлением экрана начала поправить на StatusGame.Start
    dispatch(setStatusGame(StatusGame.Process))
  }

  return (
    <>
      {statusGame !== StatusGame.End && <Game />}
      {statusGame === StatusGame.End && (
        <EndGame score={score} rating={14} startNewGame={startNewGame} />
      )}
    </>
  )
}
