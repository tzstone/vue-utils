export function attr(el, prop, value) {
	if (prop && value) el.setAttribute(prop, value)
	else return el.getAttribute(prop)
}
