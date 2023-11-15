import { createApp } from 'vue';
import App from './app.vue';
import {initI18n, site} from '@/site';
import 'tailwindcss/tailwind.css';

console.log('站点配置', site)
async function bootstrap () {
  const app = createApp(App);
  app.config.performance = true;
  app.use(initI18n());
  app.mount('#language');
}

bootstrap();