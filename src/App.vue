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
import { computed, defineComponent, onMounted, onUnmounted, ref } from '@vue/composition-api';

import emitter, { EmitterEvents } from '@/utils/emitter';

export default defineComponent({
  name: 'App',
  setup(props, ctx) {
    const langs = ref([
      {
        label: 'English',
        value: 'en'
      },
      {
        label: '中文',
        value: 'zh'
      }
    ])

    const cachePageNames = computed(() => {
      return ctx.root.$store.state.common.cachePageNames
    })

    onMounted(() => {
      emitter.on(EmitterEvents.CLICK_OUTSIDE, e => {
        console.log(e)
      })
    })

    onUnmounted(() => {
      emitter.off(EmitterEvents.CLICK_OUTSIDE)
    })

    return {
      langs,
      cachePageNames
    }
  }





})
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
