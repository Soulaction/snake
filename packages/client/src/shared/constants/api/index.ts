const isDev = process.env.NODE_ENV === 'dev'
console.log('++++++++++++++++++++++++++++')
console.log(import.meta.env)
export const apiYandex = `${
  isDev
    ? import.meta.env.VITE_INTERNAL_SSR_SERVER_URL
    : import.meta.env.VITE_INTERNAL_SERVER_URL
}/api/v2`
export const apiSnakeServer = `${
  isDev
    ? import.meta.env.VITE_INTERNAL_SNAKE_SERVER_URL
    : import.meta.env.VITE_INTERNAL_SERVER_URL
}/snake-api/v2`
export const resourcesYandex = apiYandex + '/resources'
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
