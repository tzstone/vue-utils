import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

import { defSortImportAll, importAll } from '@/utils';

// import 'windi.css'
import App from './App.vue';
import eventBus from './eventBus';
import './styles/reset.css';

const instanceOption = {};
const plugins = importAll(require.context('./plugins/', false, /\.(ts|js)$/), defSortImportAll);

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

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.use(eventBus);
/* eslint-disable no-new */
new Vue({
  ...instanceOption,
  components: { App },
  render: (h) => h(App),
}).$mount('#app');
