<template>
  <div>
    <div v-sticky='{stickyTop: stickyTop}' class="header"></div>
    <ul>
      <li v-for="t in 10">{{t}}</li>
    </ul>
  </div>
</template>

<script>
export default {
	data() {
		return {
			stickyTop: 0
		}
	},
	mounted() {
		setTimeout(() => {
			this.stickyTop = 100
		}, 10 * 1e3)
	}
}
</script>

<style scoped>
.header {
	height: 100px;
	background: #ccc;
	/* position: sticky; */
	/* position: -webkit-sticky; */
	/* position: fixed; */
	/* top: 0; */
}
li {
	list-style: none;
	height: 100px;
	border-bottom: 1px solid #ccc;
}
</style>
