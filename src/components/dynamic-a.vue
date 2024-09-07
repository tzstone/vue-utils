<template>
  <div>
    {{ msg }}
    <!-- <el-input v-model="myvalue.value" /> -->
  </div>
</template>

<script>
export default {
  name: 'Aaa',
  props: {
    value: Object
  },
  data() {
    return {
      msg: 'dynamic a'
    }
  },
  computed: {
    myvalue: {
      get() {
        return this.value
      },
      set(val) {
        // this.$emit('changeName', this.value)
      }
    }
  },
  watch: {
    myvalue: {
      handler(name) {
        this.$emit('changeName', name)
      },
      deep: true
    }
  },
  created() {
    console.log('created a', Date.now())
  },
  methods: {
    handler(res) {}
  }
}
</script>

<style lang="less" scoped></style>
