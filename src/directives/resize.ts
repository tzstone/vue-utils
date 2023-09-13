export default {
  bind: function (el: HTMLElement, binding) {
    const resizeEl = document.createElement('div')
    resizeEl.style.cssText =
      'width:6px;height:6px;position:absolute;right:0;bottom:0;z-index:999;cursor:move;background:red;'

    resizeEl.onmousedown = (e: MouseEvent) => {
      // 记录点击位置
      const { pageX: startX, pageY: startY } = e
      const { width, height } = el.getBoundingClientRect()

      document.onmousemove = (ev: MouseEvent) => {
        const { pageX: endX, pageY: endY } = ev
        el.style.width = width + endX - startX + 'px'
        el.style.height = height + endY - startY + 'px'
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    el.appendChild(resizeEl)
  },
  unbind: function (el) {
    console.log(el)
  },
  install: function (Vue) {
    Vue.directive('resize', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}
