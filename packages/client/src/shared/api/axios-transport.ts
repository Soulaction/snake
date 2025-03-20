import axios from 'axios'
import { apiYandex } from '../constants/api'

const TIMEOUT = 5000

export const getAxiosInstance = (path: string) => {
  const controller = new AbortController()
  const axiosInstance = axios.create({
    baseURL: `${apiYandex}${path}`,
    timeout: TIMEOUT,
    withCredentials: true,
    signal: controller.signal,
  })

  return {
    axios: axiosInstance,
    cancelRequest: controller.abort,
  }
}
