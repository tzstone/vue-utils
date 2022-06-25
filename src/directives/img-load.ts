import loadingImg from '@/assets/loading.gif'

export default {
  install(Vue) {
    Vue.directive('img-load', function (el, binding) {
      if (!el.src) el.src = loadingImg

      if (!binding.value) return

      const img = new Image()

      img.onload = function () {
        el.src = img.src
      }

      img.onerror = function (e) {
        console.log('img error', e)
      }

      img.src = binding.value
    })
  }
}
