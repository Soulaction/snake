import React from 'react'
import { Flex } from 'antd'
import { GameCanvas } from '@/features/GameCanvas/ui/GameCanvas'
import { GameInfo } from '@/features/GameInfo/ui'

export const Game = () => {
  return (
    <Flex>
      <GameCanvas />
      <GameInfo scope={0} />
    </Flex>
  )
}
