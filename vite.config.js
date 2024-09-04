import path from 'path';

import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import ViteRequireContext from '@originjs/vite-plugin-require-context';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [
    createVuePlugin({
      // template编译保留空格, 与webpack保持一致
      compilerOptions: { whitespace: 'preserve' },
    }),
    viteCommonjs(),
    ViteRequireContext(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // Specify symbolId format
      symbolId: 'icon-[name]',
      /**
       * custom insert position
       * @default: body-last
       */
      inject: 'body-first',
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__SVG_SPRITE_NODE__',
    }),
  ],
  base: './',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
  },
});
