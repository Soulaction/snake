import ReactDOM from 'react-dom/server'
import App from '@/app/App'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import './index.css'

// export const render = () => ReactDOM.renderToString(<App />)

export const render = async () => {
  return {
    html: ReactDOM.renderToString(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
  }
}
