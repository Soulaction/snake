import { Component, ReactNode, ErrorInfo } from 'react'
import style from './ErrorBoundary.module.css'

interface IErrorBoundaryProps {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  { children?: ReactNode },
  IErrorBoundaryProps
> {
  constructor(props: Readonly<{ children?: ReactNode }>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): IErrorBoundaryProps {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={style.errorInfo}>
          <h1 className={style.errorInfoText}>
            Технические неполадки, над проблемой уже работаем
          </h1>
        </div>
      )
    }
    return this.props.children
  }
}
