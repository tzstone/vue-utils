<template>
  <div>
    foo
    <div class="container">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
    bar
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  width: 650px;
  display: grid;
  border: 1px solid blue;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  // grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  column-gap: 20px;
  row-gap: 20px;
  grid-template-areas: 'a b c' 'd e f' 'g h i'; // 每行由单引号内 ' ' 定义，以空格分隔
  div {
    border: solid 1px #ccc;
  }
}
</style>
