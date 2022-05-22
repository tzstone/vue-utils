<template>
  <div>
    <button @click="onChangeInnerColor">changeInnerColor</button>
    <div class="outer">
      outer
      <div class="inner" :style="innerStyles">
        <inner />
        <chart :style-obj="innerStyles" />
      </div>
    </div>
  </div>
</template>

<script>
import inner from '@/components/theme/inner'
import chart from '@/components/theme/chart'

export default {
  name: '',
  components: {
    inner,
    chart
  },
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

}
</style>
