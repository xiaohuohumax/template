import { createPinia } from 'pinia'
import { createApp } from 'vue'
import appConfig from './app.config'
import App from './app.vue'
import i18n from './i18n'
import router from './router'
import logger from './util/logger'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import './style/index.css'

async function main() {
  logger.info('Starting app...')
  logger.debug('App config:', appConfig)
  const app = createApp(App)
  app.use(i18n)
  app.use(router)
  app.use(createPinia())
  app.mount('#app')
}

main().catch(logger.error)
