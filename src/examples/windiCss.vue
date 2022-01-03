<template>
  <div>
    <div class="flex">
      <p v-for="item in 3" :key="item" class="ml-2 p-3 first:bg-green-100 last:hover:text-white">p{{ item }}</p>
    </div>
    <button class="btn block">@apply</button>
    <button class="block; disabled:opacity-50" disabled>disable</button>
    <p class="text-blue-500 font-serif inline-block p-1 skew-10deg">extend</p>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.btn {
  @apply bg-green-300 text-white;
}
</style>
