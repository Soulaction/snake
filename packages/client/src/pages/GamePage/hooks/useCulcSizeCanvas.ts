import { RefObject, useCallback, useEffect, useState } from 'react'

export type ConfigCanvas = {
  center: { x: number; y: number }
  ctx: CanvasRenderingContext2D | null
  sizeCanvas: SizeCanvas
}

export type SizeCanvas = {
  width: number
  height: number
  countCellWidth: number
  countCellHeight: number
}

export const useConfigurateCanvas = <T extends HTMLCanvasElement | null>(
  canvasRef: RefObject<T>,
  sizeCell = 10
): ConfigCanvas => {
  const [configCanvas, setConfigCanvas] = useState<ConfigCanvas>({
    center: { x: 0, y: 0 },
    ctx: null,
    sizeCanvas: { width: 0, height: 0, countCellWidth: 0, countCellHeight: 0 },
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const abortController = new AbortController()
    if (canvas) {
      const resizeFunc = () => {
        getConfigCanvas(canvas)
      }
      resizeFunc()

      window.addEventListener('resize', resizeFunc, {
        signal: abortController.signal,
      })
    }
    return () => {
      abortController.abort()
    }
  }, [])

  const getConfigCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const parentHTMLElement = canvas.parentElement
      if (!parentHTMLElement) {
        return
      }
      let { clientWidth: widthParent, clientHeight: heightParent } =
        parentHTMLElement
      const { paddingTop, paddingBottom, paddingLeft, paddingRight } =
        getComputedStyle(parentHTMLElement)

      // делаем не больше определённого размера (уравниваем условия с широкоформатными мониторы)
      if (widthParent > 1000) {
        widthParent = 1000
      }
      if (heightParent > 900) {
        heightParent = 900
      }
      // делаем размер равным точному кол-ву ячеек, без обрывов (шахматное поле)
      const countCellWidth = Math.floor(
        (widthParent - parseInt(paddingLeft) - parseInt(paddingRight)) /
          sizeCell
      )
      const countCellHeight = Math.floor(
        (heightParent - parseInt(paddingTop) - parseInt(paddingBottom)) /
          sizeCell
      )

      canvas.width = countCellWidth * sizeCell
      canvas.height = countCellHeight * sizeCell

      const positionCenterX = (Math.floor(countCellWidth / 2) - 1) * sizeCell
      const positionCenterY = (Math.floor(countCellHeight / 2) - 1) * sizeCell

      setConfigCanvas({
        center: {
          x: positionCenterX,
          y: positionCenterY,
        },
        sizeCanvas: {
          width: canvas.width,
          height: canvas.height,
          countCellWidth,
          countCellHeight,
        },
        ctx: canvas.getContext('2d'),
      })
    },
    [sizeCell]
  )

  return configCanvas
}
