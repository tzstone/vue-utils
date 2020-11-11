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

const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

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

export const once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export function addClass (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

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
