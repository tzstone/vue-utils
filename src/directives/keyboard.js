import { attr } from '@/utils/dom'

export default {
	install(Vue) {
		Vue.directive('keyboard', {
			bind: function(el, binding) {
				switch (binding.value) {
					case 'number':
						attr(el, 'type', 'number')
						attr(el, 'pattern', '[0-9]*')
						break
					case 'phone':
						attr(el, 'type', 'tel')
						break
					case 'decimal':
						attr(el, 'type', 'number')
						break
					default:
						attr(el, 'type', 'text')
				}
			}
		})
	}
}
