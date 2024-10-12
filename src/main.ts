import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

// import 'windi.css'
import App from './App.vue';
import eventBus from './eventBus';
import './styles/reset.css';
import { getVueOptions } from './utils/vue';

const instanceOption = getVueOptions();

console.info('instanceOption', instanceOption);
Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.use(eventBus);
/* eslint-disable no-new */
new Vue({
  ...instanceOption,
  components: { App },
  render: (h) => h(App),
}).$mount('#app');
