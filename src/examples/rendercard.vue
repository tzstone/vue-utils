<template>
  <div class="render-card">
    i am render-card
    <component :is="type" :render-card="renderCard" v-bind="$attrs"/>
    <!-- <cardPage :render-card="renderCard">
      <template #card="{props, on}">
        <card v-bind="props" v-on="on"/>
      </template>
    </cardPage> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from '@vue/composition-api';
import Vue from 'vue';

const cardComp = () => import('./cardComp.vue')
const aaa = () => import('@/components/dynamic-a.vue')
const bbb = () => import('@/components/dynamic-b.vue')
const cardPage = () => import('./cardPage.vue')
export default defineComponent({
  name: 'RenderCard',
  components: {
    cardPage,
    aaa,
    bbb
  },
  props: {
    type: String
  },
  setup(props, ctx) {
    const vmList = []
    const renderCard = (el, options: {cardId: String, props: any, on:any,}) => {
      const vm = new Vue({
        el,
        render(createElement, hack) {
          return createElement(cardComp, {
            props: options.props,
            on: options.on,
            ref: 'card'
          })
        },
      })
      vmList.push(vm)
      const methods = {
        update: (props) => {
          (vm as any).$refs['card'].updateContext(props)
        },
        destroy() {
          vm.$destroy()
        }
      }
      return methods
    }

    onUnmounted(() => {
      vmList.forEach(vm => {
        vm.$destroy()
      })
    })

    return {
      renderCard,
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.render-card {
  border: 1px solid #ccc;
  margin: 10px;
}
</style>
