import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

const path = require('path')
const routes = []
const files = require.context('@/examples', false, /\.vue$/)
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  routes.push({
    path: name === 'home' ? '/' : `/${name}`,
    name: name,
    component: files(key).default || files(key),
    meta: {
      keepAlive: ['page1', 'page2', 'page3'].includes(name)
    }
  })
})
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    console.log('savedPosition', savedPosition)
    if (savedPosition || savedPosition === undefined) {
      // 后退删除上一页缓存
      if (from.meta.keepAlive) store.commit('deleteCachePageName', from.name)
    } else {
      // 前进添加下一页缓存
      if (to.meta.keepAlive) store.commit('addCachePageName', to.name)
    }

    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

window['router'] = router

export default router
