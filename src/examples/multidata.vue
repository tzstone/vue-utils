<template>
  <div></div>
</template>

<script>
import { run } from '@/utils/sandbox'
export default {
  name: '',
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      run(
        [
          data => {
            console.log(Date.now(), JSON.stringify(data))
          }
        ],
        `
       function fn (callback) {
        let count = 10
        const fetch = () => {
          let offlineData
          const fetchOfflineData = () => {
            return new Promise(resolve => {
              if (offlineData) resolve(offlineData)

              setTimeout(() => {
                offlineData = { offline: [1, 2, 3] }
                resolve(offlineData)
              }, 500)
            })
          }
          const fetchOnlineData = () => {
            return new Promise(resolve => {
              count++
              setTimeout(() => {
                resolve({
                  online: [count+1, count+2, count+3]
                })
              }, 300)
            })
          }

          Promise.all([fetchOfflineData(), fetchOnlineData()]).then(([res1, res2])=>{
            callback({
              code: 200,
              data: [res1, res2]
            })
          })
        }

        fetch()
        setInterval(fetch, 1500);
      }
      return fn
      `
      )
    }
  }
}
</script>

<style lang="less" scoped></style>
