import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import appConfig from '@/appConfig'
import axios from 'axios'

const service = axios.create(appConfig.axios.create)

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

interface CustomAxiosInstance extends AxiosInstance {
  <R = any, D = any>(config: AxiosRequestConfig<D>): Promise<R>
  <R = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
}

export default service as CustomAxiosInstance
