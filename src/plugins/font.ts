// svg引入
import { importAll, isObject } from '@/utils';

const fonts = importAll(require.context('../../public/fonts/', false, /\.ttf$/));
fonts.forEach((m) => {
  // 兼容@originjs/vite-plugin-require-context
  const path = isObject(m) ? m.default : m;
  console.log('path', path);
  const name = path.split('/').pop().split('.')[0];
  const font = new FontFace(name, `url(${path})`);
  document.fonts.add(font);
});
