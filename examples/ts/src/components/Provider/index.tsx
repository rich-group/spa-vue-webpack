import { defineComponent, inject } from 'vue';
import Provider from './Provider.vue';
export {
  Provider
};

export function withProps (App) {
  return defineComponent({
    render () {
      const store: any = inject('store');
      return (
        <App {...store}>hello world</App>
      );
    }
  });
}