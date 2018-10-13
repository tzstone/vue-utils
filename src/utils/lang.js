// https://github.com/jonschlinkert/is-number
export function isNumber(num) {
	if (typeof num === 'number') {
		return num - num === 0 // if num is Infinity
	}

	if (typeof num === 'string' && num.trim() !== '') {
		// isFinite: 如果参数是非数字, 则会先转换为数字; Number.isFinite则不会转换
		return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
	}

	return false
}
