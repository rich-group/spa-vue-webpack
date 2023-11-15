import { createRouter, createWebHistory } from 'vue-router';
import Language from './views/Language.vue';
import Page1 from './views/Page1.vue';


export const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    components: {
      default: Language
    }
  }, {
    path: '/page1',
    components: {
      default: Page1
    }
  }]
});