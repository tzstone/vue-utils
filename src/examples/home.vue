<template>
  <div class="home">
    <div class="item">
      router:
      <router-link v-for="(r, i) in routes" :key="i" :to="r.path">{{ r.name }}</router-link>
    </div>
    <div class="item">filter: {{ 2.1234 | toFixed }}</div>
    <div class="item">
      global component:
      <Coma />
      <Comb />
    </div>
    <div class="item">
      icon:
      <svg-icon icon-class="chart" style="margin-right: 5px; font-size: 21px" />
      <svg-icon icon-class="email" style="color: red" />
    </div>
    <div class="item">
      store: count: {{ $store.getters.count }}
      <el-button type="primary" @click="onAdd">add</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    routes() {
      return this.$router.getRoutes()
    }
  },
  mounted() {},
  methods: {
    onAdd() {
      this.$store.commit('ADD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  padding: 30px;
  .item {
    margin-bottom: 20px;
    a {
      margin-right: 10px;
    }
  }
  li {
    height: 50px;
  }
}
</style>
