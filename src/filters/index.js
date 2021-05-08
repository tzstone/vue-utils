export function toFixed(value, fixed) {
  return Number(value).toFixed(fixed || 2)
}

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
