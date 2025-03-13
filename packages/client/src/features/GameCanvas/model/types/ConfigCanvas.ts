import { SizeCanvas } from '@/features/GameCanvas/model/types'

export type ConfigCanvas = {
  center: { x: number; y: number }
  ctx: CanvasRenderingContext2D | null
  sizeCanvas: SizeCanvas
}
