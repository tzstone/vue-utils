<template>
  <div>
    count: {{ count }}
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
export default {
  data() {
    return {
      count: 0,
      obj: {
        count: 0,
        innerObj: {
          name: 'localVariable',
        }
      }
    }
  },
  computed: {
    computedObj() {
      return { count: this.obj.count }
    }
  },
  mounted() {
    // const rawStart = performance.now()
    // for(let i=0; i<100000; i++) {
    //   let temp = this.count + 1
    // }
    // console.log('Direct this access time:', performance.now() - rawStart)

    // 原始值直接解构即可(丢失响应式)
    // const { count } = this
    // const localStart = performance.now()
    // for(let i=0; i<100000; i++) {
    //   let temp = count + 1
    // }
    // console.log('Local variable access time:', performance.now() - localStart)

    const { innerObj } = this.obj
    // 访问innerObj.name仍会触发getter
    console.log('innerObj name:', innerObj.name)

    const rawStart = performance.now()
    for(let i=0; i<1000000; i++) {
      let temp = this.obj.count + 1
    }
    console.log('Direct this access time:', performance.now() - rawStart)

    // 使用计算属性, 会进入computed的getter
    const computedStart = performance.now()
    for(let i=0; i<1000000; i++) {
      let temp = this.computedObj.count + 1
    }
    console.log('computed variable access time:', performance.now() - computedStart)

    // 解构成局部变量, 少了一层访问, 但保持响应式, 访问obj.count会触发getter
    const { obj } = this
    const localStart = performance.now()
    for(let i=0; i<1000000; i++) {
      let temp = obj.count + 1
    }
    console.log('Local variable access time:', performance.now() - localStart)

    // 深拷贝, 完全脱离响应式系统, 访问copyObj.count不会触发getter
    const copyObj = cloneDeep(this.obj)
    const copyStart = performance.now()
    for(let i=0; i<1000000; i++) {
      let temp = copyObj.count + 1
    }
    console.log('Copy variable access time:', performance.now() - copyStart)
  }
}
</script>

<style>

</style>
