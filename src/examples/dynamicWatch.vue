<template>
  <div>
    <p @click="onChangeName">change name</p>
    <p @click="onChangeAge">change age</p>
    <p @click="onChangeAddress">change address</p>
    <p>{{ rr }}</p>
    <button @click="changea">change a</button>

    <button @click="changeb">change b</button>
    <button @click="changec">change c</button>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      count: 0,
      context: {},
      a: 1,
      b: 2,
      c: 3
    }
  },
  computed: {
    rr() {
      if (this.a === 1) {
        return this.b
      } else {
        return this.c
      }
    }
  },
  watch: {
    'context.address': function (address) {
      console.log('address change', address)
    }
  },
  mounted() {
    // watch有效
    // this.$set(this.context, 'name', '')
    // this.$set(this.context, 'age', '')
    // this.$set(this.context, 'address', '')

    // watch无效
    // this.context.name = ''
    // this.context.age = ''
    // this.context.address = ''
    const useContext = () => {
      return {
        context: this.context
      }
    }

    this.$watch(
      function () {
        const fn = new Function(
          `return function fn(useContext){
            const { context } = useContext()
            const name = context.name; 
            const age = context.age; 
            return {} // age, num:1
          }`
        )()
        return fn(useContext)
      },
      function (val) {
        console.log('trigger watcher', val)
      }
    )

    // watch有效
    this.$set(this.context, 'name', '')
    this.$set(this.context, 'age', '')
    this.$set(this.context, 'address', '')
  },
  methods: {
    changea() {
      this.a = 0
    },
    changeb() {
      this.b += 10
    },
    changec() {
      this.c += 20
    },
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
