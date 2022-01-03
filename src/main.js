import Vue from 'vue'
import App from './App'
import { importAll, defSortImportAll } from '@/utils'
import './styles/reset.css'
import 'windi.css'

const instanceOption = {}
const plugins = importAll(require.context('./plugins/', false, /\.js$/), defSortImportAll)

plugins.forEach(m => {
  const option = m.default || m
  if (option.vueInstanceOption) {
    Object.keys(option.vueInstanceOption).forEach(key => {
      if (key === 'mixin') {
        if (!instanceOption['mixins']) instanceOption['mixins'] = []
        instanceOption['mixins'].push(option.vueInstanceOption[key])
      } else {
        instanceOption[key] = option.vueInstanceOption[key]
      }
    })
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  ...instanceOption,
  components: { App },
  render: h => h(App)
}).$mount('#app')
