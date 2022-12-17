<template>
  <div>
    <p @click="onChangeName">change name</p>
    <p @click="onChangeAge">change age</p>
    <p @click="onChangeAddress">change address</p>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      count: 0,
      context: {}
    }
  },
  watch: {
    'context.address': function (address) {
      console.log('address change', address)
    }
  },
  mounted() {
    this.$set(this.context, 'name', '')
    this.$set(this.context, 'age', '')
    this.$set(this.context, 'address', '')

    this.$watch(
      function () {
        const fn = new Function(
          `return function fn(context){
            const name = context.name; 
            const age = context.age; 
            return {age, num:1}
          }`
        )()
        return fn(this.context)
      },
      function (val) {
        console.log('trigger watcher', val)
      }
    )
  },
  methods: {
    onChangeName() {
      if (++this.count % 2) {
        this.context.name = '张三'
      } else {
        this.context.name = '李四'
      }
    },
    onChangeAge() {
      if (++this.count % 2) {
        this.context.age = 18
      } else {
        this.context.age = 28
      }
    },
    onChangeAddress() {
      if (++this.count % 2) {
        this.context.address = 'sz'
      } else {
        this.context.address = 'sh'
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
