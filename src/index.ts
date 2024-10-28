import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const root = document.createElement('div')
root.id = 'app'
document.body.appendChild(root)
createApp(App).mount(root)
