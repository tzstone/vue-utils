<template>
  <div class="card-page">
    i am card-page
    <button @click="onUpdated(0)">update0</button>
    <button @click="onUpdated(1)">update1</button>

    <div class="card0"></div>
    <div class="card1"></div>
    <!-- <slot name="card" :props="{cardname: 1}" :on="{click: onClick('1')}"></slot>
    <slot name="card" :props="{cardname: 2}" :on="{click: onClick('2')}"></slot> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted } from '@vue/composition-api';

export default defineComponent({
  name:'CardPage',
  props:{
    list: {
      type: Array,
      default: () => ['bbb']
    }
  },
  setup(props, ctx) {
    const ins = {}
    const renderCard = inject<any>('renderCard')

    const onClick = (val) => {
      console.log('card', val)
    }

    const onUpdated = (val) => {
      ins[val].update({ value: val })
    }

    const { proxy }= getCurrentInstance()
    onMounted(() => {
      props.list.forEach((type, index) => {
        ins[index] = renderCard.call(proxy, proxy.$el.querySelector(`.card${index}`), { props: { type }})
      });
    })

    return {
      onClick,
      onUpdated
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-page {
  border: 1px solid #ccc;
  margin: 10px;
}
</style>
