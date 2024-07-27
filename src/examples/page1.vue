<template>
  <div>
    page1
    <el-input v-model="value" />
    <el-button @click="goPage2">go page2</el-button>
    <el-button @click="goBack">back</el-button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'page1', // 组件名和路由名保持一直
  data() {
    return {
      value: ''
    }
  },
  methods: {
    goPage2() {
      this.$router.push('/page2')
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped></style>
