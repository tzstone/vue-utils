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
      'prefix-icon': "el-icon-search"
    }
  },
  select: {
    component: 'el-select',
    props: {
      clearable: true,
      filterable: true
    }
  }
}