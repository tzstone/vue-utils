<!-- page keepalive -->
<template>
  <div>

  </div>
</template>

<script>
import { transform, esbuildTransform } from '@/utils/sandbox';
export default {
  // eslint-disable-next-line
  name: 'babel', // 组件名和路由名保持一直
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    // 单层文件夹
    const single = import.meta.glob('@/components/*/index.vue')
    console.log('单层文件夹', single)

    // 多层文件夹
    const double = import.meta.glob('@/components/**/index.vue')
    console.log('多层文件夹', double)

    // 固定文件夹前缀
    const prefix = import.meta.glob('@/components/JsonF*/index.vue')
    console.log('固定文件夹前缀', prefix)
  }
}
</script>

<style lang="less" scoped></style>
