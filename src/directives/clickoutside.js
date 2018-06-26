import { on, off } from '@/utils/dom'

const context = '@@clickoutsideContext'
const nodeList = []
var id = 0
var listen = false

const clickHandler = e =>
	nodeList.forEach(node => {
		node[context].handler()
	})

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

		!listen && on(document, 'click', clickHandler)

		listen = true
	},
	unbind: function(el) {
		for (let i = 0, len = nodeList.length; i < len; i++) {
			if (nodeList[i][context].id === el[context].id) {
				nodeList.splice(i, 1)
				break
			}
		}

		nodeList.length === 0 && off(document, 'click', clickHandler)
	}
}
