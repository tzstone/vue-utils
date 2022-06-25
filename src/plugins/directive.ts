// 自定义全局指令
import Vue from 'vue'
import { importAll } from '@/utils'

const modules = importAll(require.context('@/directives/', false, /\.(ts|js)$/))
modules.forEach(m => {
  Vue.use(m.default)
})
