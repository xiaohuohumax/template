import appConfig from '@/app.config'
import axios from 'axios'
import logger from './logger'

const request = axios.create({
  ...appConfig.axios,
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    logger.error('Request error', error)
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    logger.error('Response error', error)
    return Promise.reject(error)
  },
)

export default request
