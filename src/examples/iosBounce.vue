<template>
    <ul v-ios-bounce.up>
      <li v-for="item in 10">{{item}}</li>
    </ul>
</template>

<script>
export default {
	data() {
		return {}
	}
}
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
}
li {
	list-style: none;
	height: 100px;
	border-bottom: 1px solid #ccc;
}
</style>
