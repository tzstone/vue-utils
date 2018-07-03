<template>
  <div class="hello">
    <ul>
      <li>
        <router-link to='/imgLoad'>imgLoad</router-link>
      </li>
      <li>
        <router-link to='/keyboard'>keyboard</router-link>
      </li>
      <li>
        <router-link to='/clickoutside'>clickoutside</router-link>
      </li>
      <li>
        <router-link to='/iosBounce'>iosBounce</router-link>
      </li>
      <li>
        <router-link to='/sticky'>sticky</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
	height: 50px;
}
</style>
