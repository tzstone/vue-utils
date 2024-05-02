<template>
  <div>
    <el-button type="primary" size="small" @click="start">start</el-button>
    <el-button type="primary" size="small" @click="merge">merge</el-button>
  </div>
</template>

<script>
import enhanceHttp from '@/utils/adapter'
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    start() {
      const _requestId = '123456789'
      for (let i = 0; i < 30; i++) {
        if (i >= 3 && i < 6) {
          this.request(`https://mock.apifox.com/m1/4426965-4072270-default/test?i=${i}`, {
            _requestId,
            _cancelable: true
          }).catch(err => {
            console.error(err)
          })
        } else if (i === 10) {
          this.request(`https://mock.apifox.com/m1/4426965-4072270-default/test1?i=${i}`).catch(err => {
            console.error(err)
          })
        } else {
          this.request(`https://mock.apifox.com/m1/4426965-4072270-default/test?i=${i}`).then(res => {
            console.log('i', i, res)
          })
        }
      }
    },
    merge() {
      for (let i = 1; i < 4; i++) {
        this.request(`https://mock.apifox.com/m1/4426965-4072270-default/query`, {
          params: { ids: `id${i}` },
          _mergeable: true,
          _mergeKeys: ['ids', 'id']
        }).then(res => {
          console.log('merge i', i, res)
        })
      }

      for (let i = 1; i < 3; i++) {
        this.request(`https://mock.apifox.com/m1/4426965-4072270-default/query1`, {
          params: { ids: `id${i}` },
          _mergeable: true,
          _mergeKeys: ['ids', 'id']
        }).then(res => {
          console.log('merge1 i', i, res)
        })
      }
    },
    request(url, config = {}) {
      return enhanceHttp.get(url, config)
    }
  }
}
</script>

<style lang="less" scoped></style>
