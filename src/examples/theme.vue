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
import chart from '@/components/theme/chart.vue';
import inner from '@/components/theme/inner.vue';

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

<style lang="scss" scoped>
.inner {
}
</style>
