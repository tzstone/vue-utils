export class ThreadPool {
  constructor(options = {}) {
    const {
      inspectIntervalTime = 10 * 1000,
      maximumWorkTime = 30 * 1000,
      maxThreadNumber } = options
    this.maxThreadNumber = maxThreadNumber || window.navigator.hardwareConcurrency || 4
    this.inspectIntervalTime = inspectIntervalTime
    this.maximumWorkTime = maximumWorkTime
    this.threads = []
    this.init()
  }
  init() {
    // 初始化线程池
    for (let i = 0; i < this.maxThreadNumber; i++) {
      this.createThread(i)
    }
    // 开启线程存活检测
    setInterval(() => this.inspectThreads(), this.inspectIntervalTime)
  }
  createThread(i) {
    const thread = new Worker('./worker.js', { type: 'module' })
    thread.addEventListener('message', event => {
      this.messageHandler(event, thread)
    })
    thread.id = i
    thread.busy = false
    thread.taskMap = {} // 当前线程所有工作任务的键值对
    this.threads[i] = thread
  }
  messageHandler(event, thread) {
    /**
     * {
     *    threadCode: 0, // 线程执行状态 0: 成功, 1: 失败
     *    threadData: { taskId, data, code, msg },
     *    threadMsg: 'xxx',
     *    channel: 'calculate'
     * }
     */
    const { channel, threadData, threadCode, threadMsg } = event.data
    const { taskId } = threadData
    // 线程失败
    if (threadCode !== 0) {
      thread.busy = false
      const promise = thread.taskMap[taskId]
      if (promise) {
        promise.reject({ code: threadCode, msg: threadMsg })
      }
      return
    }

    switch (channel) {
      case 'calculate':
        var { code, data, msg } = threadData
        var promise = thread.taskMap[taskId]
        if (promise) {
          if (code === 0) {
            promise.resolve(data)
          } else {
            promise.reject({ code, msg })
          }
          thread.taskMap[taskId] = null
        }
        thread.busy = false
        break
      case 'inspection':
        var { isWorking, workTimeElapse } = threadData
        if (isWorking && workTimeElapse > this.maximumWorkTime) {
          console.log('terminate thread', thread.id)
          this.terminateZombieThread(thread)
        } else {
          console.log('thread', thread.id, 'still alive')
        }
        break
    }
  }
  dispatchThread({ channel, data, promise }) {
    let thread = this.threads.filter(thread => !thread.busy)[0]
    if (!thread) {
      thread = this.threads[0]
    }
    const taskId = Date.now()
    thread.taskMap[taskId] = promise
    thread.postMessage({
      channel,
      data,
      taskId
    })
    thread.busy = true
  }
  terminateZombieThread(thread) {
    const { id } = thread
    this.threads.splice(id, 1, null)
    thread.terminate()
    thread = null
    this.createThread(id)
  }
  inspectThreads() {
    this.threads.forEach(thread => {
      thread.postMessage({
        channel: 'inspection',
        data: { id: thread.id }
      })
    })
  }
}
