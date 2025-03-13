import {
  ConfigCanvas,
  GameItem,
  Snake,
} from '@/features/GameCanvas/model/types'
import {
  COLOR_APPLE,
  COLOR_SNAKE,
  SIZE_OBJECT,
} from '@/features/GameCanvas/model/gameConstant'

export const drawGame = (
  configCanvas: ConfigCanvas,
  snake: Snake,
  apple: GameItem
) => {
  const {
    ctx,
    sizeCanvas: { width, height },
  } = configCanvas
  if (ctx) {
    ctx.clearRect(0, 0, width, height)

    if (apple) {
      ctx.rect(apple.x, apple.y, SIZE_OBJECT, SIZE_OBJECT)
      drawGameItem(ctx, apple, SIZE_OBJECT, COLOR_APPLE)
    }
    snake.forEach(snakeItem => {
      drawGameItem(ctx, snakeItem, SIZE_OBJECT, COLOR_SNAKE)
    })
  }
}

const drawGameItem = (
  ctxCanvas: CanvasRenderingContext2D,
  gameItem: GameItem,
  sizeObject: number,
  color: string
) => {
  ctxCanvas.fillStyle = color
  ctxCanvas.beginPath()
  ctxCanvas.rect(gameItem.x, gameItem.y, sizeObject, sizeObject)
  ctxCanvas.fill()
}
