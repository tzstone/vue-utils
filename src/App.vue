<template>
  <div id="app" class="app">
    切换语言:
    <el-select v-model="$root.$i18n.locale" placeholder="请选择">
      <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <span>{{ $t('hello') }}</span
    ><br />

    <keep-alive :include="cachePageNames">
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
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
  computed: {
    cachePageNames() {
      return this.$store.state.common.cachePageNames
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

<style>
#app {
  --color: blue;
}
.app {
  --color: green;
}
div {
  --color: red;
}
@media screen and (min-width: 768px) {
  .app {
    --color: yellow;
  }
}
div#app {
  color: var(--color);
}
</style>
