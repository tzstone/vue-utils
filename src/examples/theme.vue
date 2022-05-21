<template>
  <div>
    <button @click="onChangeInnerColor">changeInnerColor</button>
    <div class="outer">
      outer
      <div class="inner" :style="innerStyles">
        <span>inner</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      innerStyles: {
        '--bg-color': 'yellow',
        '--text-color': 'green'
      }
    }
  },
  methods: {
    onChangeInnerColor() {
      this.innerStyles['--text-color'] = 'blue'
      this.innerStyles['--bg-color'] = '#fff'
    }
  }
}
</script>

<style lang='less' scoped>
.inner{
  span{
    background-color: var(--bg-color);
    color: var(--text-color);
  }
}
</style>
