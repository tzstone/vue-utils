import store from '@/store'

export default {
  install(Vue) {
    Vue.directive('permission', {
      // bind回调中取到的Dep.target为使用当前自定义指令的vm(渲染watcher)
      // inserted回调中取到的Dep.target则为使用当前自定义指令的vm的父节点
      bind: (el, binding) => {
        // 触发store的get, 将当前使用自定义指令的vm作为依赖收集(Dep.target)
        // expression: "function () { vm._update(vm._render(), hydrating);}"
        var a = store.state.permission.hasPermission
        console.log(a)
      },
      update: (el, binding) => {
        // store更新 -> 触发dep.notify() -> watcher.get() -> updateDirectives -> 自定义指令update回调
        const { show } = binding.modifiers
        if (show) {
          if (store.state.permission.hasPermission) {
            el.style.display = 'block'
          } else {
            el.style.display = 'none'
          }
        }
      }
      // 另一种方式
      // inserted: function(el, binding) {
      //   new Vue({
      //     computed: {
      //       // 该vm没有parent.$store, 所以store不会注入到该vm的$store
      //       hasPermission: () => store.state.permission.hasPermission
      //     },
      //     watch: {
      //       hasPermission: function(hasPermission) {
      //         if (hasPermission) {
      //           el.style.display = 'block'
      //         } else {
      //           el.style.display = 'none'
      //         }
      //       }
      //     }
      //   })
      // }
    })
  }
}
