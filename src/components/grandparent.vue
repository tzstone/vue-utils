<template>
  <div style="border: 1px solid #ccc; margin: 20px">
    {{ name }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  provide() {
    return {
      name: this.name,
      getContext: this._getContext
    }
  },
  inject: {
    getContext: { default: () => {} }
  },
  data() {
    return {
      name: 'grandparent'
    }
  },
  methods: {
    _getContext() {
      return { context: 'grandparent' }
    }
  }
}
</script>

<style lang="less" scoped></style>
