/**
 * 请求防抖
 * 请求合并
 * 节流: 队列
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
      const result = await next()
      return Promise.resolve(result)
    } catch (e) {
      return Promise.reject(e)
    } finally {
      debounceMap.delete(_requestId)
      console.log('debounceMap', debounceMap)
    }
  }
}

// const cacheAdapterEnhancer = (): Adapter => {
//   return async (config, next) => {
//     //
//   }
// }

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
      const result = await next()
      return Promise.resolve(result)
    } catch (e) {
      return Promise.reject(e)
    } finally {
      currentConcurrent--
      nextReq()
    }
  }
}

const adapters = [debounceAdapterEnhancer(), limitAdapterEnhancer(), axios.defaults.adapter]

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

export const enhanceHttp = axios.create({
  baseURL: '',
  adapter: adapterHandler
})
