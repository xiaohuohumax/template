import { createApp } from 'vue';
import plugins from './plugins';
import './style/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(plugins);

app.mount('#app');