import { GM_log } from '$'

async function start() {
  GM_log(import.meta.env.VITE_APP_TITLE)
}

if (window === top) {
  start().catch(GM_log)
}
