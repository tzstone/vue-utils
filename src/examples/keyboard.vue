<template>
  <div>
    <input v-keyboard='"number"' placeholder="请输入数字"/>
    <input v-keyboard='"phone"' placeholder="请输入手机"/>
    <input v-keyboard='"decimal"' placeholder="请输入金额"/>

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

<style>
input {
	display: block;
}
</style>