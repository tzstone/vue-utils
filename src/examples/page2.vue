<template>
  <div>
    page2
    <el-input v-model="value" />
    <el-button @click="goPage3">go page3</el-button>
    <el-button @click="goBack">back</el-button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'page2',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    goPage3() {
      this.$router.push('/page3')
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped></style>
