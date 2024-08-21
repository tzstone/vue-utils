<template>
  <div>
    <JsonForm v-model="form" :schema="schema">
      <template #rate>
        <el-rate v-model="form.rate"/>
      </template>
    </JsonForm>
    <div>
      /-----------------------------------/
    </div>
    <button @click="emit">emit</button>
    name: <el-input v-model="info.name" /> address: <el-input v-model="info.address" /> company:
    <el-input v-model="info.company.name" /> age: <span>{{ info.age }}</span>
    <p v-for="(t, i) in arr" :key="i">name: <el-input v-model="t.name" /></p>
    <el-button @click="addProperty">addProperty</el-button>
    <el-button @click="delProperty">delProperty</el-button>
    <el-button @click="changeObject">changeObject</el-button>

    <el-button @click="addArrayItem">addArrayItem</el-button>
    <el-button @click="changeArray">changeArray</el-button>
    <el-button @click="log">log</el-button>


  </div>
</template>

<script>
import JsonForm from '@/components/JsonForm/index';
import { mapFields } from '@/utils';

export default {
  components: {
    JsonForm
  },
  data() {
    return {
      form: {
        name: '111',
        age: 21,
        province: 'guangdong',
        city: 'shenzhen',
        searchKey: '',
        date: '2024-08-21',
        dateRange: ['2024-09-01', '2024-09-16'],
        rate: 3,
        checked: true,
        'checked-label': 1,
        checkList: [],
        file: 'https://th.bing.com/th/id/OIP.CUWUPQ1iFnys6EK3_6GWGgHaHZ?w=155&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
      },
      schema: {
        prefixBtns: [{
          icon: 'el-icon-search',
          innerText: '搜索',
          click: () => {
            alert('搜索')
          }
        }, {
          icon: 'el-icon-share',
          innerText: '分享',
          click: () => {
            alert('分享')
          }
        }],
        formItems: [{
          type: 'select',
          field: 'name',
          runtimeProps: (form) => {
            return {
              disabled: form.age == 21
            }
          },
          options: [{
            name: 'zhang san',
            id: '111'
          },{
            name: 'li shi',
            id: '222'
          }],
          optionKey: {
            label: 'name',
            value: 'id'
          },
          col: {
            span: 24
          },
        },
        {
          type: 'select',
          field: 'province',
          col: {
            span: 12
          },
          options: [{
            label: '广东',
            value: 'guangdong'
          }, {
            label: '广西',
            value: 'guangxi'
          }],
        },
        {
          type: 'select',
          field: 'city',
          col: {
            span: 12
          },
          options: (form) => {
            const citys = form.province === 'guangdong' ? [{
              label: '深圳',
              value: 'shenzhen'
            },{
              label: '广州',
              value: 'guangzhou'
            }] : [{
              label: '南宁',
              value: 'nanning'
            },{
              label: '梧州',
              value: 'wuzhou'
            }]

            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(citys)
                form.city = citys[0].value
              }, 1000)
            })
          }
        },
        {
          type: 'input',
          field: 'age',
          col: {
            span: 8
          },
        }, {
          type: 'search',
          field: 'searchKey',
          col: {
            span: 8
          },
        },
        {
          type: 'date',
          field: 'date',
          col: {
            span: 8
          },
        }, {
          type: 'dateRange',
          field: 'dateRange',
          col: {
            span: 24
          },
        }, {
          type: 'checkbox',
          field: 'checked',
          innerText: '备选项',
          col: {
            span: 12
          },
        }, {
          type: 'checkbox',
          field: 'checked-label',
          innerText: '备选项 true-label',
          props:{
            'true-label' : 1,
            'false-label': 0
          },
          col: {
            span: 12
          },
        }, {
          type: 'checkboxGroup',
          field: 'checkList',
          col: {
            span: 12
          },
          options: (form) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([{
                  label: '复选框 A',
                  value: 'A'
                }, {
                  label: '复选框 B',
                  value: 'B'
                }])
              })
            })
          }
        },
        {
          type: 'upload',
          field: 'file',
          props: {
            onChange: (files, fileList) => {
              debugger
            }
          },
          col: {
            span: 12
          },
        },
        {
          type: 'slot',
          field: 'rate',
          show: (form) => {
            return form.checked
          },
          col: {
            span: 12
          },
        }
        ],
        submitBtn: {
          click: ()=> {
            alert('查询')
          }
        }
      }
    }
  },
  watch: {
    info: {
      handler: function () {
        console.log('component form info change')
      },
      deep: true
    }
  },
  computed: {
    // TODO: 计算属性监听 if
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
  mounted() {},
  methods: {
    emit() {
      this.$eventBus.$emit('test', 'from form')
    },
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
