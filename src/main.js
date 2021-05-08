import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// vconsole
import VConsole from 'vconsole/dist/vconsole.min.js' // import vconsole
new VConsole() // 初始化

// css
import './styles/reset.css'

// directives
import imgLoad from './directives/img-load'
import keyboard from './directives/keyboard'
import clickoutside from './directives/clickoutside'
import iosBounce from './directives/ios-bounce'
import sticky from './directives/sticky'

Vue.use(imgLoad)
Vue.use(keyboard)
Vue.use(clickoutside)
Vue.use(iosBounce)
Vue.use(sticky)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
