import Vue from 'vue'
import Router from 'vue-router'
const path = require('path')
const routes = []
const files = require.context('@/examples', false, /\.vue$/)
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  routes.push({
    path: name === 'home' ? '/' : `/${name}`,
    name: name,
    component: files(key).default || files(key)
  })
})
Vue.use(Router)

export default new Router({
  routes
})
