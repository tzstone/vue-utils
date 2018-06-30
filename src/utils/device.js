export const isIOS = (function() {
	return /(iPad|iPhone|iPod)/i.test(navigator.userAgent)
})()
