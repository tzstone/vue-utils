<template>
  <div>
    <button @click="updateTheme">updateTheme</button>
    <div id="tableContainer" style="width: 600px; height: 300px"></div>
  </div>
</template>

<script>
import * as VTable from '@visactor/vtable'

import { lightTheme, darkTheme } from '@/utils/vtable'

export default {
  name: '',
  data() {
    return {
      lightTheme: true
    }
  },
  mounted() {
    const records = [
      {
        230517143221027: 'CA-2018-156720',
        230517143221030: 'JM-15580',
        230517143221032: 'Bagged Rubber Bands',
        230517143221023: 'Office Supplies',
        230517143221034: 'Fasteners',
        230517143221037: 'West',
        230517143221024: 'Loveland',
        230517143221029: '2018-12-30',
        230517143221042: '3',
        230517143221040: '3.024',
        230517143221041: '-0.605'
      },
      {
        230517143221027: 'CA-2018-115427',
        230517143221030: 'EB-13975',
        230517143221032: 'GBC Binding covers',
        230517143221023: 'Office Supplies',
        230517143221034: 'Binders',
        230517143221037: 'West',
        230517143221024: 'Fairfield',
        230517143221029: '2018-12-30',
        230517143221042: '2',
        230517143221040: '20.72',
        230517143221041: '6.475'
      },
      {
        230517143221027: 'CA-2018-115427',
        230517143221030: 'EB-13975',
        230517143221032: 'Cardinal Slant-D Ring Binder, Heavy Gauge Vinyl',
        230517143221023: 'Office Supplies',
        230517143221034: 'Binders',
        230517143221037: 'West',
        230517143221024: 'Fairfield',
        230517143221029: '2018-12-30',
        230517143221042: '2',
        230517143221040: '13.904',
        230517143221041: '4.519'
      },
      {
        230517143221027: 'CA-2018-143259',
        230517143221030: 'PO-18865',
        230517143221032: 'Wilson Jones Legal Size Ring Binders',
        230517143221023: 'Office Supplies',
        230517143221034: 'Binders',
        230517143221037: 'East',
        230517143221024: 'New York City',
        230517143221029: '2018-12-30',
        230517143221042: '3',
        230517143221040: '52.776',
        230517143221041: '19.791'
      },
      {
        230517143221027: 'CA-2018-143259',
        230517143221030: 'PO-18865',
        230517143221032: 'Gear Head AU3700S Headset',
        230517143221023: 'Technology',
        230517143221034: 'Phones',
        230517143221037: 'East',
        230517143221024: 'New York City',
        230517143221029: '2018-12-30',
        230517143221042: '7',
        230517143221040: '90.93',
        230517143221041: '2.728'
      },
      {
        230517143221027: 'CA-2018-143259',
        230517143221030: 'PO-18865',
        230517143221032: 'Bush Westfield Collection Bookcases, Fully Assembled',
        230517143221023: 'Furniture',
        230517143221034: 'Bookcases',
        230517143221037: 'East',
        230517143221024: 'New York City',
        230517143221029: '2018-12-30',
        230517143221042: '4',
        230517143221040: '323.136',
        230517143221041: '12.118'
      },
      {
        230517143221027: 'CA-2018-143259',
        230517143221030: 'PO-18865',
        230517143221032: 'Bush Westfield Collection Bookcases, Fully Assembled',
        230517143221023: 'Furniture',
        230517143221034: 'Bookcases',
        230517143221037: 'East',
        230517143221024: 'New York City',
        230517143221029: '2018-12-30',
        230517143221042: '4',
        230517143221040: '323.136',
        230517143221041: '12.118'
      },
      {
        230517143221027: 'CA-2018-143259',
        230517143221030: 'PO-18865',
        230517143221032: 'Bush Westfield Collection Bookcases, Fully Assembled',
        230517143221023: 'Furniture',
        230517143221034: 'Bookcases',
        230517143221037: 'East',
        230517143221024: 'New York City',
        230517143221029: '2018-12-30',
        230517143221042: '4',
        230517143221040: '323.136',
        230517143221041: '12.118'
      }
    ]

    const columns = [
      {
        field: '230517143221027',
        title: 'Order ID',
        width: 'auto',
        mergeCell: true, // 相同的相邻单元格合并
        sort: true
      },
      {
        field: '230517143221030',
        title: 'Customer ID',
        width: 'auto',
        sort: true,
        // 可暴露row/col/value
        style: ({ col, row, value }) => {
          if (value === 'JM-15580') {
            return { color: 'red' }
          } else {
            return { color: 'green' }
          }
        }
      },
      {
        field: '230517143221032',
        title: 'Product Name',
        width: 200, // 固定宽度
        style: {
          autoWrapText: true, // 自动换行, 还需指定defaultRowHeight
          lineClamp: 'auto'
        }
      },
      {
        field: '230517143221023',
        title: 'Category',
        width: 'auto'
      },
      {
        field: '230517143221034',
        title: 'Sub-Category',
        width: 'auto'
      },
      {
        field: '230517143221037',
        title: 'Region',
        width: 'auto'
      }
    ]

    const option = {
      records,
      columns,
      theme: lightTheme,
      widthMode: 'standard',
      // heightMode: 'autoHeight', // 有性能开销
      // defaultRowHeight: 80,
      autoFillWidth: true, // 自动撑满容器宽度
      frozenColCount: 1, // 左侧冻结1列
      allowFrozenColCount: 2, // 前2列允许冻结
      rightFrozenColCount: 1, // 右侧冻结1列
      // columnResizeMode: 'header',
      // rowResizeMode: 'all',
      // dragHeaderMode: 'column', // 列表头换位
      overscrollBehavior: 'none',
      select: {
        headerSelectMode: 'inline', // inline/cell
        highlightMode: 'row' // 可以配置为'cross' 或者 'row' 或者 'column'
      },
      keyboardOptions: {
        copySelected: true, // 快捷键复制单元格
        selectAllOnCtrlA: true
      },
      hover: {
        highlightMode: 'row', // cross/column/row/cell
        disableHeaderHover: true
      },
      tooltip: {
        isShowOverflowTextTooltip: true
      }
    }

    // 创建 VTable 实例
    this.tableInstance = new VTable.ListTable(document.getElementById('tableContainer'), option)
    this.tableInstance.updateFilterRules([
      {
        filterKey: '230517143221037',
        filteredValues: ['West']
      }
    ])
  },
  methods: {
    updateTheme() {
      if (this.lightTheme) {
        this.tableInstance.updateTheme(darkTheme)
      } else {
        this.tableInstance.updateTheme(lightTheme)
      }
      this.lightTheme = !this.lightTheme
      console.log(this.tableInstance.getTheme())
    }
  }
}
</script>

<style lang="less" scoped></style>
