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

<script>
export default {
  props:{
    renderCard: Function,
    list: {
      type: Array,
      default: () => ['bbb']
    }
  },
  data() {
    return {
      ins : {}
    }
  },
  computed: {

  },
  mounted() {
    this.list.forEach((type, index) => {
      this.ins[index] = this.renderCard(this.$el.querySelector(`.card${index}`), { props: { type }})
    });
  },
  methods: {
    onClick(val) {
      console.log('card', val)
    },
    onUpdated(val) {
      this.ins[val].update({ value: val })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-page {
  border: 1px solid #ccc;
  margin: 10px;
}
</style>
