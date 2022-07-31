<template>
  <div>
    <span @click="toggleType">switch {{ type }}</span>
    <component :is="component" ref="com" />
  </div>
</template>

<script>
import Vue from 'vue'
Vue.component('Aaa', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  setTimeout(() => {
    require(['@/components/dynamic-a.vue'], resolve)
  }, 1000)
})
Vue.component('Bbb', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  setTimeout(() => {
    require(['@/components/dynamic-b.vue'], resolve)
  }, 2000)
})
// const aaa = () => import('@/components/dynamic-a.vue')
// const bbb = () => import('@/components/dynamic-b.vue')
// import aaa from '@/components/dynamic-a.vue'
// import bbb from '@/components/dynamic-b.vue'
export default {
  name: '',
  components: {
    // aaa,
    // bbb
  },
  data() {
    return {
      type: 'aaa'
    }
  },
  computed: {
    component() {
      return this.type
    }
  },
  watch: {
    type: function (type) {
      console.log('watchtype', type, this.$refs.com.msg, Date.now())
    }
  },
  methods: {
    toggleType() {
      if (this.type === 'aaa') {
        this.type = 'bbb'
      } else {
        this.type = 'aaa'
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
