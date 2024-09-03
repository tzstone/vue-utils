import path from 'path';

import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import ViteRequireContext from '@originjs/vite-plugin-require-context';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [createVuePlugin(), viteCommonjs(), ViteRequireContext()],
  base: './',
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
  },
});
