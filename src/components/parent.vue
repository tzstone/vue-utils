<template>
  <div style="border: 1px solid #ccc; margin: 20px">
    parent
    <div>parent: {{ name }}</div>
    <div>parent context: {{ getContext() }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  provide() {
    return {
      name: this.name1,
      getContext: this._getContext
    }
  },
  inject: {
    name: {
      default: ''
    },
    getContext: { default: () => {} }
  },
  data() {
    return {
      name1: 'parent'
    }
  },
  methods: {
    _getContext() {
      return { context: 'parent' }
    }
  }
}
</script>

<style lang="less" scoped></style>
