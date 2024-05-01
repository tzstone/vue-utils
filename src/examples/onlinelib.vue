<template>
  <div>
    <component :is="comp" :msg="msg" @myclick="myclick" />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      comp: null,
      msg: 'hello world'
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const script = document.createElement('script')
      // 本地 online-lib 项目
      script.src = 'http://localhost:8090/meta.umd.js'
      document.body.appendChild(script)
      script.onload = () => {
        this.comp = window['miracle.home'].component
      }
    },
    myclick(obj) {
      debugger
    }
  }
}
</script>

<style lang="less" scoped></style>
