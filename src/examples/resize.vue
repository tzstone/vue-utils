<template>
  <div>
    <div v-resize class="box"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  width: 300px;
  height: 500px;
  background: blue;
}
</style>
