import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

// import 'windi.css'
import { defSortImportAll, importAll } from '@/utils/dev';

import App from './App.vue';
import eventBus from './eventBus';
import './styles/reset.css';

const instanceOption = {};
const plugins = importAll(require.context('@/plugins/', false, /\.(ts|js)$/), defSortImportAll);
console.info('main plugins', plugins);
plugins.forEach((m) => {
  const option = m.default || m;
  if (option.vueInstanceOption) {
    Object.keys(option.vueInstanceOption).forEach((key) => {
      if (key === 'mixin') {
        if (!instanceOption['mixins']) instanceOption['mixins'] = [];
        instanceOption['mixins'].push(option.vueInstanceOption[key]);
      } else {
        instanceOption[key] = option.vueInstanceOption[key];
      }
    });
  }
});

console.info('instanceOption', instanceOption);
Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.use(eventBus);

// 添加原型对象
Vue.prototype.$myObject = {
  message: 'Hello from prototype!',
};

/* eslint-disable no-new */
new Vue({
  ...instanceOption,
  components: { App },
  render: (h) => h(App),
}).$mount('#app');
