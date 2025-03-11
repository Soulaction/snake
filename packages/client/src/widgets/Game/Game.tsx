import React from 'react'
import { Col, Row } from 'antd'
import { GameCanvas } from '@/features/GameCanvas/ui/GameCanvas'
import { GameInfo } from '@/features/GameInfo/ui/GameInfo'
import s from './Game.module.css'

export const Game = () => {
  return (
    <Row className={s.game} gutter={[30, 0]} wrap={false}>
      <Col flex={5}>
        <GameCanvas />
      </Col>
      <Col flex={2}>
        <GameInfo scope={0} />
      </Col>
    </Row>
  )
}
