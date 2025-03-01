import { Routes, Route } from 'react-router-dom'
import { router } from '@/shared/router'

export const AppRouter = () => (
  <Routes>
    {Object.values(router).map(route => (
      <Route key={route.path} {...route} />
    ))}
  </Routes>
)
