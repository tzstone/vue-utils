<template>
  <div class="card-comp">
    i am card comp
    <renderCard :type="type" v-bind="$attrs"/>
  </div>
</template>

<script>
const renderCard = () => import('./rendercard.vue')
export default {
  name: 'Cardcomp',
  components: { renderCard },
  props: ['type'],
  data () {
    return {
      age: 18
    }
  },
  created() {
    console.log('Cardcomp created')
  },
  destroyed() {
    console.log('Cardcomp destroyed')
  },
  methods: {
    updateContext(props) {
      console.log(this.type, 'update', props)
    }
  }
}
</script>

<style scoped lang="scss">
.card-comp {
  border: 1px solid #ccc;
  margin: 10px;
}
</style>
