import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import imgLoad from '@/examples/imgLoad'
import keyboard from '@/examples/keyboard'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/imgLoad',
			name: 'imgLoad',
			component: imgLoad
		},
		{
			path: '/keyboard',
			name: 'keyboard',
			component: keyboard
		}
	]
})
