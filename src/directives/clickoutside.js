import { on, off } from '@/utils/dom'

const context = '@@clickoutsideContext'
const nodeList = []
var id = 0
var isBinding = false

const clickHandler = e => {
  console.log('clickHandler', nodeList, e)
  nodeList.forEach(node => {
    node[context].handler(e)
  })
}

export default {
  bind: function(el, binding) {
    const handler = function(e) {
      if (!el.contains(e.target)) {
        el[context].callback()
      }
    }

    el[context] = {
      id: id++,
      callback: binding.value,
      handler
    }

    nodeList.push(el)

    if (!isBinding) {
      on(document, 'click', clickHandler)
      isBinding = true
    }
  },
  unbind: function(el) {
    for (let i = 0, len = nodeList.length; i < len; i++) {
      if (nodeList[i][context].id === el[context].id) {
        nodeList.splice(i, 1)
        break
      }
    }

    if (nodeList.length === 0) {
      off(document, 'click', clickHandler)
      isBinding = false
    }
  },
  install: function(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}
