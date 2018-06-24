export default {
  install(Vue) {
    Vue.directive('imgLoader', function (el, binding) {
      if (!binding.value) return

      let img = new Image()

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