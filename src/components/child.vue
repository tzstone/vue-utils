<template>
  <div style="border: 1px solid #ccc; margin: 20px">
    child
    <div>parent: {{ name }}</div>
    <div>parent context: {{ getContext() }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  inject: {
    name: {
      default: ''
    },
    getContext: { default: () => {} }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
