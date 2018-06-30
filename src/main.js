// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole() // 初始化

import imgLoad from './directives/img-load'
import keyboard from './directives/keyboard'
import clickoutside from './directives/clickoutside'
import iosBounce from './directives/ios-bounce'
import './styles/reset.css'

Vue.use(imgLoad)
Vue.use(keyboard)
Vue.use(clickoutside)
Vue.use(iosBounce)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
