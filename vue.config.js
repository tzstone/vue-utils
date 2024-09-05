const path = require('path');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');
const WorkerPlugin = require('worker-plugin');

const isProduction = process.env.NODE_ENV === 'production';
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.plugins.push(
        new SpeedMeasurePlugin(),
        new HardSourceWebpackPlugin(),
        new webpack.NormalModuleReplacementPlugin(/src\/router\/config.ts/, '../../dev.routerConfig.ts')
      );
    }

    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
      plugins: [new WorkerPlugin()],
    };
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    if (isProduction) {
      config.plugins.delete('prefetch');
    }
  },
};
