module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@vue/babel-preset-jsx', { compositionAPI: true }], // 开启 jsx
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { isTSX: true }], // 开启 typescript
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
