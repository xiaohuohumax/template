import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

if (window === top) {
  createApp(App).mount(
    (() => {
      const app = document.createElement('div')
      document.body.append(app)
      return app
    })(),
  )
}
