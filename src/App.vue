<template>
  <div id="app">
    <button @click="toggle">toggle permission</button>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    toggle() {
      this.$store.commit('togglePermission')
    }
  }
}
</script>

<style>
</style>
