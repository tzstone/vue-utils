// 全局组件
import Vue from 'vue'
import { importAll } from '@/utils'

const components = importAll(require.context('@/components/global/', true, /index\.vue$/))
components.forEach(({ default: component }) => {
  Vue.component(component.name, component)
})
