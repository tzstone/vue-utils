module.exports = {
  root: true,
  extends: ['plugin:zflow/vue-ts', 'plugin:import/recommended', 'plugin:import/typescript'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    'object-curly-spacing': 1,
    semi: 0,
    'import/order': [
      'error',
      {
        // 对导入模块进行分组，分组排序规则如下
        groups: [
          'builtin', // 内置模块
          'external', // 外部模块
          'parent', // 父节点依赖
          'sibling', // 兄弟依赖
          'internal', // 内部引用
          'index', // index文件
          'object',
          'type', // 类型文件
          'unknown'
        ],
        // 通过路径自定义分组
        pathGroups: [
          {
            pattern: '@/**', // 把@开头的应用放在external分组后面
            group: 'external',
            position: 'after'
          }
        ],
        // 是否开启独特组，用于区分自定义规则分组和其他规则分组
        distinctGroup: true,
        // 每个分组之间换行
        'newlines-between': 'always',
        // 相同分组排列规则 按字母升序排序, 忽略大小写
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ]
  }
}
