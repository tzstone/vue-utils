<template>
  <div class="wrapper" :class="{ customBorderColor: borderColor }" :style="{ '--border-color': borderColor }">
    <el-table :data="tableData" border style="width: 800px" :span-method="arraySpanMethod">
      <el-table-column prop="date" fixed label="日期" width="150" />
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" width="120" />
          <el-table-column prop="city" label="市区" width="120" />
          <el-table-column prop="address" label="地址" width="300" />
          <el-table-column prop="zip" label="邮编" width="120" />
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borderColor: 'red',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 30px;
  &.customBorderColor {
    ::v-deep .el-table--border {
      border-color: var(--border-color) !important;
    }
    ::v-deep .el-table--border::after,
    ::v-deep .el-table--group::after,
    ::v-deep .el-table::before,
    ::v-deep .el-table__fixed-right::before,
    ::v-deep .el-table__fixed::before {
      background-color: var(--border-color) !important;
    }
    ::v-deep .el-table {
      .el-table__cell {
        border-color: var(--border-color) !important;
      }
    }
  }
}
</style>
