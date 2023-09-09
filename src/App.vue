<template>
  <div id="app">
    切换语言:
    <el-select v-model="$root.$i18n.locale" placeholder="请选择">
      <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <span>{{ $t('hello') }}</span
    ><br />
    <router-view />
  </div>
</template>

<script>
import emitter, { EmitterEvents } from '@/utils/emitter'
export default {
  name: 'App',
  data() {
    return {
      langs: [
        {
          label: 'English',
          value: 'en'
        },
        {
          label: '中文',
          value: 'zh'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler(route) {}
    }
  },
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
