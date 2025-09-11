<template>
  <el-table
    class="dynamic-table"
    border
    :data="tableData"
    :style="tableStyle">
    <el-table-column
      class-name="column-0"
      prop="date"
      label="日期"
      width="180"/>
    <el-table-column
      class-name="column-1"
      prop="name"
      label="姓名"
      width="180"/>
    <el-table-column
      class-name="column-2"
      prop="address"
      label="地址"/>
  </el-table>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
    }
  },
  computed:  {
    tableStyle() {
      return {
        '--border-color-0': '#f56c6c',
        '--border-color-1': '#e6a23c',
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
      top: -1px;
      right: 0;
      height: calc(100% + 1px);
      width: 1px;
      background-color: var(--border-color-#{$i}, #ebeef5); /* 默认使用 el-table 的边框色 */
    }
  }
}
</style>
