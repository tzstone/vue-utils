<template>
  <!-- 同名组件缓存 -->
  <div>
    <el-select v-model="item" value-key="id">
      <el-option v-for="t in list" :key="t.id" :value="t" :label="t.com"> {{ t.com }}, {{ t.id }} </el-option>
    </el-select>

    <!-- 方式一: 通过key区分同名组件 -->
    <keep-alive>
      <component :is="item.com" :key="item.id" />
    </keep-alive>

    <!-- 方式二: 每个组件都通过keepalive包裹 -->
    <div v-for="(t, i) in list" :key="i">
      <keep-alive>
        <component :is="item.com" v-if="t.id == item.id" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import input1 from '@/components/input1.vue'
import input2 from '@/components/input2.vue'

export default {
  name: '',
  components: {
    input1,
    input2
  },
  data() {
    return {
      item: { com: 'input1', id: 111 },
      list: [
        { com: 'input1', id: 111 },
        { com: 'input2', id: 222 },
        { com: 'input1', id: 333 } // 同名组件
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
