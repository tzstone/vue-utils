module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: true,
    },
    'import/core-modules': ['windi.css'],
  },
  rules: {
    'no-debugger': 1,
    indent: ['error', 2],
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none',
      },
    ],
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 0, // 禁止ts指令注释
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-explicit-any': 0, // 禁止使用any类型
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-v-html': 0,
    'vue/require-default-prop': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always',
        },
      },
    ],
    'vue/require-v-for-key': 2,
    'vue/this-in-template': 2,
    'vue/require-prop-types': 0,
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'import/order': [
      'error',
      {
        // 对导入模块进行分组，分组排序规则如下
        groups: [
          'builtin', // 内置模块
          'external', // 外部模块
          'internal', // 内部引用
          'sibling', // 兄弟依赖
          'parent', // 父节点依赖
          'index', // index文件
          'type', // 类型文件
          'unknown',
        ],
        // 通过路径自定义分组
        pathGroups: [
          {
            pattern: '@/**', // 把@开头的应用放在external分组后面
            group: 'external',
            position: 'after',
          },
        ],
        // 是否开启独特组，用于区分自定义规则分组和其他规则分组
        distinctGroup: true,
        // 每个分组之间换行
        'newlines-between': 'always',
        // 相同分组排列规则 按字母升序排序, 忽略大小写
        alphabetize: { order: 'asc', caseInsensitive: true },
        warnOnUnassignedImports: false,
      },
    ],
    'import/no-named-as-default': 0,
    'import/namespace': 0,
  },
};
