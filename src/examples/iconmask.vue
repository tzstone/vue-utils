<template>
  <div :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
</template>

<script>
export default {
  name: '',
  props: {
    name: {
      type: String,
      default: 'chart'
    },
    size: {
      type: Number,
      default: 21
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  data() {
    return {}
  },
  computed: {
    // 需屏蔽vue.config.js中的svg-sprite-loader
    styleExternalIcon() {
      return {
        mask: `url(${require(`@/assets/svg/${this.name}.svg`)}) no-repeat center center`,
        '-webkit-mask': `url(${require(`@/assets/svg/${this.name}.svg`)}) no-repeat center center`,
        'font-size': this.size && this.size + 'px',
        color: this.color
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
