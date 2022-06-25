<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import emitter, { EmitterEvents } from '@/utils/emitter'
export default {
  name: 'App',
  created() {
    emitter.on(EmitterEvents.CLICK_OUTSIDE, e => {
      console.log(e)
    })
  },
  destroyed() {
    emitter.off(EmitterEvents.CLICK_OUTSIDE)
  },
  methods: {}
}
</script>

<style></style>
