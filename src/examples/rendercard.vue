<template>
  <div class="render-card">
    i am render-card
    <component :is="type" v-bind="$attrs" />
    <!-- <cardPage :render-card="renderCard">
      <template #card="{props, on}">
        <card v-bind="props" v-on="on"/>
      </template>
    </cardPage> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api';
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
    function renderCard (el, options: {cardId: String, props: any, on:any}, parent) {
      let vm = new Vue({
        el,
        parent, // 绑定父实例, 继承父实例原型prototype (eg: $route/$store)
        render(createElement, hack) {
          return createElement(cardComp, {
            props: options.props,
            on: options.on,
            ref: 'card'
          })
        }
      })

      const _destroy = () => {
        vm.$destroy()
        vm = null
      }

      // 父实例销毁时不会自动销毁vm, 需手动销毁
      parent.$once('hook:destroyed', () => {
        _destroy()
      })

      const methods = {
        update: (props) => {
          (vm as any).$refs['card'].updateContext(props)
        },
        destroy() {
          _destroy()
        }
      }
      return methods
    }

    provide('renderCard', renderCard)

    return {
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
