import { useEffect } from 'react'
import './App.css'
import { AppRouter } from '@/app/providers/AppRouter'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <AppRouter />
    </div>
  )
}

export default App
