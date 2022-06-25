/**
 * 小数位格式化
 * @param {String|Number} value 数值
 * @param {Number} fixed 小数点保留位数
 * @returns 格式化的数值
 */
export function toFixed(value, fixed) {
  return Number(value).toFixed(fixed || 2)
}

/**
 * 距离格式化
 * @param {String|Number} num 距离
 * @returns 格式化的距离
 */
export function distanceFormat(num) {
  if (isNaN(Number(num))) {
    num = 0
  }
  num = num * 10
  if (num < 10) {
    return (Math.round(num * 1000) / 10).toFixed(1) + 'm'
  } else {
    return (Math.round(num) / 10).toFixed(1) + 'km'
  }
}

/**
 * 时间格式化
 * @param {Date|String|Number} date 日期
 * @param {String} format 格式化模板
 * @returns 格式化的字符串
 */
export function formatTime(date, format = 'y-M-d h:m:s') {
  if (!date) return

  date = new Date(date)
  const obj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    w: date.getDay()
  }

  return format.replace(/\w/g, key => {
    const value = obj[key]
    if (key === 'w') return ['日', '一', '二', '三', '四', '五', '六'][value]
    if (value < 10) return `0${value}`
    return value
  })
}
