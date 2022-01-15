<template>
  <div>
    name: <el-input v-model="form.name" />
    address: <el-input v-model="form.address" />
    company: <el-input v-model="form.company.name" />
    <el-button @click="log">click</el-button>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      storeKeyMap: {
        form: 'form.info' // 组件私有变量与store对象的映射
      },
      form: {} // 私有变量
    }
  },
  watch: {
    form: {
      handler: function() {
        console.log('component form change')
      },
      deep: true
    }
  },
  mounted() {
    this.fetchForm()
  },
  methods: {
    fetchForm() {
      setTimeout(() => {
        this.$store.commit('SET_FORM', {
          id: '001',
          info: {
            name: 'jack',
            address: 'sz',
            company: {
              name: 'apple'
            }
          }
        })
      }, 3000)
    },
    log() {
      console.log(this.$store.state.form.info.name)
    }
  }
}
</script>

