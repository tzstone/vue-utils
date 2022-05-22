<template>
  <div id="chartbox" style="height:300px;width:300px" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  props: ['styleObj'],
  data() {
    return {
      myChart: null
    }
  },
  computed: {
    option() {
      return {
        title: {
          text: 'ECharts 入门示例',
          'textStyle': {
            'color': this.styleObj['--text-color']
          }
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  watch: {
    styleObj: {
      handler: function() {
        this.myChart.setOption(this.option)
      },
      deep: true
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('chartbox'))
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.option)
  },
  methods: {}
}
</script>

<style lang='less' scoped>

</style>
