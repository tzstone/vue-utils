<template>
  <div>
    <button @click="toggle">toggle permission</button>

    <button v-permission.show>permission btn</button>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      ddd: 'd'
    }
  },
  methods: {
    toggle() {
      this.$store.commit('togglePermission')
    }
  }
}
</script>

<style lang='less' scoped>

</style>
