var supportsPassive = false
try {
	var opts = {}
	Object.defineProperty(opts, 'passive', {
		get: function get() {
			/* istanbul ignore next */
			supportsPassive = true
		}
	}) // https://github.com/facebook/flow/issues/285
	window.addEventListener('test-passive', null, opts)
} catch (e) {}

export function attr(el, prop, value) {
	if (prop && value) el.setAttribute(prop, value)
	else return el.getAttribute(prop)
}

export const on = (function() {
	if (document.addEventListener) {
		// passive=true, 事件处理程序不会调用preventDefault
		return function(el, event, handler, passive = true, capture = false) {
			el.addEventListener(
				event,
				handler,
				supportsPassive ? { capture: capture, passive: passive } : capture
			)
		}
	} else {
		return function(el, event, handler) {
			el.attachEvent('on' + event, handler)
		}
	}
})()

export const off = (function() {
	if (document.addEventListener) {
		return function(el, event, handler, capture = false) {
			el.removeEventListener(event, handler, capture)
		}
	} else {
		return function(el, event, handler) {
			el.detachEvent('on' + event, handler)
		}
	}
})()

export function getScrollTop(ele) {
	return ele == document.body
		? typeof window.pageYOffset === 'number'
			? window.pageYOffset
			: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
		: ele.scrollTop
}

export function getScrollLeft(ele) {
	return ele == document.body
		? typeof window.pageXOffset === 'number'
			? window.pageXOffset
			: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
		: ele.scrollLeft
}

export function getScrollHeight(ele) {
	return ele == document.body
		? Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
		  )
		: ele.scrollHeight
}

export function getClientHeight(ele) {
	return ele == document.body
		? document.compatMode == 'CSS1Compat' // 文档处于"标准模式"或"准标准模式"
			? document.documentElement.clientHeight
			: document.body.clientHeight
		: ele.clientHeight
}
