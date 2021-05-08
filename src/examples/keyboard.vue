<template>
  <div>
    <input v-keyboard="&quot;number&quot;" placeholder="请输入数字">
    <input v-keyboard="&quot;phone&quot;" placeholder="请输入手机">
    <input v-keyboard="&quot;decimal&quot;" placeholder="请输入金额">

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
