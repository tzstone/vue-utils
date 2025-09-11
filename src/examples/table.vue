<template>
  <el-table
    :data="tableData"
    class="dynamic-table"
    :style="tableStyle">
    <el-table-column
      class-name="column-0"
      prop="date"
      label="日期"
      width="150"/>
    <el-table-column label="配送信息" class-name="column-1">
      <el-table-column
        class-name="column-2"
        prop="name"
        label="姓名"
        width="120"/>
      <el-table-column label="地址" class-name="column-3">
        <el-table-column
          class-name="column-4"
          prop="province"
          label="省份"
          width="120"/>
        <el-table-column
          class-name="column-5"
          prop="city"
          label="市区"
          width="120"/>
        <el-table-column
          class-name="column-6"
          prop="address"
          label="地址"
          width="300"/>
        <el-table-column
          class-name="column-7"
          prop="zip"
          label="邮编"
          width="120"/>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  computed:  {
    tableStyle() {
      return {
        '--border-color-0': '#f56c6c',
        '--border-color-4': '#e6a23c',
        '--border-color-2': '#67c23a',
      }
    }
  },
  mounted() {


  },
  methods: {

  }
}
</script>

<style lang="scss" >
.dynamic-table {
  @for $i from 0 through 50 {
    .el-table__cell.column-#{$i}::after {
      content: '';
      position: absolute;
      top: 0;
      right: -1px;
      height: calc(100% + 1px); /* 覆盖行边框线 */
      width: 1px;
      background-color: var(--border-color-#{$i}); /* 默认使用 el-table 的边框色 */
    }
  }
}
</style>
