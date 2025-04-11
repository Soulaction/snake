import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import './index.css'
import { ErrorBoundary } from '@/shared/lib/ErrorBoudary'
import { AppRouter } from '@/app/providers/AppRouter'

const startServiceWorker = () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .catch((error: string) => {
          console.error('ServiceWorker registration failed: ', error)
        })
    })
  }
}

startServiceWorker()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </Provider>
)
