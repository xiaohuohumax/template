import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'
import './style/index.css'

const app = createApp(App)

app.use(plugins)

app.mount('#app')
