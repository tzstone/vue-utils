<template>
  <div class="card" @click="$emit('click')">
    <button @click="goHome">go home</button>
    i am card, cardname: {{ cardname }}
    <cardComp :type="$route.query.type" :list="list"/>
  </div>
</template>

<script>
const cardComp = () => import('./cardComp.vue')
export default {
  components: {
    cardComp
  },
  props: {
    cardname: {
      type: Number
    },
  },
  data() {
    return {
      list: ['aaa', 'cardPage']
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  border: 1px solid #ccc;
}
</style>
