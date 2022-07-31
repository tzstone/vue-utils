<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: 'Aaa',
  data() {
    return {
      msg: 'dynamic a'
    }
  },
  created() {
    console.log('created a', Date.now())
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
