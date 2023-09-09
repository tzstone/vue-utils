<template>
  <div>
    <el-button type="primary" size="small" @click="change">change</el-button>
    <component :is="component" />
  </div>
</template>

<script>
import local from '@/components/local.vue'
import { createDefer } from '@/utils'
// import axios from 'axios'
export default {
  name: '',
  components: {
    local
  },
  data() {
    return {
      component: 'local'
    }
  },
  methods: {
    async change() {
      await this.loadOnlineComponent()
    },
    loaderScript(url) {
      const node = document.createElement('script')

      // node.setAttribute('crossorigin', 'anonymous');

      node.onload = onload
      node.onerror = onload

      const i = createDefer()

      function onload(e) {
        node.onload = null
        node.onerror = null
        if (e.type === 'load') {
          i.resolve()
        } else {
          i.reject()
        }
      }

      node.src = url

      // `async=false` is required to make sure all js resources execute sequentially.
      node.async = false

      document.head.appendChild(node)

      return i.promise()
    },
    loadStyle(url) {
      const element = document.createElement('link')
      element.onload = onload
      element.onerror = onload

      const i = createDefer()
      function onload(e) {
        element.onload = null
        element.onerror = null
        if (e.type === 'load') {
          i.resolve()
        } else {
          i.reject()
        }
      }

      element.href = url
      element.rel = 'stylesheet'

      document.head.appendChild(element)
      // document.head.removeChild(this.placeholder)
      // this.placeholder = element
      return i.promise()
    },
    async loadOnlineComponent() {
      // const meta = await axios.get('http://localhost:8090/meta.json')
      // await this.loaderScript('http://localhost:8090/meta.umd.js')
      // debugger
      // // this.loadStyle('http://localhost:8090/meta.css')
      // this.component = window['miracle.home'].component
    }
  }
}
</script>

<style lang="scss" scoped></style>
