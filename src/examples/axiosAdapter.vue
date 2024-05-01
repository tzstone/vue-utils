<template>
  <div></div>
</template>

<script>
import { enhanceHttp } from '@/utils/adapter'
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      for (let i = 0; i < 30; i++) {
        if (i === 10) {
          this.request('https://mock.apifox.com/m1/4426965-4072270-default/test1').catch(err => {
            console.error(err)
          })
        } else {
          this.request()
        }
      }
    },
    request(url = 'https://mock.apifox.com/m1/4426965-4072270-default/test') {
      return enhanceHttp.get(url)
    }
  }
}
</script>

<style lang="less" scoped></style>
