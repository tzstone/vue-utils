/**
 * 请求顺序: 取消
 * 请求合并
 * 节流: 队列
 * 缓存
 * real http
 */
import axios from 'axios'
import { createDefer } from './util'

type Adapter = (config, next: () => Promise<any>) => Promise<any>

export function generateReqKey(config) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// const keepOrderAdapter = (config, next) => {}
// const cacheAdapter = (config, next) => {}

const limitAdapterEnhancer = (): Adapter => {
  const maxLimit = 1 // 最大并发数
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

const adapters = [limitAdapterEnhancer(), axios.defaults.adapter]

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
