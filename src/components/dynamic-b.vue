<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: 'Bbb',
  data() {
    return {
      msg: 'dynamic b'
    }
  },
  created() {
    console.log('created b', Date.now())
  },
  destroyed() {
    console.log('b destroyed')
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
