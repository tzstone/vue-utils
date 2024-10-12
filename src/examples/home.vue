<template>
  <div class="home">
    <div class="item">
      router:
      <router-link v-for="(r, i) in routes" :key="i" :to="r.path">{{ r.name }}</router-link>
    </div>
    <div class="item">filter: {{ 2.1234 | toFixed }}</div>
    <div class="item">
      global component:
      <Coma />
      <Comb />
    </div>
    <div class="item">
      icon:
      <svg-icon icon-class="chart" style="margin-right: 5px; font-size: 21px" />
      <svg-icon icon-class="email" style="color: red" />
    </div>
    <div class="item">
      store: count: {{ $store.getters.count }}
      <el-button type="primary" @click="onAdd">add</el-button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from '@vue/composition-api';

import { useDialog } from '@/hook/useDialog';

export default defineComponent({
  setup(props, { root, emit }) {
    const routes = computed(() => root.$router.getRoutes())
    const onAdd = () => {
      root.$store.commit('ADD')
    }
    const  costTime = () => {
      const arr1 = []
      const arr2 = []
      for(let i = 0; i< 30000; i++) {
        arr1.push({ i, val: Math.random() })
        if (i<=1000) {
          arr2.push(i)
        }
      }

      const res1 = []
      console.time('raw')
      arr2.forEach(i => {
        const item = arr1.find(t => t.i == i)
        if (item) {
          res1.push(item)
        }else {
          res1.push('')
        }
      })
      console.timeEnd('raw')

      const res2 = []
      console.time('hash')
      const hashTable = new Map()
      arr2.forEach(item => hashTable.set(item, true));
      arr1.forEach(t => {

        if (hashTable.has(t.i)) {
          res2.push(t)
        }else {
          res2.push('')
        }
        // return true
      })
      console.timeEnd('hash')

      const res3 = []
      console.time('obj')
      const obj = Object.create(null)
      arr2.forEach(item => obj[item] = true );
      arr1.some(t => {
        if (res3.length === arr2.length) return false

        if (obj[t.i]) {
          res3.push(t)
        }else {
          res3.push('')
        }

        return true
      })
      console.timeEnd('obj')
    }

    const innerDialogForm = {
      name: 'zhang'
    }

    const showInnerDialog = () => {
      const { close,  } = useDialog({
        title: 'test',
        form: innerDialogForm,
        schema: {
          formItems: [{
            field: 'name',
            type: 'input'
          }]
        },
        onConfirm: (form) => {
          if (form.name != 'zhangsan') return Promise.reject()
        },
        onClose: (action) => {
        }
      })
    }

    onMounted(() => {
      costTime()
      showInnerDialog()

      setTimeout(() => {
        root.$router.push('/form')
      }, 3000)
    })

    return {
      routes,
      onAdd
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  padding: 30px;
  .item {
    margin-bottom: 20px;
    a {
      margin-right: 10px;
    }
  }
  li {
    height: 50px;
  }
}
</style>
