import { useState } from 'react'
import type { FC } from 'react'
import { Button } from 'antd'
import { EndGame, StartGame } from '@/widgets'
import { useNavigate } from 'react-router-dom'

export enum GameState {
  START = 'start',
  PLAY = 'play',
  END = 'end',
}

export const GamePage: FC = () => {
  const [step, setStep] = useState<GameState>(GameState.START)
  const navigate = useNavigate()

  const handleStartClick = () => {
    console.log('Start!')
  }

  const finishGame = () => {
    setStep(GameState.END)
  }

  const startNewGame = () => {
    setStep(GameState.START)
  }

  const playGame = () => {
    setStep(GameState.PLAY)
  }

  const gotoMainMenu = () => {
    navigate('/')
  }

  return (
    <>
      {step === GameState.START && (
        <StartGame onStartClick={handleStartClick} playGame={playGame} />
      )}
      {step === GameState.PLAY && (
        <>
          <h1>Game Page</h1>
          <Button type="primary" onClick={finishGame}>
            Game over
          </Button>
        </>
      )}
      {step === GameState.END && (
        <EndGame
          score={111}
          rating={14}
          startNewGame={startNewGame}
          gotoMainMenu={gotoMainMenu}
        />
      )}
    </>
  )
}
