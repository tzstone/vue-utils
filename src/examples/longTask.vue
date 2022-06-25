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
    async longTask() {
      let i = 0
      while (i <= 500) {
        await i++
      }
      return i
    }
  }
}
</script>

<style lang="scss" scoped></style>
