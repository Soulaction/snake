import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const HOST = 'https://ya-praktikum.tech/api/v2'
const TIMEOUT = 5000

interface IOptions {
  headers?: Record<string, string>
}

type Request = (
  url: string,
  data?: Record<string, string>,
  options?: IOptions
) => Promise<XMLHttpRequest>

export class AxiosTransport {
  public axiosInstance: AxiosInstance
  public controller: AbortController

  constructor(path: string) {
    this.controller = new AbortController();

    this.axiosInstance = axios.create({
      baseURL: `${HOST}${path}`,
      timeout: TIMEOUT,
      withCredentials: true,
      signal: this.controller.signal
    })
  }

  public cancelRequest = () => {
    this.controller.abort()
  }

  public get: Request = (url, _, options) => {
    return this.axiosInstance.get(url, { ...options })
  }

  public put: Request = (url, data, options) => {
    return this.axiosInstance.put(url, { ...data }, { ...options })
  }

  public post: Request = (url, data, options) => {
    return this.axiosInstance.post(url, { ...data }, { ...options })
  }

  public delete: Request = (url, _, options) => {
    return this.axiosInstance.delete(url, { ...options })
  }
}
