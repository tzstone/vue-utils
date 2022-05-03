<template>
  <div>
    name: <el-input v-model="info.name" />
    address: <el-input v-model="info.address" />
    company: <el-input v-model="info.company.name" />
    age: <span>{{ info.age }}</span>
    <p v-for="(t, i) in arr" :key="i">
      name: <el-input v-model="t.name" />
    </p>
    <el-button @click="addProperty">addProperty</el-button>
    <el-button @click="delProperty">delProperty</el-button>
    <el-button @click="changeObject">changeObject</el-button>

    <el-button @click="addArrayItem">addArrayItem</el-button>
    <el-button @click="changeArray">changeArray</el-button>
    <el-button @click="log">log</el-button>
  </div>
</template>

<script>
import { mapFields } from '@/utils'

export default {
  data() {
    return {
    }
  },
  watch: {
    info: {
      handler: function() {
        console.log('component form info change')
      },
      deep: true
    }
  },
  computed: {
    ...mapFields('form', ['arr', 'info'])

    // 普通值 ok
    // 数组项内容改变 ok
    // 数组push/pop/slice ok
    // 数组引用改变 ok
    // 对象属性改变 ok
    // 对象新增属性 有新增, 无mutation
    // 对象删除属性 有删除, 无mutation
    // 对象引用改变 ok
    // unwatch对旧监听的影响 ok(不会影响)
  },
  mounted() {

  },
  methods: {
    changeObject() {
      this.info = {
        name: 1,
        address: '',
        company: {}
      }
    },
    delProperty() {
      delete this.info.name
    },
    addProperty() {
      this.info.age = 10
    },
    addArrayItem() {
      this.arr.splice(0, 0, { name: 3 })
    },
    changeArray() {
      this.arr = [{ name: 6 }]
    },
    log() {
      console.log(this.$store.state.form.arr)
    }
  }
}
</script>

