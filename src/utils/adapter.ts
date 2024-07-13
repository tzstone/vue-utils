/**
 * 请求防抖
 * 请求合并
 * 限流
 * 缓存
 * real http
 */
import axios from 'axios'
import { createDefer } from './util'
import { isPlainObject } from 'lodash-es'

type Adapter = (config, next?: () => Promise<any>) => Promise<any>

const parseResponseData = response => {
  if (typeof response.data === 'string' && response.data.length) {
    return JSON.parse(response.data)
  }
  return response.data
}

// 请求防抖, 基于_requestId
const debounceAdapterEnhancer = (): Adapter => {
  const debounceMap = new Map()

  return async (config, next) => {
    const { _requestId, _cancelable } = config
    if (!_cancelable || !_requestId) return next()

    if (debounceMap.has(_requestId)) {
      const cacheController = debounceMap.get(_requestId)
      cacheController.abort()
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
      console.log('[adapter]delete debounce id', _requestId)
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
    // eslint-disable-next-line
    let [_reqKey, _resKey] = _mergeKeys
    if (!_resKey) _resKey = _reqKey

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
        resData = parseResponseData(res)
        // 业务码异常, 进入响应拦截处理
        if (resData.code != 200) {
          return Promise.resolve(res)
        }
      } catch (e) {
        return Promise.resolve(res)
      }

      let chunk
      // 异常情况保留原始值
      if (!Array.isArray(resData.data)) {
        chunk = resData.data
      } else {
        chunk = resData.data.filter(item => config['_rawReqKeys_'].includes(item[_resKey]))
      }

      return Promise.resolve({ ...res, data: { ...resData, data: chunk } })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

// 请求限流
const limitAdapterEnhancer = (): Adapter => {
  const concurrentLimit = 6 // 最大并发数
  const requestQueue = [] // 请求队列
  let concurrentCount = 0 // 当前并发数

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
    if (concurrentCount >= concurrentLimit) {
      await wait()
    }

    try {
      concurrentCount++
      // 需await next(), 方可进入finally减少当前并发数
      const res = await next()
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    } finally {
      concurrentCount--
      nextReq()
    }
  }
}

function generateReqKey(config) {
  const { method, url, params = {}, data = {} } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

class MemoryCache {
  constructor() {
    // 定时清理失效缓存
    setInterval(() => {
      this.flush()
    }, 5 * 60 * 1e3) // 5mins
  }
  data = {}
  set(key, value, maxAge) {
    console.log('[adapter]set cache key', key)
    // 保存数据
    this.data[key] = {
      maxAge: maxAge || 0,
      value,
      now: Date.now()
    }
  }
  get(key) {
    // 从缓存中获取指定 key 对应的值。
    const cachedItem = this.data[key]
    if (!cachedItem) return null
    const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge
    if (isExpired) {
      console.log('[adapter]expired key', key)
      this.delete(key)
    }
    return isExpired ? null : cachedItem.value
  }
  delete(key) {
    // 从缓存中删除指定 key 对应的值。
    console.log('[adapter]delete cache key', key)
    return delete this.data[key]
  }
  clear() {
    // 清空已缓存的数据。
    this.data = {}
  }
  flush() {
    Object.entries(this.data).forEach(([key, cachedItem]: [string, any]) => {
      const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge
      if (isExpired) {
        console.log('[adapter]flush expired key', key)
        this.delete(key)
      }
    })
  }
}

const cacheAdapterEnhancer = (): Adapter => {
  const cache = new MemoryCache()

  return async (config, next) => {
    const { _cache, _maxAge = 60 * 1e3, _forceUpdate, method } = config

    if (!_cache || !['get', 'post'].includes(method)) return next()

    const requestKey = generateReqKey(config)
    let res = cache.get(requestKey)

    if (!res || _forceUpdate) {
      try {
        res = next()

        // 缓存promise, 支持并发请求缓存
        cache.set(requestKey, res, _maxAge)

        // 需await res, 请求异常时方可进入catch删除缓存
        const response = await res

        try {
          const resData = parseResponseData(response)

          if (isPlainObject(resData)) {
            // 减少后续重复parse
            response.data = resData

            // 业务码异常
            if (resData.code != 200) {
              cache.delete(requestKey)
            }
          }
        } catch (e) {
          console.log(e)
          cache.delete(requestKey)
        }

        return response
      } catch (e) {
        cache.delete(requestKey)

        return Promise.reject(e)
      }
    }

    // 使用缓存
    return res
  }
}

const adapters = [
  debounceAdapterEnhancer(),
  mergeAdapterEnhancer(),
  limitAdapterEnhancer(),
  cacheAdapterEnhancer(),
  axios.defaults.adapter
]

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
    const { data } = response
    if (data.code != 200) {
      return Promise.reject(data)
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return data.data
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
