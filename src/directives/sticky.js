import { on, off } from '@/utils/dom'

let isSupportSticky = false
let placeholder
let listenAction

export default {
  inserted: function(el, binding) {
    const elStyle = el.style
    const params = binding.value || {}
    const stickyTop = params.stickyTop || 0
    const zIndex = params.zIndex || 1000

    elStyle.position = '-webkit-sticky'
    elStyle.position = 'sticky'

    // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
    if (~elStyle.position.indexOf('sticky')) {
      isSupportSticky = true
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex
      return
    }

    const elHeight = el.getBoundingClientRect().height
    const elWeight = el.getBoundingClientRect().width

    elStyle.top = `${stickyTop}px`
    elStyle.zIndex = zIndex

    const parentEl = el.parentNode || document.documentElement
    placeholder = document.createElement('div')
    placeholder.style.display = 'none'
    placeholder.style.width = `${elWeight}px`
    placeholder.style.height = `${elHeight + stickyTop}px`
    parentEl.insertBefore(placeholder, el)

    let active = false

    const sticky = () => {
      if (active) return

      elStyle.position = 'fixed'
      elStyle.height = `${el.offsetHeight}px`
      elStyle.width = `${elWeight}px`
      placeholder.style.display = 'inline-block'
      active = true
    }

    const reset = () => {
      if (!active) return

      elStyle.position = ''
      elStyle.width = 'auto'
      placeholder.style.display = 'none'
      active = false
    }

    const check = () => {
      const offsetTop = el.getBoundingClientRect().top
      if (offsetTop < stickyTop) {
        sticky()
        return
      }
      reset()
    }

    listenAction = () => {
      if (!window.requestAnimationFrame) {
        setTimeout(check, 16)
        return
      }

      window.requestAnimationFrame(check)
    }

    on(window, 'scroll', listenAction)
  },
  update: function(el, binding) {
    const params = binding.value || {}
    const oldParams = binding.oldValue || {}

    if (
      params.stickyTop === oldParams.stickyTop &&
			params.zIndex === oldParams.zIndex
    ) { return }

    const stickyTop = params.stickyTop || 0
    const zIndex = params.zIndex || 1000
    const elHeight = el.getBoundingClientRect().height

    if (isSupportSticky) {
      el.style.top = `${stickyTop}px`
      el.style.zIndex = zIndex
      return
    }

    el.style.top = `${stickyTop}px`
    el.style.zIndex = zIndex
    placeholder.style.height = `${elHeight + stickyTop}px`
  },
  unbind: function(el, binding) {
    off(window, 'scroll', listenAction)
  },
  install(Vue) {
    Vue.directive('sticky', {
      inserted: this.inserted,
      update: this.update,
      unbind: this.unbind
    })
  }
}
