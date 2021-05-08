<template>
  <div class="home">
    <div class="item">
      router:
      <router-link to="/imgLoad">imgLoad</router-link>
      <router-link to="/keyboard">keyboard</router-link>
      <router-link to="/clickoutside">clickoutside</router-link>
      <router-link to="/iosBounce">iosBounce</router-link>
      <router-link to="/sticky">sticky</router-link>
    </div>
    <div class="item">
      filter: {{ 2.1234 | toFixed }}
    </div>
    <div class="item">
      global component:
      <Coma></Coma>
      <Comb></Comb>
    </div>
    <div class="item">
      icon:
      <svg-icon icon-class="chart" style="margin-right:5px;font-size:21px;"/>
      <svg-icon icon-class="email" style="color:red;"/>
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
  mounted() {},
  methods: {
    onAdd() {
      this.$store.commit('ADD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
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
