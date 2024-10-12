import { defSortImportAll, importAll } from './dev';

const instanceOption = {};
const plugins = importAll(require.context('@/plugins/', false, /\.(ts|js)$/), defSortImportAll);
console.info('main plugins', plugins);
plugins.forEach((m) => {
  const option = m.default || m;
  if (option.vueInstanceOption) {
    Object.keys(option.vueInstanceOption).forEach((key) => {
      if (key === 'mixin') {
        if (!instanceOption['mixins']) instanceOption['mixins'] = [];
        instanceOption['mixins'].push(option.vueInstanceOption[key]);
      } else {
        instanceOption[key] = option.vueInstanceOption[key];
      }
    });
  }
});

export const getVueOptions = () => instanceOption;
