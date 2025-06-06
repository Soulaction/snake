import axios from 'axios'
import { apiSnakeServer, apiYandex } from '../constants/api'

const TIMEOUT = 5000

export const abortController = new AbortController()

export const axiosInstance = axios.create({
  baseURL: apiYandex,
  timeout: TIMEOUT,
  withCredentials: true,
  signal: abortController.signal,
})

export const axiosSnakeInstance = axios.create({
  baseURL: apiSnakeServer,
  timeout: TIMEOUT,
  withCredentials: true,
  signal: abortController.signal,
})

export const cancelRequest = abortController.abort
