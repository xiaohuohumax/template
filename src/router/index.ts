import type { RouterHistory } from 'vue-router'
import logger from '@/util/logger'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import routes from './routes'

function createHistory(base?: string): RouterHistory {
  const historyMap: { [key: string]: (base?: string) => RouterHistory } = {
    Memory: createMemoryHistory,
    WebHash: createWebHashHistory,
    Web: createWebHistory,
  }
  const historyType = import.meta.env.VITE_ROUTER_HISTORY || 'Web'
  return historyMap[historyType](base)
}

const router = createRouter({
  history: createHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.meta.scrollToTop) {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, _, next) => {
  logger.debug('Router:', to)
  document.title = to.meta.title || ''
  next()
})

export default router
