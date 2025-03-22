import { useState } from 'react'

enum FullScreenText {
  on = 'Полноэкранный режим',
  off = 'Выйти из полноэкранного режима',
}

interface IDocumentFullscreen extends Document {
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
  msExitFullscreen?: () => void
  mozCancelFullScreen?: () => void
  webkitExitFullscreen?: () => void
}

interface IElementFullscreen extends HTMLElement {
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  webkitRequestFullscreen?: () => void
}

const turnOn = (element: IElementFullscreen) => {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  }
}

const turnOff = (doc: IDocumentFullscreen) => {
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen()
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen()
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen()
  }
}

const isOn = (): boolean => {
  const doc = document as IDocumentFullscreen
  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  )
}

export const useToggleFullscreen = (): [string, () => void] => {
  const [textContent, setTextContent] = useState<FullScreenText>(
    FullScreenText.on
  )
  const toggle = () => {
    const toggleOn = isOn()

    if (toggleOn) {
      turnOff(document)
      setTextContent(FullScreenText.on)
    } else {
      turnOn(document.documentElement)
      setTextContent(FullScreenText.off)
    }
  }

  return [textContent, toggle]
}
