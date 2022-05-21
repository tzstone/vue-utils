<template>
  <div />
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    * longTask() {
      let i = 0
      while (i <= 500) {
        yield i++
      }
      return i
    }
  }
}
</script>

<style lang="less" scoped></style>
