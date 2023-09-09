export function throttle(fn, delay = 300) {
  let timer
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

interface Defer<T = any> {
  resolve(value?: T | PromiseLike<T>): void
  reject(reason?: any): void
  promise(): Promise<T>
}

export function createDefer<T = any>(): Defer<T> {
  const r: any = {}
  const promise = new Promise<T>((resolve, reject) => {
    r.resolve = resolve
    r.reject = reject
  })

  r.promise = () => promise

  return r
}
