<template>
  <div>
    <com :msg="msg" />
  </div>
</template>

<script>
import com from '@/components/functional.vue'
export default {
  name: '',
  components: {
    com
  },
  data() {
    return {
      msg: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.msg++
    }, 300)
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
