export interface AppConfig {
  appName: string
  axios: {
    baseURL: string
    timeout: number
  }
}

const appConfig: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME || '',
  axios: {
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 5000,
  },
}

export default appConfig
