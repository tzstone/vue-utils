import { on, off, getScrollTop, getScrollHeight, getClientHeight } from '@/utils/dom'
import { isIOS } from '@/utils/device'

const callback = {}
let id = 0
const nextId = function () {
  return 'ios-bounce-' + id++
}

const handler = function (el, modifiers) {
  let startY = 0
  let endY = 0
  const startTop = el.getBoundingClientRect().top
  let endTop = 0

  function start(e) {
    startY = e.touches[0].clientY
  }

  function move(e) {
    const body = document.body
    const bodyScrollTop = getScrollTop(body)
    const bodyScrollHeight = getScrollHeight(body)
    const bodyClientHeight = getClientHeight(body)

    endY = e.touches[0].clientY
    endTop = el.getBoundingClientRect().top

    const isOverDown = endY > startY && endTop >= startTop
    const isOverUp =
      endY < startY &&
      (el.scrollTop + el.clientHeight > el.scrollHeight || bodyScrollTop + bodyClientHeight >= bodyScrollHeight)

    // console.log(
    // 	'up:',
    // 	isOverUp,
    // 	';down:',
    // 	isOverDown,
    // 	';startTop:',
    // 	startTop,
    // 	';endTop:',
    // 	endTop,
    // 	';scrollTop:',
    // 	el.scrollTop,
    // 	';scrollHeight:',
    // 	el.scrollHeight,
    // 	';clientHeight:',
    // 	el.clientHeight
    // )

    if (
      (modifiers.up && isOverUp) || // 禁止上拉回弹
      (modifiers.down && isOverDown) || // 禁止下拉回弹
      (!modifiers.up && !modifiers.down && (isOverUp || isOverDown)) // 全部禁止
    ) {
      console.log('preventDefault', +new Date())
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return { start: start, move: move }
}

export default {
  bind: function (el, binding) {
    if (!isIOS) return

    const id = (el.dataset.bounceId = nextId())
    const { start, move } = handler(el, binding.modifiers)

    callback[id] = {
      start: start,
      move: move
    }

    on(el, 'touchstart', start)
    on(el, 'touchmove', move, false)
  },
  unbind: function (el) {
    if (!isIOS) return

    const id = el.dataset.bounceId
    const { start, move } = callback[id]

    off(el, 'touchstart', start)
    off(el, 'touchmove', move)

    delete callback[id]
  },
  install: function (Vue) {
    Vue.directive('ios-bounce', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}
