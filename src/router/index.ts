import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

// import routes from './config';

// eslint-disable-next-line no-debugger
const routes = [];
const files = require.context('@/examples', false, /\.vue$/);
files.keys().forEach((key) => {
  const name = key.match(/\/(\w+)\.vue/)[1];
  routes.push({
    path: name === 'home' ? '/' : `/${name}`,
    name: name,
    component: files(key).default || files(key),
    meta: {
      keepAlive: ['page1', 'page2', 'page3'].includes(name),
    },
  });
});
console.log('routes', routes);
Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: routes,
  scrollBehavior: function (to, from, savedPosition) {
    console.log('savedPosition', savedPosition);
    if (savedPosition || savedPosition === undefined) {
      // 后退删除上一页缓存
      if (from.meta.keepAlive) store.commit('deleteCachePageName', from.name);
    } else {
      // 前进添加下一页缓存
      if (to.meta.keepAlive) store.commit('addCachePageName', to.name);
    }

    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// window['router'] = router;

export default router;
