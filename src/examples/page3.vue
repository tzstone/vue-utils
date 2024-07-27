<!-- page keepalive -->
<template>
  <div>
    page3
    <el-input v-model="value" />
    <el-button @click="goBack">back</el-button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'page3',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped></style>
