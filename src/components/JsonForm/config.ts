export const defElementConfig = {
  input: {
    component: 'el-input',
    props: {
      clearable: true
    }
  },
  search: {
    component: 'el-input',
    props: {
      clearable: true,
      prefixIcon: "el-icon-search"
    }
  },
  select: {
    component: 'el-select',
    props: {
      clearable: true,
      filterable: true
    }
  },
  checkbox: {
    component: 'el-checkbox',
  },
  checkboxGroup: {
    component: 'el-checkbox-group',
  },
  date: {
    component: 'el-date-picker',
    props: {
      type: 'date',
      placeholder: "选择日期",
      'value-format': 'yyyy-MM-dd'
    }
  },
  dateRange: {
    component: 'el-date-picker',
    props: {
      type: 'daterange',
      'value-format': 'yyyy-MM-dd',
      'range-separator': "至",
      'start-placeholder': "开始日期",
      'end-placeholder': "结束日期",
    }
  }
}