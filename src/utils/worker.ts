/* eslint-disable */
function calculate(data) {
  return data.reduce((sum, t) => {
    sum += t
    return sum
  }, 0)
}

let isWorking = false
let startWorkingTime = 0
let tasks = []

addEventListener('message', event => {
  const { channel, data, taskId } = event.data
  let result
  switch (channel) {
    case 'calculate':
      isWorking = true
      startWorkingTime = Date.now()
      tasks.push({ taskId })

      result = calculate(data)

      isWorking = false
      startWorkingTime = 0
      tasks = tasks.filter(task => task.taskId != taskId)

      postMessage({
        threadCode: 0,
        channel,
        threadData: {
          taskId,
          data: result,
          code: 0,
          msg: ''
        }
      })
      break

    case 'inspection':
      postMessage({
        threadCode: 0,
        channel: 'inspection',
        threadData: {
          isWorking,
          startWorkingTime,
          workTimeElapse: isWorking ? Date.now() - startWorkingTime : 0,
          tasks
        }
      })
      break
  }
})
