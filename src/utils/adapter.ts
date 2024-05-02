/**
 * 请求防抖
 * 请求合并
 * 限流
 * 缓存
 * real http
 */
import axios from 'axios'
import { createDefer } from './util'

type Adapter = (config, next?: () => Promise<any>) => Promise<any>

export function generateReqKey(config) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 请求防抖, 基于_requestId
const debounceAdapterEnhancer = (): Adapter => {
  const debounceMap = new Map()

  return async (config, next) => {
    const { _requestId, _cancelable } = config
    if (!_cancelable || !_requestId) return next()

    if (debounceMap.has(_requestId)) {
      const oldController = debounceMap.get(_requestId)
      oldController.abort()
      debounceMap.delete(_requestId)
    }

    const controller = new AbortController()
    debounceMap.set(_requestId, controller)
    config.signal = controller.signal

    try {
      const res = await next()
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    } finally {
      debounceMap.delete(_requestId)
      console.log('debounceMap', debounceMap)
    }
  }
}

// 请求合并
const mergeAdapterEnhancer = (): Adapter => {
  const mergeMap: {
    [url: string]: {
      keys: string[]
      promise: () => Promise<any>
      next: () => Promise<any>
    }
  } = {}
  const duration = 100

  const mergeReq = (config, next) => {
    const {
      _mergeKeys: [_reqKey],
      params,
      url
    } = config
    const keys = params[_reqKey].split(',')

    config['_rawReqKeys_'] = keys

    if (!mergeMap[url]) {
      const { promise, resolve } = createDefer()

      mergeMap[url] = {
        keys,
        promise,
        next // 缓存首次的next
      }

      setTimeout(() => {
        const { keys, next } = mergeMap[url]
        // 提前清理, 避免后续真正请求期间相同的url错误地进到mergeMap
        delete mergeMap[url]

        // 参数合并
        config.params[_reqKey] = keys.join(',')

        // 返回首次的next
        resolve({ nextPromise: next() })
      }, duration)
    } else {
      mergeMap[url].keys = Array.from(new Set([...mergeMap[url].keys, ...keys]))
    }

    return mergeMap[url].promise()
  }

  return async (config, next) => {
    const { _mergeable, _mergeKeys = [], method, params } = config
    const [_reqKey, _resKey] = _mergeKeys

    const validReqKey = () => {
      if (!_reqKey) return false
      if (method === 'get') return _reqKey in (params || {})
      return false
    }

    if (!_mergeable || !validReqKey()) return next()

    try {
      const { nextPromise } = await mergeReq(config, next)
      const res = await nextPromise

      let resData
      try {
        resData = JSON.parse(res.data)
      } catch (e) {
        return Promise.resolve(res)
      }

      let chunk
      // 异常情况保留原始值
      if (!Array.isArray(resData.data)) {
        chunk = resData.data
      } else {
        chunk = resData.data.filter(item => config['_rawReqKeys_'].includes(item[_resKey || _reqKey]))
      }

      return Promise.resolve({ ...res, data: JSON.stringify({ ...resData, data: chunk }) })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

// const cacheAdapterEnhancer = (): Adapter => {
//   return async (config, next) => {
//     //
//   }
// }

// 请求限流
const limitAdapterEnhancer = (): Adapter => {
  const maxLimit = 6 // 最大并发数
  const requestQueue = [] // 请求队列
  let currentConcurrent = 0 // 当前并发数

  const wait = () => {
    const i = createDefer()
    requestQueue.push(i.resolve)
    return i.promise()
  }

  const nextReq = () => {
    if (requestQueue.length <= 0) return
    const resolve = requestQueue.shift()
    resolve()
  }

  return async (config, next) => {
    // 超出最大并发数, 进入等待
    if (currentConcurrent >= maxLimit) {
      await wait()
    }

    try {
      currentConcurrent++
      // 需await next(), 方可进入finally减少当前并发数
      const res = await next()
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    } finally {
      currentConcurrent--
      nextReq()
    }
  }
}

const adapters = [debounceAdapterEnhancer(), mergeAdapterEnhancer(), limitAdapterEnhancer(), axios.defaults.adapter]

export function adapterHandler(config) {
  return dispatch(0)
  function dispatch(i) {
    const adapter = adapters[i]
    try {
      return adapter(config, dispatch.bind(null, i + 1))
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

const enhanceHttp = axios.create({
  baseURL: '',
  adapter: adapterHandler
})

// Add a request interceptor
enhanceHttp.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
enhanceHttp.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default enhanceHttp

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('before resolve')
//     resolve(1)
//     console.log('after resolve')
//   }, 100)
// })
// console.log('before then')
// p.then(res => {
//   console.log('then res', res)
// })
