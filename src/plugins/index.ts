import { App } from 'vue';
import './unocss';
import pinia from './pinia';
import router from '@/router';

export default function install(app: App) {
  app.use(pinia);
  app.use(router);
}