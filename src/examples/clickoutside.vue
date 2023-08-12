<template>
  <div>
    <button @click="back">back</button>
    <button @click="emit">emit</button>
    <div>
      <div v-show="showMask1" class="mask1" />
      <div v-clickoutside="clickoutside1" class="dialog1">click dialog1</div>
    </div>

    <div>
      <div v-show="showMask2" class="mask2" />
      <div v-clickoutside="clickoutside2" class="dialog2">click dialog2</div>
    </div>

    <button @click="reRoute">reroute</button>
  </div>
</template>

<script lang="ts">
import emitter, { EmitterEvents } from '@/utils/emitter'

export default {
  data() {
    return {
      showMask1: true,
      showMask2: true
    }
  },
  mounted() {
    this.$eventBus.$on(['test', 'test1'], a => {
      debugger
    })
  },
  destroyed() {
    debugger
  },
  methods: {
    emit() {
      this.$eventBus.$emit('test', 111)
    },
    back() {
      this.$router.push({
        path: '/form'
      })
    },
    clickoutside1() {
      this.showMask1 = false
      emitter.emit(EmitterEvents.CLICK_OUTSIDE, { target: 1 })
    },
    clickoutside2() {
      this.showMask2 = false
      emitter.emit(EmitterEvents.CLICK_OUTSIDE, { target: 2 })
    },
    reRoute() {
      this.$router.push({
        path: '/clickoutside',
        query: {
          t: Date.now()
        }
      })
    }
  }
}
</script>

<style>
.mask1 {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
}
.dialog1 {
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 2;
  width: 100px;
  margin-left: -50px;
  border: 1px solid blue;
}

.mask2 {
  position: fixed;
  top: 10%;
  left: 10%;
  bottom: 10%;
  right: 10%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.2);
}
.dialog2 {
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 11;
  width: 100px;
  margin-left: -50px;
  border: 1px solid yellow;
}
</style>
