import type { App } from 'vue'
import router from '@/router'
import pinia from './pinia'
import './unocss'

export default function install(app: App) {
  app.use(pinia)
  app.use(router)
}
