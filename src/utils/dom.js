export function attr(el, prop, value) {
	if (prop && value) el.setAttribute(prop, value)
	else return el.getAttribute(prop)
}

export const on = (function() {
	if (document.addEventListener) {
		return function(el, event, handler) {
			el.addEventListener(event, handler, false)
		}
	} else {
		return function(el, event, handler) {
			el.attachEvent('on' + event, handler)
		}
	}
})()

export const off = (function() {
	if (document.addEventListener) {
		return function(el, event, handler) {
			el.removeEventListener(event, handler, false)
		}
	} else {
		return function(el, event, handler) {
			el.detachEvent('on' + event, handler)
		}
	}
})()
