import { createApp } from 'vue';
import App from './app.vue';
import {initI18n} from '@/site';
import 'tailwindcss/tailwind.css';
import { router } from './router';

async function bootstrap () {
  const app = createApp(App);
  app.config.performance = true;
  app.use(initI18n()).use(router);
  app.config.errorHandler = (err: unknown) => {
    /* 处理错误 */
    console.log(err);
  };
  app.mount('#app');
}

bootstrap();