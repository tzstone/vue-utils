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

router.beforeEach((to, from, next) => {
  next();
});

// window['router'] = router;

export default router;

export function goBack() {
  const href = location.href;
  router.go(-1);
  // 执行了go(-1), 延迟时间内还没进入beforeEach, 则认为没有可返回的上一级路由.
  // 针对代码打开新tab的场景, 如果是手动输入地址, 则会返回空页面
  setTimeout(() => {
    if (href === location.href) {
      router.push('/icon');
    }
  }, 100);
}
