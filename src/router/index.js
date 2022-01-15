import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import imgLoad from '@/examples/imgLoad'
import keyboard from '@/examples/keyboard'
import clickoutside from '@/examples/clickoutside'
import iosBounce from '@/examples/iosBounce'
import sticky from '@/examples/sticky'
import windiCss from '@/examples/windiCss'
import form from '@/examples/form'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/imgLoad',
      name: 'imgLoad',
      component: imgLoad
    },
    {
      path: '/keyboard',
      name: 'keyboard',
      component: keyboard
    },
    {
      path: '/clickoutside',
      name: 'clickoutside',
      component: clickoutside
    },
    {
      path: '/iosBounce',
      name: 'iosBounce',
      component: iosBounce
    },
    {
      path: '/sticky',
      name: 'sticky',
      component: sticky
    },
    {
      path: '/windiCss',
      name: 'windiCss',
      component: windiCss
    },
    {
      path: '/form',
      name: 'form',
      component: form
    }
  ]
})
