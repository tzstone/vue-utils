<template>
  <div>d</div>
</template>

<script>
import { ThreadPool } from '@/utils'
export default {
  name: '',
  data() {
    return {
      pool: null,
      worker: null,
      taskMap: {},
      taskId: 0,
      count: 0
    }
  },
  created() {
    this.pool = new ThreadPool()
    new Promise((resolve, reject) => {
      this.pool.dispatchThread({
        channel: 'calculate',
        data: [1, 2, 3],
        promise: { resolve, reject }
      })
    }).then(result => {
      console.log('result', result)
    })

    // this.createWorker()
    // this.createTasks()
  },
  methods: {
    // createTasks() {
    //   setInterval(() => {
    //     const taskId = this.taskId++
    //     const count = this.count++
    //     this.taskMap[taskId] = {
    //       data: count,
    //       channel: taskId % 2 === 0 ? 'double' : 'treble',
    //       taskId,
    //       startTime: Date.now()
    //     }
    //     this.runTask(taskId)
    //   }, 2000)
    // },
    // runTask(taskId) {
    //   if (!this.worker) {
    //     this.createWorker()
    //   }
    //   this.worker.postMessage(this.taskMap[taskId])
    // },
    // createWorker() {
    //   this.worker = new Worker('./worker.js', { type: 'module' })
    //   this.worker.addEventListener('message', event => {
    //     this.messageHandler(event)
    //   })
    // },
    // messageHandler(event) {
    //   const { channel, taskId, data, endTime } = event.data
    //   const { startTime } = this.taskMap[taskId]
    //   console.log('receive', channel, taskId, data, endTime - startTime)
    //   delete this.taskMap[taskId]
    // }
  }
}
</script>

<style lang="scss" scoped></style>
